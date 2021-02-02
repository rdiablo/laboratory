import axios from 'axios'

const server = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

server.interceptors.request.use(config => {
    return config
})



const post = (url, data, timeout) => {
    const config ={
        timeout,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return server.post(url, data, config)
}

const get = (url, data, timeout) => {
    let params
    if (data) {
        params = {
            params: data
        }
    }
    if (timeout) {
        params.timeout = timeout
    }
    return server.get(url, params)
}

const getApi = (url, data, timeout) => {
    return server.get(url, data, timeout)
}

const postApi = (url, data, timeout) => {
    return server.post(url, data, timeout)
}

export default { get, post, getApi, postApi }