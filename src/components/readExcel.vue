<template>
  <el-upload
    class="upload-demo"
    drag
    accept=".xlsx"
    multiple
    :limit="1"
    :http-request="httpRequest"
  >
    <img alt="upload logo" class="logo" src="@/assets/upload.svg" width="125" height="125" />
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script>
import * as XLSX from 'xlsx'

export default{
  methods: {
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
          console.log("----print first sheet----")
          console.log(workbook)
          const exlname = workbook.SheetNames[0]
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          console.log("----print json----")
          console.log(exl)
          // 将 JSON 数据挂到 data 里
          let arr = []
          exl.forEach(item => {
            arr.push(item.name)
          })
          console.log("----print array----")
          console.log(arr)
        } catch (e) {
          console.log('error')
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
