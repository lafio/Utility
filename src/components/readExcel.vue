<template>
 <div>
            <p>上传填好的顾客信息<span class="tip-msg">（仅支持xls/xlsx格式）</span></p>
            <el-button type="text" @click="select_file" class="uploadfile">
              上传文件
              <input type="file" class="filexls" ref="file" name="file" accept=".xlsx,.xls" id="xlf" @change="change_file">
            </el-button>
            <p class="select-file-info" v-show="file_size">
              {{file_name}}（{{file_size}}kb）
              <i class="el-icon-close pointer" @click="delet_select_file"></i>
            </p>
   </div>
</template>

<script>
import XLSX from 'xlsx'
  export default{
		methods:{
			// 获取文件
		      change_file(e){
		        if(this.$refs.file && !this.$refs.file.files[0]) return false;
		        const selected_file = this.$refs.file.files[0];
		        this.fileExcel.oldFile = selected_file;
		        this.file_name = selected_file.name;
		        this.file_size = selected_file.size ? (selected_file.size / 1024).toFixed(2) : 0;
		        this.readFule(selected_file)
		      },
		      readFule(file){
		        var name = file.name;
		        var reader= new FileReader();
		        let that = this;
		        reader.onload = function (e) {
		            that.fileExcel.oldFile = e.target.result;
		            var wb = XLSX.read(that.fileExcel.oldFile, { type: "binary" });
		            // console.log(wb);
		            var wb_sheetname=wb.SheetNames[0];
		            const wb_sheet = wb.Sheets[wb_sheetname]
		            // console.log(wb_sheet);
		            let fromTo = "";
		            fromTo = wb_sheet['!ref'];
		            // console.log(fromTo + "fromTo")
		            that.selectFileData = XLSX.utils.sheet_to_json(wb_sheet);
		            console.log(that.selectFileData);
		            if(!that.selectFileData.length){
		              tipsMsg(that,'error',`上传的文件数据为空！`);
		              return false
		            }
		            that.get_result();
		        };
		        reader.readAsBinaryString(file);
		      },
		}
  }

</script>