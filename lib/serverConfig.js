import axios from "axios"
import { GetRefreshToken, } from './CookieLib';

const apiip = "https://98a1-59-103-32-172.in.ngrok.io"
const gqlip = `${apiip}/graphql/`
const token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjUyMDIyODgxLCJvcmlnSWF0IjoxNjUyMDIyNTgxfQ.dKTG4e1By0SUZgXl_bFLXJkZuS4T68rzJ9B9tETS44Q"
const QueryG = (query) => {
    return axios.get(`${gqlip}?query=${query}`)
}

const MutationP = (query) => {
    return axios.post(`${gqlip}/?query=${query}`, {}, {
        headers: {
            "Authorization": GetRefreshToken()
    }
    })
}

export { apiip, gqlip, QueryG, MutationP, token }
