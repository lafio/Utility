export var templateJSON = [
    {
        "缺陷验证系统测试用例": "模块描述",
        "__EMPTY": "简单描述该模块要实现的功能"
    },
    {
        "缺陷验证系统测试用例": "测试环境",
        "__EMPTY": "测试记录中填写，至少要包括测试型号"
    },
    {
        "缺陷验证系统测试用例": "测试版本",
        "__EMPTY": "测试记录中填写"
    },
    {
        "缺陷验证系统测试用例": "测试日期",
        "__EMPTY": "左对齐、靠上"
    },
    {
        "缺陷验证系统测试用例": "测试人员",
        "__EMPTY": "左对齐、靠上"
    },
    {
        "缺陷验证系统测试用例": "用例编号",
        "__EMPTY": "子模块",
        "__EMPTY_1": "子功能",
        "__EMPTY_2": "测试项",
        "__EMPTY_3": "用例名称",
        "__EMPTY_4": "标签1",
        "__EMPTY_5": "标签2",
        "__EMPTY_6": "用例等级",
        "__EMPTY_7": "前置条件",
        "__EMPTY_8": "测试步骤",
        "__EMPTY_9": "测试数据",
        "__EMPTY_10": "预期结果",
        "__EMPTY_11": "执行方式",
        "__EMPTY_12": "P/F/NT/Delay",
        "__EMPTY_13": "缺陷严重级",
        "__EMPTY_14": "实际测试结果",
        "__EMPTY_15": "备注"
    }
]

/*
把以下这段代码复制到到浏览器 console 中，可以临时作为函数调用，来保存js对象为json文件
(function(console){
 
    console.save = function(data, filename){
 
        if(!data) {
            console.error('Console.save: No data')
            return;
        }
 
        if(!filename) filename = 'console.json'
 
        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }
 
        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')
 
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)
*/
