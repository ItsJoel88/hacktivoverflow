import axios from 'axios'
// http://server-overflow.itsjoel.site/
let server = axios.create({
    baseURL: 'http://server-overflow.itsjoel.site/'
})

export default server