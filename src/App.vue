<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/dog.jpg" width="125" height="125" /> -->

    <div class="wrapper">
      <HelloWorld msg="==工具箱==" />

      <nav>
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/translater">缺陷转用例</RouterLink>
        <RouterLink to="/QRcodeGenerater">二维码生成</RouterLink>
        <RouterLink to="/charGenerater">随机字符生成</RouterLink>
        <RouterLink to="/matplot">图像绘制</RouterLink>
        <!-- <RouterLink to="/fileProcess">文件处理</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView class="routerCSS"/>
  <div class="version-watermark">版本: 2024-02-19</div>
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.routerCSS{
  margin-top:20px;
}

.version-watermark {
  position: fixed;
  bottom: 16px; /* 根据需要调整与底部的距离 */
  right: 16px; /* 根据需要调整与右侧的距离 */
  opacity: 0.5; /* 调整透明度 */
  font-size: 14px; /* 根据需要调整字体大小 */
  color: #fff; /* 可以根据需要更改文字颜色 */
  background-color: rgba(0, 0, 0, 0.5); /* 设置背景颜色并调整透明度 */
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
