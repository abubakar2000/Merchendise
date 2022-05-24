import axios from "axios"
import { GetEmail, GetPassword, GetRefreshToken, GetToken, SetEmail, SetFirstName, SetLastName, SetPassword, SetRefreshToken, SetToken, SetUsername, } from './CookieLib';

// const apiip = "https://db6f-59-103-32-166.in.ngrok.io"
const apiip = "http://45.79.120.101"
const gqlip = `${apiip}/graphql/`
let token = `JWT ${GetToken()}`
let refreshToken = `${GetRefreshToken()}`

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
                console.log("Invalid Credentials")
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

const RefreshToken_Lib = async (email, password) => {
    var data = JSON.stringify({
        query: `mutation{
        tokenAuth(email:"${email}",password:"${password}"){
            success
            token
            refreshToken
        }
      }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: gqlip,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        data: data
    };

    console.log("Token Updation Initiated");
    await axios(config)
        .then(function (response) {
            console.log("Updated Token and Refresh Token");
            // token = response.data.data.tokenAuth.token;
            // refreshToken = response.data.data.tokenAuth.refreshToken;
            SetToken(response.data.data.tokenAuth.token)
            SetRefreshToken(response.data.data.tokenAuth.refreshToken)
            console.log(refreshToken);
            console.log(token);
        })
        .catch(function (error) {
            console.log(error);
        });

}



export { apiip, gqlip, QueryG, MutationP, token, RefreshToken_Lib }
