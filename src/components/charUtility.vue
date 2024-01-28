<template>
<div class = "container">
<div>
<transition name="fade">
   <div v-if="showCopied" class="copied">已复制</div>
</transition>
<div class = "resultStyle" v-if="enableShuffle" ref="text" @click="copyText">{{randomStr}}</div>
<div class = "resultStyle" v-if="!enableShuffle" ref="text" @click="copyText">{{notRandomStr}}</div>
<div>
    <div v-for="i in 6" :key="i">
      <input type="checkbox" v-model="aaa[i-1]" v-bind:true-value="1" v-bind:false-value="0">
      <label>{{ names[i-1] }}</label>
    </div>
  <br/>
    <input type="checkbox" v-model="enableShuffle" v-bind:true-value="1" v-bind:false-value="0">
    <label>打乱顺序</label>
</div>
<div>
    <p>字符串长度</p>
    <input v-model="numLen" type = "number" placeholder="请输入字符串长度">
</div>
<div>
<p>汉语词库</p><input type="text" v-model="chineseText" placeholder="chineseText" />
</div>
<el-button @click="generateRandomStr()" 
style="margin-top: 20px; margin-bottom: 20px;">生成随机字符串</el-button>
</div>
<div class= "myQRcodeclass" v-if="enableShuffle">
      <qrcode-vue :value="randomStr" :size="QRsize" level="H" 
      :style="{border:'20px solid white'}" @click="copyText"></qrcode-vue>
  </div>
  <div class= "myQRcodeclass" v-if="!enableShuffle">
      <qrcode-vue :value="notRandomStr" :size="QRsize" level="H" 
      :style="{border:'20px solid white'}" @click="copyText"></qrcode-vue>
  </div>
</div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

function shuffle(str) {
  var arr = str.split('');
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var idx = Math.floor(Math.random() * (len - i));
    var temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr.join('');
}

function getRandomS(charOrigin,g){
  var charWeNeed = '';
  var maxPos = charOrigin.length;
  for (let i = 0; i < g; i++) {
    charWeNeed += charOrigin.charAt(Math.floor(Math.random() * maxPos));
  }
  //console.log('====='+charWeNeed)
  return charWeNeed;
}
function randomString(len,aa,chineseText) {
  len = len || 32;
  let sum = aa.reduce((a, b) => a + b);
  let t = Math.floor(len / sum)
  let r = len % sum
  //console.log((aa))
  //let l = 0
  let m = 0
  const $big = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const $small = 'abcdefhijkmnopqrstuvwxyz'
  const $num = '1234567890'
  const $chinese = chineseText
  const $symbol = '~!@#$%^&*()_+-={}[]|;:,.<>?'
  const $kong = ' ' 
  let result = ''
  let listAll = [$big,$small,$num,$chinese,$symbol,$kong]
  for(let j = 0; j<listAll.length; j++){
    result += getRandomS(listAll[j],t*aa[j])
  }
  if(r>0){
    for(let k = 0; k<aa.length; k++){
        if(aa[k]>0){
            //l = aa[k]
            m = k
            break
        }
    }
    result += getRandomS(listAll[m],r)
  }
  // console.log("result:",result)
  // console.log("shuffle result:",shuffle(result))
  return [result,shuffle(result)]
}


export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      QRsize: 250,
      randomStr: '',
      notRandomStr:'',
      numLen:32,
      showCopied: false,
      enableShuffle: false,
      aaa: [1, 1, 1, 1, 1, 0],
      names:['大写字母','小写字母','数字','中文','符号','空格'],
      chineseText:'长风破浪会有时'
    };
  },
  methods: {
    generateRandomStr() {
      console.log(this.aaa)
      var list_result = randomString(this.numLen,this.aaa,this.chineseText);
      this.notRandomStr = list_result[0]
      this.randomStr = list_result[1]
      console.log(this.notRandomStr.length)
    },
    copyText() {
      const text = this.$refs.text.innerText;
      navigator.clipboard.writeText(text);
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1000);
    },
  },
  mounted(){
    this.generateRandomStr()
  }
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.myQRcodeclass {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.resultStyle {
  font-size: 25px;
  white-space: nowrap;
  margin-bottom:30px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height:50px;
  max-width: 500px;
}

div {
  margin-top: 10px;
  margin-bottom: 10px;
}

label {
  margin-left: 10px;
  font-size: 20px;
}

input {
  margin-right: 10px;
  font-size: 20px;
}
.fade-enter-active,
.copied {
  position: absolute;
  top: -30px;
  left: -20px;
}

</style>