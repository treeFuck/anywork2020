import axios from 'axios';
import baseUrl from "./url";

//创建axios请求实例，所有的请求操作get,post等方法通过这里发出
//在本地测试的时候必须都要去登陆页面那一次cookie，并填写到下面的头部，否则无法直接访问接口，如果按照
//正常的流程走完登陆之后，再访问别的地方set-cookie可以不用
const _Request = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'cookie': 'M2FhMDcxNzYtYTEyZS00Y2E1LWE1YzItMWRmZWMzY2RlMzMw;'
    }
});

// /**
//  * 统一对请求进行处理
//  */
// _Request.interceptors.request.use((config) => {
//     // 当存在token的时候，将token加到请求头上面
//     if (localStorage.getItem("AuthorizationAdmin")) {
//         config.headers['Authorization'] = JSON.parse(localStorage.getItem("AuthorizationAdmin")).value;
//     }
//     return config
// }, error => {
//     //403
//     //500 做出相应的错误提示
// })

// /**
//  * 统一对返回的数据进行过滤
//  */
// _Request.interceptors.response.use((result) => {
//     // 当没有前面的问题的时候，返回请求对象的数据
//     //拿取头部证书
//     if(!localStorage.getItem("AuthorizationAdmin")) {
//         localStorage.setItem("AuthorizationAdmin", JSON.stringify({
//             value: result.headers.authorization,
//             expires: new Date().getTime() + 2400 * 1000
//         }))
//     }
//     return result.data;
// }, (error) => {
//     //  console.log(error)
//     // 请求发生错误的时候
//     let status = error.response.status;
//
//
//     return error;
// });

/**
 * 封装请求类
 * callback 需要使用箭头函数，不然会出现this指向错误
 */
export default class request {
    static getMethods(url, callback) {
        _Request.get(baseUrl + url).then((data) => {
            callback(data.data)
        });
    }

    static postMethods(url, data, callback) {
        _Request.post(url, JSON.stringify(data)).then((data) => {
            callback(data.data)
        });
    }
}
