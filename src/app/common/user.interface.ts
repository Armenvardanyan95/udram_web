interface IUser {
  _id: string;
  passportScan: string;
  acraScan: string;
  auth: {
    email: string;
  }
  personal: {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: number,
    ssn: string
  },
  identification: {
    identificationType: number,
    passport?: {
      number: number,
      issuedBy: string,
      dateOfIssue: string,
      validityDate: string
    },
    idCard?: {
      number: number,
      issuedBy: string,
      dateOfIssue: string,
      validityDate: string
    },
  }
  additional: {
    province: number,
    city: string,
    address: string,
    other: string
  },
  request: {
    amount: number,
    description: string,
    mobilePhone: string,
    status: number;
  }
}
