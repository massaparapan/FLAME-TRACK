export interface registerRequest {
  username: string;
  email: string;
  password: string;
  plan_id: number;
}

export interface loginRequest {
  username: string;
  password: string;
}

export interface deviceCreate {
  access_token: string;
}
