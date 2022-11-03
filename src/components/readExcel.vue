<template>
  <el-upload
    class="upload-demo"
    drag
    accept=".xlsx"
    multiple
    :limit="3"
    :http-request="httpRequest"
    :on-exceed="handleExceed"
  >
    <img alt="upload logo" class="logo" src="@/assets/upload.svg" width="125" height="125" />
    <div class="el-upload__text">
      拖拽文件到此处或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        你上传的excel文件名会显示在这里
      </div>
    </template>
  </el-upload>
</template>

<script>
import * as XLSX from 'xlsx'
import {templateJSON} from './template.js'
import {sheet2blob,openDownloadDialog,trans} from './exportFunc.js'


export default{
  methods: {
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`最多导入 3 个文件（总要有个限制吧。。），请刷新页面来导入新的文件！！`)
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
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            // 以字符编码的方式解析
            type: 'binary'
          })
          // 取第一张表
          // console.log("----print first sheet----")
          // console.log(workbook)
          const exlname = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[exlname]
          const exl = XLSX.utils.sheet_to_json(worksheet) // 生成json表格内容
          // console.log("----print json----")
          // console.log(exl)

          //数据处理
          var result_sheet=trans(templateJSON,exl)  // （模板js变量，目标json）
          alert('数据转换完成，即将开始下载！')
          //下载数据
          openDownloadDialog(sheet2blob(result_sheet),'你要的用例.xlsx')
          // 将 JSON 数据挂到 data 里
          // let arr = []
          // exl.forEach(item => {
          //   arr.push(item.name)
          // })
          // console.log("----print array----")
          // console.log(arr)

        } catch (e) {
          console.log('error'+e)
          return false
        }
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
