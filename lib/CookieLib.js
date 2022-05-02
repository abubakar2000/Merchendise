import { setCookies, getCookie } from 'cookies-next'

const token = 'token';

const refreshToken = 'refreshToken';

const username = "username";

const firstName = "firstName";

const lastName = "lastName";

const email = "email";

const password = "password";

const SetCookie = (cname, cvalue, exdays) => {
    setCookies(cname, cvalue)
}

const GetCookie = (cname) => {
    return getCookie(cname)
}

const SetToken = (tokenV) => {
    SetCookie(token, tokenV, 4);
}

const SetRefreshToken = (refreshTokenV) => {
    SetCookie(refreshToken, refreshTokenV)
}

const SetUsername = (usernameV) => {
    SetCookie(username, usernameV)
}

const SetFirstName = (firstNameV) => {
    SetCookie(firstName, firstNameV)
}

const SetLastName = (lastNameV) => {
    SetCookie(lastName, lastNameV)
}

const SetEmail = (emailV) => {
    SetCookie(email, emailV)
}

const SetPassword = (passwordV) => {
    SetCookie(password, passwordV)
}

function GetToken() {
    return GetCookie(token);
}

function GetRefreshToken() {
    return GetCookie(refreshToken)
}

const GetUsername = () => {
    return GetCookie(username)
}

const GetFirstName = () => {
    return GetCookie(firstName)
}

const GetLastName = () => {
    return GetCookie(lastName)
}

const GetEmail = () => {
    return GetCookie(email)
}

const GetPassword = () => {
    return GetCookie(password)
}

export {
    SetCookie, GetCookie,
    SetToken,
    SetRefreshToken,
    SetUsername,
    SetFirstName,
    SetLastName,
    SetEmail,
    SetPassword,
    GetToken,
    GetRefreshToken,
    GetUsername,
    GetFirstName,
    GetLastName,
    GetEmail,
    GetPassword,
}