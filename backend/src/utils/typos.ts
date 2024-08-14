export interface UserSignUpInterface {
  name: string;
  email: string;
  password: string;
  userId: string;
  userid: string;
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
  range:String;
  role: string;
  location: string;
  description: string;
  timeLine: number;
  logo: string;
  salary:string;
}

export interface requestFile {
  profilePhoto: File[];
  cv: File[];
  logo:File[]
}