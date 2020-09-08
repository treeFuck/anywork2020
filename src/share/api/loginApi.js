import request from "../net/request";

/**
 * @author 树干
 * 登录、注册、忘记密码
 */
export default class ExerciseApi extends request {
    constructor() {
        super()
    }

    // 登录
    static loginHTTP (data, callback) {
         this.postMethods('test/none/detail', data, callback)
    }
}