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
      缺陷转用例工具
    </div>
    <img alt="upload logo" class="logo" src="@/assets/upload.svg" width="125" height="125" />
    <div class="el-upload__text">
      拖拽文件到此处或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <h3>
          使用说明<br /><br />
          1、从你的项目OA中导出缺陷列表，内容选择全部即可，得到缺陷列表.XLSX <br /><br /> 
          2、将缺陷列表.XLSX上传到这里  <br /> <br /> 
          3、等待2-3秒后，你要的用例会自动下载。注意：需要你使用excel打开该文件并保存一次后，才能上传ET
        </h3>
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
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`最多导入 1 个文件，请刷新页面来导入新的文件！！`);
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

          const exlname = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[exlname];

          // 处理缺陷ID，提取超链接
          const range = XLSX.utils.decode_range(worksheet['!ref']);
          for (let R = range.s.r; R <= range.e.r; ++R) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 }); // 指定为第一列（索引为 0）
            if (worksheet[cellAddress] && worksheet[cellAddress].l) {
              const hyperlink = worksheet[cellAddress].l.Target;
              worksheet[cellAddress].v = hyperlink;
              // console.log(worksheet[cellAddress]);
            }
          }

          const exl = XLSX.utils.sheet_to_json(worksheet); // 生成json表格内容

          //数据处理 (模板json,缺陷列表)
          var result_sheet=trans(templateJSON,exl); // （模板js变量，目标json）

          //下载数据
          openDownloadDialog(sheet2blob(result_sheet,'缺陷验证'),'result.xlsx');
          
          // 显示一条成功消息并自动关闭
          this.$message.success("用例转换完成，已下载！")
          
          // 将 JSON 数据挂到 data 里
          // let arr = []
          // exl.forEach(item => {
          //   arr.push(item.name)
          // })
          // console.log("----print array----")
          // console.log(arr)

        } catch (e) {
          console.log('error:'+e)
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

<css>
.el-message__content {
  font-size: 2em; /* 根据需要调整字体大小 */
}
</css>