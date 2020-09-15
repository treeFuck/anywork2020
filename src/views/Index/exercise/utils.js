//user做完了 查看答题记录 需要把用户把答案填充进入execiserrList
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
        "analysis": {
            isTrue: null,
            analysis: null,
            userAns: null
        },
        "type": outerData.type,
        "content": outerData.content,
        "ansList": null,
        "isStar": {
            star: false
        }
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

/**
 * 用户查看答题结果 自动填充答案 同时把题目分析存入exerciseList里面
 * @param arr
 * @param exerciseList
 */
export function autoFillAns(arr, exerciseList) {
    const { studentAnswerAnalysis } = arr

    for (let i = 0; i < studentAnswerAnalysis.length; i++) {
        const type = studentAnswerAnalysis[i].question.type
        const ans = studentAnswerAnalysis[i].question.key

        exerciseList[i].analysis.isTrue = studentAnswerAnalysis[i].isTrue
        exerciseList[i].analysis.analysis = studentAnswerAnalysis[i].question.analysis
        exerciseList[i].isStar.star = studentAnswerAnalysis[i].collectionStatus
        exerciseList[i].analysis.userAns =
            studentAnswerAnalysis[i].studentAnswer.replace(/∏/g, ";")

        switch (type) {
            case 1: {
                //选择题类别
                const index = ans.charCodeAt(0) - 'A'.charCodeAt(0)
                exerciseList[i].ansList[index].isChoose = true
                break
            }
            case 2: {
                //判断题类别
                exerciseList[i].ansList[ans].isChoose = true
                break
            }
            case 3: {
                //填空题类别
                //不存在这个符号的时候说明只有一个填空
                if (ans.indexOf('∏') < 0) {
                    exerciseList[i].fillNumber[0].fillContent = ans
                } else if (ans.indexOf('∏') > -1) {
                    const correctAns = ans.split('∏')

                    for (let j = 0; j < exerciseList[i].fillNumber.length; j++) {
                        exerciseList[i].fillNumber[j].fillContent = correctAns[j]
                    }
                }
                break
            }
            default: {
                throw new Error('出错。题目类别非1 2 3.')
            }
        }
    }
}


