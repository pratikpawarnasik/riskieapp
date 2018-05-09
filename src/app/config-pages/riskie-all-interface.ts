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
export interface UserProfileDetail {
  fullName: any;
  emailAddress: string;
  mobileNo: string;
  password: string;
}

export interface GetAccountDetail {
  id: number;
  plantype: string;
  submitdate: string;
  enddate: string;
}
export interface ChangePass {
  userid: any;
  curentpass: string;
  newpass: string;
}
export interface AddProductParam {
  productName: string;
  categoryName: string;
}
export interface BillingProperty {
  planId: any;
  planName: any;
  amt: any;
  month: any;
  orderAmt: any;
  planRate: any;
  userid:  any;
}
