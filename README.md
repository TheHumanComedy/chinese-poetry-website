<p align="center"><a href="https://nicelins.site?from=github" target="_blank"><img width="256"src="https://github.com/TheHumanComedy/chinese-poetry-website/blob/master/client/src/assets/icons/logo.png"></a></p>

<h1 align="center">🚧 中华古诗数据库接口网</h1>

<div align="center">
  🗝 中华古诗数据库接口网( Mongodb + Node.js )，涵有近 5.5 万首唐诗、26 万宋诗，以及万余唐宋诗人；数据源于 <a href="https://github.com/chinese-poetry/chinese-poetry-zhCN">chinese-poetry-zhCN</a>；网站模板出自 <a href="https://github.com/nicejade/docker-vue-node-nginx-mongodb-redis">docker-vue-node-nginx-mongodb-redis</a>。
</div>

<br>

<div align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%206.11.5-brightgreen.svg" alt="NodeJs">
  </a>
  <a href="https://github.com/TheHumanComedy/chinese-poetry-website">
    <img src="https://img.shields.io/github/license/TheHumanComedy/chinese-poetry-website.svg" alt="LICENSE">
  </a>
  <a href="https://github.com/TheHumanComedy/chinese-poetry-website">
    <img src="https://img.shields.io/github/package-json/v/TheHumanComedy/chinese-poetry-website.svg" alt="LICENSE">
  </a>
  <a href="https://github.com/TheHumanComedy"><img src="https://img.shields.io/badge/Author-梅林横纵客-%23a696c8.svg" alt="Author 梅林横纵客"></a>
</div>

## Features

- Powered by [Vue2.*](https://vuejs.org/) & [Koa2.*](https://koajs.com/) & [Mongodb](https://www.mongodb.com/) & [Nginx](https://www.nginx.com/) & [Redis](https://redis.io/) & [Docker](https://docs.docker.com/compose/install/)
- Integrate Front-End, Back-End, Database into `Docker`
- Rich features and constantly optimized design
- Based on the awesome third-party libraries

## Prerequisites

[Node.js](https://nodejs.org/en/) (>=6.x, 8.x preferred), Npm version 4+([Yarn](https://jeffjade.com/2017/12/30/135-npm-vs-yarn-detial-memo/) preferred), [Git](https://git-scm.com/), [Mongodb](https://www.mongodb.com/), [Nginx](https://www.nginx.com/), [Redis](https://redis.io/) and [Docker](https://docs.docker.com/compose/install/).

## Getting started

```bash
# 🎉 clone the project
git clone https://github.com/TheHumanComedy/chinese-poetry-website.git
# ➕ install dependencies
cd chinese-poetry-website
yarn && yarn bootstrap

# 🚧 start developing
yarn start

# Or Run the following commands in the terminal two different TAB
cd client && yarn start
cd server && yarn start
```

## Migrate Data

```bash
# download data souruce
git submodule update --init

# if you change the submodule url
# git submodule sync
# git submodule update --init --recursive --remote
cd data & yarn data:start
```

The program will automatically open http://localhost:8080/ for client and http://localhost:4000/ for server. Intelligently, it will specify the available port for you (incremental, eg: `8081` or `8082`) if port `8080` is busying on your machine.

## Deployment

```bash
# 🚀 deploy your client & server(local or server)
yarn deploy

# Or Run the following command at root directory
docker-compose up
```

## Links

- [**NICE LINKS**](https://nicelinks.site?from=github)
- [About Me](https://about.me/nicejade/)
- [Latest blog](https://nice.lovejade.cn/)
- [First Blog](https://jeffjade.com/)
- [Second Blog](https://blog.lovejade.cn/)
- [Weibo](https://weibo.com/jeffjade)
- [ZhiHu](https://www.zhihu.com/people/yang-qiong-pu/)
- [SegmentFault](https://segmentfault.com/u/jeffjade)
- [JianShu](http://www.jianshu.com/u/9aae3d8f4c3d)
- [Twitter](https://twitter.com/jeffjade2)
- [Facebook](https://www.facebook.com/yang.gang.jade)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, [梅林横纵客](https://github.com/TheHumanComedy).