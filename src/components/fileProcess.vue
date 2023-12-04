<template>  
  <div>  
    <input  
      type="file"
      name="img"
      ref="fileInput"  
      @change="handleFileChange"  
    />  
    <div>  
    <label for="text">文本内容:</label>  
    <input type="text" id="textContent" name="text">  
  </div>
    <div>  
    <label for="text">文本大小:</label>  
    <input type="text" id="textSize" name="size">  
  </div>
    <button  
      type="button"  
      @click="uploadFile"  
    >  
      上传文件  
    </button>  
  </div>  
</template>  
   
<script>  
import axios from 'axios';  
import { saveAs } from 'file-saver';  
 
 
export default {  
  name: 'FileUpload',  
  methods: {  
    handleFileChange() {  
      const file = this.$refs.fileInput.files[0];  
      this.formData = new FormData();  
      this.formData.append('file', file);  
    },  
  
  
    async uploadFile() {  
      const url = 'http://faas2.hiktest.com/function/sn-6925-fileprocesstest';  
      // const url = 'http://10.66.198.165:2656';  
      const config = {  
        headers: {  
          'content-type': 'application/octet-stream',  
          // 'content-type': 'multipart/form-data',
        },
        responseType: 'blob'   
      };  
      const textContent = document.getElementById('textContent').value; // 获取文件 
      const textSize = document.getElementById('textSize').value; // 获取文本字段的值 
      
      this.formData.append('text', textContent); // 添加文本字段 
      this.formData.append('size', textSize); // 添加文本字段 
        
      // const response = await axios.post(url, this.formData, config);  
      axios.post(url,this.formData,config).then(response => {  
        const blob = new Blob([response.data]);  
        saveAs(blob, 'result.jpg'); 
      }
      ).catch(error => {  
      console.log("error:"+error)  
  });  
    }  
  }  
}  
</script>  