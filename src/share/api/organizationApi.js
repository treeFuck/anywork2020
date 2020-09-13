import request from "../net/request";

/**
 * @author 魏桂佳
 * 和主页有关的api
 */
export default class IndexApi extends request {
    constructor() {
        super()
    }

    // 获取组织下的章节列表
    static gettestChapter (data) {
        return this.postMethods('/test/chapter', data)
    }

    //获取试卷概要列表
    static getTestList (data) {
         return this.postMethods('/test/list', data)
    }
}
