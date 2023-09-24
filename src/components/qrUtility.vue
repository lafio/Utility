<template>
    <div class= "container">
        <qrcode-vue :value="url" :size="size" level="H" 
        :style="{border:'20px solid white'}" @click="refresh"></qrcode-vue>
        <input type="text" v-model="url" placeholder="请输入内容" />
        <h5>刷新页面 或者 点击二维码，会自动获取你剪切板的内容</h5>
    </div>
    <div class = "charNum">
      <label>输入内容有 {{ charCount }} 个字符</label>
      <label>输入内容有 {{ utf8Length }} 个字节(UTF-8编码)</label>
      <label>输入内容有 {{ gbkLength }} 个字节(gbk编码)</label>
    </div>
  </template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      url: "https://www.bing.com", // 这里可以是你从后台获取的链接
      size: 250, // 这里可以是你想要的大小
    };
  },
  mounted() {
    this.refresh();
  },
  computed:{
    charCount(){
      return this.url.length;
    },
    utf8Length(){
      return this.url.replace(/[\u0000-\u007f]/g,"a")
        .replace(/[\u0080-\u07ff]/g,"aa")
        .replace(/[\u0800-\uffff]/g,"aaa").length;
    },
    gbkLength(){
      var count = 0;
      if(this.url){
        for(var i = 0; i<this.url.length; i++){
          if(this.url.charCodeAt(i) > 255){
            count += 2;
          }else{
            count += 1;
          }
        }
        return count
      }else{
        return 0;
      }
      
    }
  },
  methods:{
    refresh(){
      // console.log(typeof navigator.clipboard)
      navigator.clipboard
      .readText()
      .then((text) => {
        this.url = text;
      })
      .catch((err) => {
        console.error("读取剪切板失败", err);
      });
    }
  }
};

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.charNum {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}

input {
  width: 300px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
