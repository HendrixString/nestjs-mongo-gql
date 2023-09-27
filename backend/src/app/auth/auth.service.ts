import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../user/dto/create-user.input';
import { ConfigService } from '@nestjs/config';
import { LoginUserInput } from './dto/login-user.input';
import { USER_ALREADY_EXIST_EXCEPTION } from '../common/exceptions/user.exceptions';

export interface JwtClaims {
  email?: string,
  name?: string,
  sub?: string,
  roles?: string[];
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  createToken(user: User, secret: string, expiration: string) {
    return this.jwtService.signAsync(
      {
        email: user.email,
        name: user.name,
        sub: user._id,
        roles: user.roles
      },
      {
        secret: secret || 'testing',
        expiresIn: expiration
      },
    )
  }

  async tokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all(
      [
        this.createToken(
          user,
          this.configService.get<string>('JWT_SECRET'),
          this.configService.get<string>('JWT_EXPIRATION')
        ),
        this.createToken(
          user,
          this.configService.get<string>('JWT_REFRESH_SECRET'),
          this.configService.get<string>('JWT_REFRESH_EXPIRATION')
        )
      ]
    )

    return {
      accessToken, refreshToken
    }
  }

  async login(user: User) {
    const tokens = await this.tokens(user);
    const hashed_refreshToken = await this.hash(tokens.refreshToken)

    // save refresh token
    await this.userService.updateUserRaw(
      user._id,
      {
        refreshToken: hashed_refreshToken
      }
    )

    return {
      user,
      ...tokens
    };
  }

  async refresh(claims: JwtClaims & { refreshToken?: string }) {
    const user = await this.userService.getUserById(claims?.sub)
    console.log('user ', user)
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
      
    console.log('claims.refreshToken', claims.refreshToken)
    console.log('user.refreshToken', user.refreshToken)
    const isMatch = await bcrypt.compare(claims.refreshToken, user.refreshToken)
    console.log('isMatch', isMatch)
    if(!isMatch) 
      throw new ForbiddenException('Access Denied 2');

    return this.login(user)
  }

  hash(payload: string) {
    return bcrypt.hash(
      payload,
      Number(this.configService.get<string>('SALT_ROUND') || '8'),
    );
  }

  async signup(payload: CreateUserInput) {
    // CHECK IF THE USER ALREADY EXISTS
    const user = await this.userService.findOneByEmail(payload.email);

    if (user) {
      throw new Error(USER_ALREADY_EXIST_EXCEPTION);
    }

    // hash password
    const hash = await this.hash(payload.password);

    const user_new = await this.userService.createUser({ ...payload, password: hash });
    return this.login(user_new)
  }
}
