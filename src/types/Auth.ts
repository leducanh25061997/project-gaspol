export interface AuthParams {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  session_state: string;
}

export interface UserProfile {
  userUuid?: string | '';
  groups?: any[] | [];
  roles?: string[];
  username?: string;
}
export interface UserInfomation {
  roles: any[];
  provinceId?: string;
  userName?: string;
  groups?: any[];
}
