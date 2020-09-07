//所有人可能会用的工具类
/**
 * 时间格式规范化工具，整理成为形如03:36:29格式的时间
 * @param currentDate new Data类型 别搞别的类似参数
 * @returns {string} 返回符合格式的时间
 * @author 小余
 */
export function formatDate(currentDate) {
    //参数大小校验，如果得到的描述>10，则直接返回，如果<10的话则变为0*的格式返回
    function verify(value) {
        return value > 10 ? value : `${0 + value}`
    }
    let hours = verify(currentDate.getHours())
    let minutes = verify(currentDate.getMinutes())
    let seconds = verify(currentDate.getSeconds())

    return `${hours-minutes-seconds}`
}