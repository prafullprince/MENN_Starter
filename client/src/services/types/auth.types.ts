export type RegisterInput = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string
}

export type LoginInput = {
    email: string;
    password: string;
}
