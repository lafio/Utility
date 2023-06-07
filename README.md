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

### 部署https服务

* 要使用 http-server 开启一个 https 服务，需要先生成证书密钥对文件，然后使用 -S -C -K 参数指定证书和密钥的路径。
* 从这里下载openssl安装包 `https://slproweb.com/products/Win32OpenSSL.html`
* 然后可以使用以下命令生成证书密钥对文件：

```bash
openssl genrsa -out key.pem 1024
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem -days 365
```

* 然后，您可以使用以下命令开启 https 服务：

```bash
http-server dist -S -C cert.pem -K key.pem -p 80
```