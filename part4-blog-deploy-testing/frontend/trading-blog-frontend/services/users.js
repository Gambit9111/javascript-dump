import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api/auth/users/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }