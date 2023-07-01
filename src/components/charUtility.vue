<template>
<transition name="fade">
   <div v-if="showCopied" class="copied">已复制</div>
</transition>
<pre ref="text" @click="copyText">{{randomStr}}</pre>
<div>
    <div v-for="i in 6" :key="i">
      <input type="checkbox" v-model="aaa[i-1]" v-bind:true-value="1" v-bind:false-value="0">
      <label>{{ names[i-1] }}</label>
    </div>
</div>
<div>
    <p>字符长度</p>
    <input v-model="numLen" placeholder="请输入字符长度">
</div>
<el-button @click="generateRandomStr()" 
style="margin-top: 20px; margin-bottom: 20px;">生成随机字符</el-button>

</template>

<script>

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
function randomString(len,aa) {
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
  const $chinese = '落霞与孤鹜齐飞秋水共长天一色'
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
  return shuffle(result)
}


export default {
  data() {
    return {
      randomStr: '',
      numLen:32,
      showCopied: false,
      aaa: [1, 1, 1, 1, 1, 0],
      names:['大写字母','小写字母','数字','中文','符号','空格']
    };
  },
  methods: {
    generateRandomStr() {
      console.log(this.aaa)
      this.randomStr = randomString(this.numLen,this.aaa);
      console.log(this.randomStr)
      console.log(this.randomStr.length)
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
pre {
  font-size: 30px;
  white-space: pre-wrap;
  margin-bottom:30px;
}

div {
  margin-top: 10px;
  margin-bottom: 10px;
}

label {
  margin-left: 10px;
  font-size: 15px;
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