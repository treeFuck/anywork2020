import request from "../net/request";

/**
 * @author 小余
 * 和练习题有关的api都在这个类里面
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

    //获取用户做题的情况
    static getDoneDetails(data) {
        return this.postMethods('test/done/detail', data)
    }

    //收藏习题
    static collectExercise(data) {
        return this.postMethods('quest/collect', data)
    }

    //取消收藏
    static deleteCollect(data) {
        return this.postMethods('quest/collect/delete', data)
    }
}
