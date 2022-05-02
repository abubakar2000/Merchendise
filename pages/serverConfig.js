import axios from "axios"

const apiip = "http://45.79.120.101"
const gqlip = `${apiip}/graphql`

const QueryG = (query) => {
    return axios.get(`${gqlip}?query=${query}`)
}

const MutationP = (query) => {
    return axios.post(`${gqlip}/?query=${query}`)
}

export { apiip, gqlip, QueryG, MutationP }
