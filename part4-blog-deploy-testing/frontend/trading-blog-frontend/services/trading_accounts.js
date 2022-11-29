import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/trade_history/accounts/'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }

    console.log(config)

    const response = await axios.get(baseUrl, config)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const getSingle = async id => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.get(`${baseUrl}${id}`, config)
    return response.data
}

export default { getAll, create, getSingle, setToken }