import request from "../net/request";

export default class LoginApi extends request{
    constructor() {
        super()
    }

    static login(data, callback) {
        this.postMethods('/user/login', data, callback)
    }
}
