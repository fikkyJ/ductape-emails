import SHA256 from "crypto-js/sha256";
import { genericErrors } from "../types/email.type";

export const capitalize = (s: string): string => {
    return `${s[0].toUpperCase()}${s.slice(1)}`
}

export const sha256 = (s: string) => {
    return (SHA256(s)).toString();
}

export const extractError = (e: genericErrors): string => {

    const { code, _original, details } = e;

    console.log("ORIGINAL", _original);
    if (code === 11000) return "Email in use";

    if (_original) return removeRegEx(/"/g, details[0].message);

    return e.toString();
}

export const removeRegEx = (exp: RegExp, str: string): string => {
    return str.replace(exp, '');
}

export const stripAuth = (token: string) => {
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

    return token;
};