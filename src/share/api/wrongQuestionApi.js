import request from "../net/request";


export default class WrongQuestionApi extends request {
    constructor() {
        super()
    }

    // 获取收藏的错题
    static getWrongQuestion () {
        return this.postMethods('/quest/collect/list')
    }

}