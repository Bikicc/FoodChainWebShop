import * as internal from "assert";

export interface User {
    userId?: number,
    Username: string,
    email: string,
    PasswordPlain: string,
    mobileNumber?: string,
    address?: string,
    roleId?: number,
    role?: any
}