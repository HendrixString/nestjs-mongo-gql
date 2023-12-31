import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { log } from 'console';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtClaims } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(private readonly _configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtClaims) {
    log('JwtClaims ', payload)
    // injects the JWT claims into user field
    return payload;
    // return { 
    //   _id: payload._id, email: payload.email, 
    //   name: payload.name
    // };
  }
}
