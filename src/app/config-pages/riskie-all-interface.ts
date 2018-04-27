export interface TestinServiceData {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export interface UserRegistration {
  fullName: string;
  emailAddress: string;
  mobileNo: string;
  password: string;
}
export interface UserLogin {
    emailAddress: string;
    password: string;
  }
