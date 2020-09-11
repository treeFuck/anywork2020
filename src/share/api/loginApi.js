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
  static loginHTTP (data) {
    return this.postMethods('/user/login', data)
  }

  // 注册
   static regHttp (data) {
    return this.postMethods('/user/register', data)
   }

  // 忘记密码
  static forgetPassWord (data) {
    return this.postMethods('/user/forget', data)
  }
}