# Utility

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 纯前端部署经验总结

* 项目打包 `npm run build` 获得dist文件夹
* 将dist文件夹拷贝到用于部署的电脑上
* 在部署的电脑上操作：`npm install -g serve` 对于不能访问互联网的电脑可以拷贝 appdata/roaming/npm/ 下的 serve 文件 和 node_modules下的 serve 文件夹到部署的电脑上
* 在部署的电脑上操作：`serve -s dist -p 80`  即开启服务，其中 80 是端口，可修改