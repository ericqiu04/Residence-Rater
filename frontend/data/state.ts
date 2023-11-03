
//authentication
export type LoginState = {
    email: string,
    password: string,
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