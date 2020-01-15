# wallbase.tv 前后端分离

> [https://www.wallbase.tv/](https://www.wallbase.tv/)

#### 该项目使用纯vue技术开发,本站是大型单页SPA应用

### 开发环境
> 默认端口9000,本地开发代理端口到后台springb-boot项目8080端口

```shell
# yarn install
# yarn start
```

### 生产环境打包

```shell
# yarn build
```

### docker-compose部署

```shell
docker-compose -f docker-app-compose.yml pull
docker-compose -f docker-app-compose.yml up -d --no-deps --build
```
