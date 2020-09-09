//单个vue的工具类，一些和this不太相关的业务逻辑可以存放在这里，避免vue文件过于庞大，难以阅读

/**
 * @author 小余
 * @param outerData 后台传入数据list的单个，list[i]
 * @param index 题号下标索引
 * @returns {*}
 */
export function reFormatData(outerData, index) {
    const formatData = {
        "index": index + 1,
        "fillNumber": initFillInputKey(outerData.other),
        "questionId": outerData.questionId,
        "type": outerData.type,
        "content": outerData.content,
        "ansList": null
    }
    //根据不同的题目类似把答案选项整理为不同的数据结构
    //1->单选，2->判断，3->填空
    switch (outerData.type) {
        case 1: {
            formatData.ansList = [
                {
                    key: 1,
                    vocabulary: 'A',
                    ans: outerData.a,
                    //是否被选中
                    isChoose: false
                },
                {
                    key: 2,
                    vocabulary: 'B',
                    ans: outerData.b,
                    isChoose: false
                },
                {
                    key: 3,
                    vocabulary: 'C',
                    ans: outerData.c,
                    isChoose: false
                },
                {
                    key: 4,
                    vocabulary: 'D',
                    ans: outerData.d,
                    isChoose: false
                },
            ]
            break
        }
        case 2: {
            formatData.ansList = [
                {
                    key: 1,
                    vocabulary: '1',
                    ans: '',
                    isChoose: false
                },
                {
                    key: 2,
                    vocabulary: '0',
                    ans: '',
                    isChoose: false
                },
            ]
            break
        }
        default: {
            formatData.ansList=  []
        }

    }

    return formatData
}

//根据outerData.other字段即填空题坑的个数动态生成一个带key和填空内容的数组的数组
function initFillInputKey(number) {
    const key = []

    for (let i = 0; i < number; i++) {
        key.push({key: i, fillContent: ''})
    }

    return key
}

