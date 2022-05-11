import axios from "axios"
import { GetEmail, GetPassword, GetRefreshToken, GetToken, SetEmail, SetFirstName, SetLastName, SetPassword, SetRefreshToken, SetToken, SetUsername, } from './CookieLib';

const apiip = "https://3ae0-59-103-32-168.in.ngrok.io"
// const apiip = "http://45.79.120.101"
const gqlip = `${apiip}/graphql/`
let token = `JWT ${GetToken()}`

const QueryG = (query) => {
    return axios.get(`${gqlip}?query=${query}`)
}

const SetUserCookie = (
    token,
    refreshToken,
    username,
    firstName,
    lastName,
    email,
    password
) => {
    SetToken(token)
    SetRefreshToken(refreshToken)
    SetUsername(username)
    SetFirstName(firstName)
    SetLastName(lastName)
    SetEmail(email)
    SetPassword(password)
}

const SignInUser = () => {
    var config = {
        method: 'post',
        url: gqlip + "?query=" + `mutation{
            tokenAuth(email:"${GetEmail()}",password:"${GetPassword()}"){
                success
                token
                refreshToken
                user {
                  id
                  email
                  username
                  firstName
                  lastName
                }
            }
          }`,
        headers: {
            'Accept': '*/*',
            'Content-Type': '*/*'
        },
        // data: data
    };

    axios(config)
        .then((res) => {
            console.log(res.data);
            if (res.data.data.tokenAuth.success === true) {
                SetUserCookie(
                    res.data.data.tokenAuth.token,
                    res.data.data.tokenAuth.refreshToken,

                    res.data.data.tokenAuth.user.username,
                    res.data.data.tokenAuth.user.firstName,
                    res.data.data.tokenAuth.user.lastName,
                    res.data.data.tokenAuth.user.email,
                    password
                )
                console.log(this.GetUserCookie());
                this.setState({ isLoggedIn: true });
            } else {
                alert("Invalid Credentials")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const MutationP = (query) => {
    return axios.post(`${gqlip}/?query=${query}`, {}, {
        headers: {
            "Authorization": GetRefreshToken()
        }
    })
}

export { apiip, gqlip, QueryG, MutationP, token }
