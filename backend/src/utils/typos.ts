export interface UserSignUpInterface {
  name: string;
  email: string;
  password: string;
  userId: string;
  userid: string;
  secretKey: string;
  decoded: string;
  refreshtokenkey:string;
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
  range: string;
  role: string;
  location: string;
  description: string;
  timeLine: number;
  logo: string;
  salary: string;
  skills: any;
  companyName: string;
  totalExperience: string;
}

export interface requestFile {
  profilePhoto: any;
  cv: any;
  logo: any;
  banner: any;
}

export interface profileInterface {
  username: string;
  location: string;
  nameExist: string;
  updateUserDetails: string;
  mobile: number;
  website: string;
  mobileNumberExist: number;
  oldPassword: string;
  newPassword: string;
  conformPassword: string;
  existingPassword: string;
  message: string;
  subject: string;
  yourname: string;
  email: string;
  occupation: string;
}

export interface jobInterface {
  name: string;
  email: string;
  description: string;
  phoneNumber: string;
  jobTitle: string;
  typesOfJobs: string;
  title: string;
  companyName: string;
  jobType: string;
  jobCategory: string;
  minSalary: string;
  maxSalary:string;
  experience: string;
  qualification: string;
  responsibilities: string;
  Requireds: string;
  Industry: string;
  postedDate: string;
  country:string;
  state:string;
  address:string;
  logo:string;
  coverLetter:string;
  
}


export interface MatchStage {
  $or: ({ title: { $regex: any; $options: string; }; companyName?: undefined; description?: undefined; experience?: undefined; } | { companyName: { $regex: any; $options: string; }; title?: undefined; description?: undefined; experience?: undefined; } | { description: { $regex: any; $options: string; }; title?: undefined; companyName?: undefined; experience?: undefined; } | { experience: { $regex: any; $options: string; }; title?: undefined; companyName?: undefined; description?: undefined; })[];
  title?: { $regex: string; $options: string };
  country?: { $regex: string; $options: string };
  jobCategory?: { $regex: string; $options: string };
  occupation?: { $regex: string; $options: string };
}