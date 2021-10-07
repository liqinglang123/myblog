import axios from 'axios'
import qs from 'qs'

// 初始化一个axios对象实例
const instance = axios.create({
    // baseURL: 'http://47.95.123.41:8888/admin',
    baseURL: 'http://localhost:8888/admin',
    // 设置超时时间
    timeout: 15000
});

// 添加请求拦截
instance.interceptors.request.use(
    config => {
        return config
    },
    // 对请求错误做些什么
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        let { code } = response.data

        // 判断token是否过期或者验证失败
        if (code && code === '666') {
            localStorage.clear()
            sessionStorage.clear()
        }

        return response
    },
    // 对响应错误做出操作
    error => {
        return Promise.reject(error)
    }
)


// 注意：get请求参数要加一个 params

// 创建一个get请求方法
let get = async (url, params) => {
    if (sessionStorage.getItem('token') !== '') {
        setToken()
    }
    let { data } = await instance.get(url, { params })
    return data
}

// 创建一个post方法
let post = async (url, params) => {

    if (sessionStorage.getItem('token')) {
        setToken()
    }

    let { data } = await instance.post(url, qs.stringify(params))
    return data
}

// 创建一个将token信息保存到请求头中的信息
let setToken = token => {
    instance.defaults.headers.common['authorization'] = sessionStorage.getItem('token')
}

export {
    get,
    post,
    setToken
}