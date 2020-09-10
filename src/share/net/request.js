import axios from 'axios';
import {responseIntercept} from "./response";


//创建axios请求实例，所有的请求操作get,post等方法通过这里发出
const _Request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 统一对请求进行处理
 */
_Request.interceptors.request.use((config) => {
    // 当存在token的时候，将token加到请求头上面
    if (localStorage.getItem("Authorization")) {
        config.headers['Authorization'] = JSON.parse(localStorage.getItem("Authorization")).value;
    }
    console.log(config.headers)
    return config
}, error => {
    //403
    //500 做出相应的错误提示
})

/**
 * 统一对返回的数据进行过滤
 */
_Request.interceptors.response.use((result) => {
    // 当没有前面的问题的时候，返回请求对象的数据
    // 登录请求的时候，拿取头部证书
    if(result.config.url == '/user/login') {
        localStorage.setItem("Authorization", JSON.stringify({
            value: result.headers.authorization,
        }))
    }
    return result.data;
}, (error) => {
});


/**
 * 封装请求类
 */
export default class request {
    static getMethods(url) {
        return _Request.get(url)
    }

    static postMethods(url, data) {
        return _Request.post(url, JSON.stringify(data))
    }

    static formDateMethods(url, data) {
        return _Request.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
}
