import request from "../net/request";

/**
 * @author 树干
 * 登录、注册、修改密码
 */

export default class ExerciseApi extends request {
  constructor() {
    super()
  }
  // 登录
  static loginHTTP (data) {
    return this.postMethods('/user/login', data)
  }

  // 忘记密码
  static forgetPassWord () {
    return this.postMethods('/user/forget', {organizationName: ""})
  }
}