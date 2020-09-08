import axios from 'axios';


//创建axios请求实例，所有的请求操作get,post等方法通过这里发出
const _Request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    crossDomain: true,
    withCredentials: true
});


/**
 * 封装请求类
 * callback 需要使用箭头函数，不然会出现this指向错误
 */
export default class request {
    static getMethods(url, callback) {
        _Request.get(url).then((data) => {
            callback(data.data)
        });
    }

    static postMethods(url, data, callback) {
        _Request.post(url, JSON.stringify(data)).then((data) => {
            callback(data.data)
        });
    }
}
