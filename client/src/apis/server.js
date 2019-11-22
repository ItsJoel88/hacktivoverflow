import axios from 'axios'

let server = axios.create({
    baseURL: 'http://server-overflow.itsjoel.site/'
})

export default server