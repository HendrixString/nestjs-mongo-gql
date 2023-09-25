import { UseGuards } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guards';
import { Logger } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginUserResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('input') input: LoginUserInput,
    @Context() context: any,
    @Context() context2: GraphQLExecutionContext
  ) {
    console.log('context.user: ', context.user)
    console.log('input: ', input)
    // context.res.cookie('some-cookie', 'some-value');
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginUserResponse)
  signup(@Args('input') input: CreateUserInput) {
    return this.authService.signup(input);
  }
}
