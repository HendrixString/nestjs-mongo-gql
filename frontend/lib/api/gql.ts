import { gql } from '@apollo/client';

export const SIGNUP = gql`
mutation signUp($input: CreateUserInput!) {
  signup(input: $input) {
    authToken
    user {
      name
      email
      _id
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
      _id
    }
  }
}
`

export const CREATE_ASSET = gql`
mutation CreateAsset($input: CreateAssetInput!) {
  createAsset(input: $input) {
    _id
  }
}
`

export const GET_ASSET = gql`
query Asset($input: ID!) {
  asset(input: $input) {
    _id
    title
    description
    price
    image
    tags
    isbn
    owner {
      _id
      name
    }
  }
}
`

export const GET_ASSETS = gql`
query assets($limit: Int, $skip: Int, $filters: JSONObject) {
  assets(limit: $limit, skip: $skip, filters: $filters) {
    assets {
      _id
      description
      title
      image
      owner {
        name
        _id
      }
      price
      tags
    }
    count
  }
}
`

export const OWN_ASSET = gql`
mutation ownAsset($input: BuyAssetInput!) {
  ownAsset(input: $input) {
    owner {
      _id
      email
      name
    }
    price
    tags
    title
    description
  }
}
`