import * as internal from "assert";

export interface User {
    userId?: number,
    username: string,
    email: string,
    PasswordPlain: string,
    mobileNumber?: string,
    address?: string,
    roleId?: number,
    role?: any
}