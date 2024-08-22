export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  emailConfirmed: boolean;
  gender: string | number;
  isNewsletterEnabled?: boolean;
  phoneNumber?: number;
  phoneNumberConfirmed: boolean;
  language: string;
  timeZone: string;
  country: string;
  picture?: any;
}
