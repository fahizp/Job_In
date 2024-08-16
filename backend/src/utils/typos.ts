export interface UserSignUpInterface {
  name: string;
  email: string;
  password: string;
  userId: string;
  userid: string;
  secretKey:string;
  decoded:string
}

export interface CandidateInterface {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: number;
  address: string;
  city: string;
  country: string;
  mobileNumber: number;
  occupation: string;
  indroduction: string;
  title: string;
  range:string;
  role: string;
  location: string;
  description: string;
  timeLine: number;
  logo: string;
  salary:string;
  skills:string;
}

export interface requestFile {
  profilePhoto:any ;
  cv:any  ;
  logo:any ;
  banner:any ;
}