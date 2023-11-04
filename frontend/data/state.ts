
//authentication
export type LoginState = {
    email: string,
    password: string,
    userFound: boolean,
}

export type RegisterState = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: any;
    emailTaken:boolean;
    weakPassword: boolean;
};


//university states
export type UniversityDataState = {
    universities: Array<{ name: string; logo: string; residences: any }>;
    message: string;
  };


//residence states 
export type DefResState = {
    uniName: string;
    residences: any[];
  };

export type ResState = {
    uniName: string | string[] | undefined;
    resName: string | string[] | undefined;
    residenceInfo: any;
  };

export type gmapState = {
    address: string | string[]
    location: any | any[]
}

export type ResImageState = {
    selectedImage: number
}

export type MapState = {
    key: string;
    location: any | any[];
  };

export type RatingState = {
  message:string;
  rating: number;
  allRatings: any[]
}
