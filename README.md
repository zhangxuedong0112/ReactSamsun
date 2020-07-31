### 技术栈

- umi 脚手架
    - [文档](https://umijs.org/zh-CN/docs/navigate-between-pages)
- antd 4
- React 框架
- React Hook 推荐使用
    - [文档](https://react.docschina.org/docs/hooks-intro.html)
- mobx 状态管理
- axios request请求

### 开始使用

安装

```bash
$ yarn
```

启动

```bash
$ yarn start
```

打包

```bash
$ yarn build
```

本地测试打包后文件

```
<!-- 安装serve -->
$ yarn add -g serve

<!-- 检测某个文件夹 -->
$ server ./dist
```

多环境启动，可在package.json 自行添加

```
<!-- dev -->
$ yarn start:dev

<!-- sit -->
$ yarn start:sit

<!-- uat -->
$ yarn start:uat
```

获取多环境参数

``` tsx
const { REACT_APP_ENV } = process.env;
```

### 目录介绍

![avatar](./md/imgs/directory1.jpg)