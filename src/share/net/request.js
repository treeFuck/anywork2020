import axios from 'axios';
import baseUrl from "./url";

//创建axios请求实例，所有的请求操作get,post等方法通过这里发出
//在本地测试的时候必须都要去登陆页面那一次cookie，并填写到下面的头部，否则无法直接访问接口，如果按照
//正常的流程走完登陆之后，再访问别的地方set-cookie可以不用
const _Request = axios.create({
    baseURL: baseUrl,
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
