import axios from 'axios';
import {responseIntercept} from "./response";


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
 * isNeedNotice 表示是否需要进行弹窗提醒，例如请求失败前端提醒失败原因
 * isNeedNotice 如果不传或者传入false表示默认不提醒，如果传入true表示默认提示后台返回的内容，
 * 如果需要自定以提醒则传入你想要提醒的内容
 */
export default class request {
    static getMethods(url) {
        return _Request.get(url)
    }

    static postMethods(url, data) {
        return _Request.post(url, JSON.stringify(data))
    }
}
