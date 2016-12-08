# angular-webpack

### Quick start

> Clone/Download the repo then edit `app.js` inside [`/src/app/app.js`](/src/app/app.js)

```bash
# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `npm run build`
* build files and watch: `npm start`

##Directory Structure

```bash
├── abc.json  ------------------------- 项目构建配置文件
├── favicon.ico  ---------------------- 页面图标
├── html  ----------------------------- html目录
│   └── index.html  ------------------- 入口页面
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
└── src  ------------------------------ 源码目录
    ├── app  -------------------------- 项目级代码
    │   ├── app.js  ------------------- 项目级脚本逻辑
    │   ├── app.less  ----------------- 全局样式
    ├── components  ------------------- 业务模块集合目录
    ├── i18n  ------------------------- 国际化文案资源文件
    │   ├── en.js
    │   ├── index.js  ----------------- 国际化资源加载器
    │   └── zh-cn.js
    ├── images  ----------------------- 图片资源目录
    └── pages  ------------------------ 页面集合目录
        └── demo  --------------------- 某一个页面
            ├── index.js  ------------- 页面入口文件
            ├── actions.js  ----------- 事件列表
            ├── store.js  ------------- 存储器
            ├── PageDemo.js  ---------- 页面视图逻辑
            └── PageDemo.less  -------- 页面样式
```

