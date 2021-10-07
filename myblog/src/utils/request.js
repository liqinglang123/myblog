import axios from 'axios'
import qs from 'qs'
import { promises } from 'stream'


// 初始化一个axios 对象实例
const instance = axios.create({
    // baseURL: 'http://47.95.123.41:8888/web',
    baseURL: 'http://localhost:8888/web',
    timeout: 5000
})

// 添加请求拦截
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

// 创建一个get方法
const get = async (url, params) => {
    let { data } = await instance.get(url, { params })
    return data
}


// 创建一个post方法
const post = async (url, params) => {
    let { data } = await instance.post(url, qs.stringify(params))
    return data
}

export {
    get,
    post
}