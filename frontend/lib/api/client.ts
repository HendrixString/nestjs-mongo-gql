import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";
import {User, UserWithAuth } from '@/lib/types'
import { LS } from "../common/browser";
import { LOGIN, SIGNUP } from "./gql";

export interface Config {
  endpoint: string;
}

class Auth {
  static USER_KEY: string = 'USER_KEY'

  private _subs: Set<any>;
  private _user_with_auth: UserWithAuth = undefined;

  constructor(private _client: Client) {
    this._subs = new Set<any>()
    this._user_with_auth = LS.get(Auth.USER_KEY)
    this.refresh()
  }

  subscribe = (sub: (user: User) => void) => {
    this._subs.add(sub);
    return () => {
      this._subs.delete(sub);
    }
  }

  notify = () => {
    this._subs.forEach(
      sub => {
        sub(this.user)
      }
    )
  }

  get user() {
    return this._user_with_auth?.user;
  }

  get token() {
    return this._user_with_auth?.accessToken;
  }

  login = async (email: string, password: string) => {
    const r = await this._client.gql.mutate<{login: UserWithAuth}>(
      {
        mutation: LOGIN,
        variables: {
          input: {
            email,
            password
          }
        }
      }
    )

    this.updateUserWithAuth(r?.data?.login)
  }

  refresh = async () => {
    // TODO
  }

  signup = async (name: string, email: string, password: string) => {
    const r = await this._client.gql.mutate<{signup: UserWithAuth}>(
      {
        mutation: SIGNUP,
        variables: {
          input: {
            email,
            password,
            name
          }
        }
      }
    )

    this.updateUserWithAuth(r?.data?.signup)
  }

  logout = () => {
    this.updateUserWithAuth(undefined)
  }

  private updateUserWithAuth = (user: UserWithAuth) => {
    this._user_with_auth = user;
    LS.set(Auth.USER_KEY, user);
    this.notify()
  }

}

export class Client {

  private _gql_client: ApolloClient<any>;
  private _config: Config;
  private _auth: Auth;

  init (
    config: Config
  ) {
    this._config = config
    this._auth = new Auth(this);

    const httpLink = new HttpLink({ uri: this._config.endpoint });
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${this._auth?.token}` || null,
        }
      }));
    
      return forward(operation);
    })
    
    const client = new ApolloClient(
      {
        cache: new InMemoryCache(),
        link: concat(authMiddleware, httpLink),
      }
    );

    this._gql_client = client;


    console.log('tt ', this._auth)
  }

  get gql() {
    return this._gql_client;
  }

  get auth() {
    return this._auth;
  }

  get config() {
    return this._config;
  }

}

const client = new Client()

export const initClient = (config: Config) => {
  console.log('initClient')
  client.init(config)
  return client;
}

export const getClient = () => {
  // console.log('getClient')
  return client;
}