export interface UserProfile {
  _id: string;
  email: string;
  firstname: string | undefined;
  lastname: string | undefined;
  adress: string | undefined;
  city: string | undefined;
  country: string | undefined;
  phonenumber: string | undefined;
  admin: boolean | undefined;
}
