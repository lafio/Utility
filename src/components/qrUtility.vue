<template>
    <div class= "container">
        <qrcode-vue :value="url" :size="size" level="H" 
        :style="{border:'20px solid white'}" @click="refresh"></qrcode-vue>
        <input type="text" v-model="url" placeholder="请输入内容" />
        <h5>刷新页面 或者 点击二维码，会自动获取你剪切板的内容</h5>
    </div>
    <div class = "charNum">
      <label>输入内容有 {{ charCount }} 个字符</label>
      <label>输入内容有 {{ byteLength }} 个字节(UTF-8编码)</label>
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
      charCount:0,
      byteLength:0
    };
  },
  mounted() {
    this.refresh();
  },
  methods:{
    refresh(){
      console.log(typeof navigator.clipboard)
        navigator.clipboard
      .readText()
      .then((text) => {
        this.url = text;
        this.charCount = this.url.length;
        this.byteLength = this.url.replace(/[\u0000-\u007f]/g,"a")
        .replace(/[\u0080-\u07ff]/g,"aa")
        .replace(/[\u0800-\uffff]/g,"aaa").length;
        console.log(this.byteLength);

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
