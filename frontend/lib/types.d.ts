
export interface User {
  email?: string;
  name?: string;
  password?: string;
  _id?: string;
}

export interface Asset {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isbn: string;
  tags?: string[];
  owner?: User;
}

export interface PaginatedAssets {
  assets: Asset[];
  count: number;
}

export interface UserWithAuth {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}