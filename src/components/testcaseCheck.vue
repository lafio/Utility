<template>
  <el-upload
    class="upload-demo"
    drag
    accept=".xlsx"
    multiple
    :limit="1"
    :http-request="httpRequest"
    :on-exceed="handleExceed"
  >
  <div style="font-size: 16px; color: blue;">
      用例检查工具
    </div>
    <img alt="upload logo" class="logo" src="@/assets/upload.svg" width="125" height="125" />
    <div class="el-upload__text">
      拖拽文件到此处或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <h3>
          使用说明<br /><br />
          上传用例文件，工具会做以下处理：<br />
          1、
        </h3>
      </div>
    </template>
  </el-upload>
</template>

<script>
import {tableHead} from './tableHead.js'
import * as XLSX from 'xlsx'
import {sheet2blob,openDownloadDialog} from './exportFunc.js'

export default{
  methods: {
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`最多导入 1 个文件，请刷新页面来导入新的文件！！`)
    },
    httpRequest (e) {
      let file = e.file // 文件信息
      if (!file) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        // try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            // 以字符编码的方式解析
            type: 'binary'
          })
          // 取第一张表

          const exlname = workbook.SheetNames[0]
          var worksheet = workbook.Sheets[exlname]

          const cells = XLSX.utils.decode_range(worksheet['!ref']);
          for (let R = cells.s.r; R <= cells.e.r; ++R) {
            for (let C = cells.s.c; C <= cells.e.c; ++C) {
              // 在这里处理每一列的数据
              const cellAddress = XLSX.utils.encode_cell({ r: R, c: C }); 
              var cell = worksheet[cellAddress]
              if(R == 6){
                if(tableHead.indexOf(cell.v) == -1){
                  console.log("表头存在错误数据！");
                  alert("表头存在错误数据！");
                  return false;
                }
              }else if(R >=7){
                console.log(1234);
                if(cell){
                  // console.log("存在空数据！");
                  cell.s = { fill: { fgColor: { rgb: 'FF0000' } } }
                }
              }
          //   if (worksheet[cellAddress] && worksheet[cellAddress].l) {
          //     const hyperlink = worksheet[cellAddress].l.Target;
          //     worksheet[cellAddress].v = hyperlink;
              // console.log(worksheet[cellAddress]);
            }
          }
          console.log(tableHead)
          // const exl = XLSX.utils.sheet_to_json(worksheet) // 生成json表格内容

          // //数据处理 (模板json,缺陷列表)
          // var result_sheet=trans(templateJSON,exl)  // （模板js变量，目标json）

          //下载数据
          openDownloadDialog(sheet2blob(worksheet,'缺陷验证'),'result.xlsx')

          alert('数据转换完成，已下载！')

          // 将 JSON 数据挂到 data 里
          // let arr = []
          // exl.forEach(item => {
          //   arr.push(item.name)
          // })
          // console.log("----print array----")
          // console.log(arr)

        // } catch (e) {
        //   console.log('error:'+e)
        //   return false
        // }
      }
      fileReader.readAsBinaryString(file)
    },
    load () {
      console.log(encodeURI('/static/test.xlsx'))
      // window.location = '/static/test.xlsx'
      location.href = '/static/test.xlsx'
    }
  }
}

</script>
