//所有人可能会用的工具类
/**
 * 时间格式规范化工具，整理成为形如03:36:29格式的时间
 * @param currentDate new Data类型 别搞别的类似参数
 * @returns {string} 返回符合格式的时间
 * @author 小余
 */
export function formatDate(currentDate) {
    //参数大小校验，如果得到的描述>10，则直接返回，如果<10的话则变为0*的格式返回
    let year = verifyDateFormat(currentDate.getFullYear())
    let month = verifyDateFormat(currentDate.getMonth() + 1)
    let day = verifyDateFormat(currentDate.getDate())
    let hours = verifyDateFormat(currentDate.getHours())
    let minutes = verifyDateFormat(currentDate.getMinutes())
    let seconds = verifyDateFormat(currentDate.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function verifyDateFormat(value) {
    return value >= 10 ? value : `0${value}`
}

//获取当前时间，并转变为yyyy-MM-dd的格式
export function getCurrentDate() {
    return formatDate(new Date())
}


//取出填空的所有空白字符
export function removeSpace(str) {
    return str.replace(/\s*/g,"")
}

//用于鉴别一个英文字符距离A的距离下标
export function charIndexFromA(char) {
    return char.charCodeAt(0) - "A".charCodeAt(0)
}
