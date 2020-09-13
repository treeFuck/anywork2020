import request from "../net/request";

/**
 * @author 魏桂佳
 * 和主页有关的api
 */
export default class IndexApi extends request {
    constructor() {
        super()
    }

    // 获取个人信息
    static getUserInfo (data) {
        return this.postMethods('/user/info', data)
    }

    //请求排名列表
    static getRankList (data) {
         return this.postMethods('/leaderboard/show', data)
    }

    //请求公告列表
    static getMessageList (data) {
        return this.postMethods('/message/show', data)
   }

    //退出登录
    static userExit (data) {
        return this.postMethods('/user/exit', data)
    }

   // 搜索组织
    static organizationSearch (data) {
        return this.postMethods('/organization/search', data)
    }

    //获取我的组织列表 
    static getMyOrganization (data) {
        return this.postMethods('/organization/me', data)
    }
}
