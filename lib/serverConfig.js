import axios from "axios"
import { GetRefreshToken, } from './CookieLib';

const apiip = "http://45.79.120.101"
const gqlip = `${apiip}/graphql`

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

export { apiip, gqlip, QueryG, MutationP }
