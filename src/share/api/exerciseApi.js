import request from "../net/request";

/**
 * @author 小余
 * 和练习题有关的api都在这个类里面
 * callback都是请求结束之后需要执行的业务逻辑
 * callback都需要使用箭头函数，不然会发生this指向错误
 */
export default class ExerciseApi extends request {
    constructor() {
        super()
    }

    //获取课前预习习题
    static getExerciseContent (data) {
         return this.postMethods('test/none/detail', data)
    }

    //提交学生做题答案
    static submitAnswerData(data) {
        return this.postMethods('test/submit', data)
    }
}
