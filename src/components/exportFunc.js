import { rangeArr, resultProps } from "element-plus";
import * as XLSX from "xlsx"

//数据处理：
//1、读取模板文件
//2、抽取目标数据放到模板文件里，返回成果sheet
export function trans(templateJSON,exljson){
    // 筛选出“检出活动”为“系统测试”和“软件集成测试”的内容
    var exl_origin = exljson.filter(function(e){
        return e['检出活动']=='软件集成测试'
        || e['检出活动']=='系统测试'
    })
    // 筛选出以下类型的缺陷  'Solved','Not a bug','Delay/Can not reproduce'
    var exl=exl_origin.filter(function(e){
        return e['缺陷状态']=='Solved' 
        || e['缺陷状态']=='Not a bug' 
        || e['缺陷状态']=='Delay/Can not reproduce'
    })
    for(var i=1;i<=exl.length;i++){
        // console.log(exl[i-1]['缺陷ID'])
        var temp={
            "缺陷验证系统测试用例": 'qxyz'+i,
            "__EMPTY": exl[i-1]['测试环境'],
            "__EMPTY_1": exl[i-1]['测试模块'],
            "__EMPTY_2": exl[i-1]['测试模块'],
            "__EMPTY_3": exl[i-1]['标题'].slice(0,40),
            "__EMPTY_4": '',
            "__EMPTY_5": '',
            "__EMPTY_6": 'L2',
            "__EMPTY_7": '',
            "__EMPTY_8": exl[i-1]['标题']+'\n\n'+exl[i-1]['缺陷ID'],
            "__EMPTY_9": '',
            "__EMPTY_10": exl[i-1]['标题']+'\n\n'+exl[i-1]['缺陷ID'],
            "__EMPTY_11":'手动',
            "__EMPTY_16":'功能性用例'
        }
        templateJSON.push(temp)
    }
    var resultSheet = XLSX.utils.json_to_sheet(templateJSON)

    // 将__EMPTY 这种数据置空
    var cellAddresses = ['B1','C1','D1','E1','F1','G1','H1','I1','J1','K1','L1','M1','N1','O1','P1','Q1','R1'];
    cellAddresses.forEach(function(address) {
        var range = XLSX.utils.decode_cell(address);
        // 清空单元格的内容
        resultSheet[XLSX.utils.encode_cell(range)] = {};
      });
    return resultSheet;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
export function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary',
        cellStyles: true //保留样式，如单元格填充颜色等
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

export function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

