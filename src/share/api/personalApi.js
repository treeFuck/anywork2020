import request from "../net/request";

/**
 * @author 树干
 * 登录、注册、修改密码
 */

export default class ExerciseApi extends request {
  constructor() {
    super()
  }
  // 上传头像
  static uploadImg (data) {
    return this.formDateMethods('/user/upload', data)
  }

  // 修改邮箱、手机
  static updateInfo (data) {
    return this.postMethods('user/update', data)
  }
}