import { gql } from '@apollo/client';

export const SIGNUP = gql`
mutation signUp($input: CreateUserInput!) {
  signup(input: $input) {
    authToken
    user {
      name
      email
    }
  }
}
`

export const LOGIN = gql`
mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    authToken
    user {
      name
      email
    }
  }
}
`