# share-sheet

Share Sheet 是一个基于 Vue.js 的用于 Web 打开 APP 客户端的一体化方案，兼容 iOS 与 Android，支持微信开放标签 `<wx-open-launch-app>`

![npm](https://img.shields.io/badge/npm-0.0.2-brightgreen.svg)

* 唤起 APP 的逻辑详见 [yypkg/appCall](https://yypkg.github.io/doc.html#appcall)
* UI 组件建议通过 `git clone` 直接放到项目中使用，如使用 npm 安装，请配置 vue loader；


## DEOM

<img src="https://iovo-oss.yy.com/upload/1601195469104F8fovabDL.jpeg" width="350" border="1">


## 使用

```
git clone https://github.com/yyued/share-sheet.git
```

```js
import shareSheet from '@/components/share-sheet'
Vue.use(shareSheet)

// 初始化
const url = encodeURIComponent(window.location.href)
this.$shareSheet({
  wechatOpenTag: {
    enable: true,
    appID: 'xxx',
    extInfo: ''
  },
  appInfo: {
    name: 'FIMO',
    description: '还原真实胶卷体验',
    icon: 'https://iovo-oss.yy.com/upload/1599048092406236UUHtCU.png',
    buttonText: '打开',
    buttonTextColor: '#fff',
    buttonBackgroundColor: '#121212'
  },
  universalLink: `https://fimoapp.com?url=${url}`,
  schemaUrl: `fimo://fimoapp.com?url=${url}`,
  fallbackUrl: 'https://fimoapp.com'
})
```

## 参数

|  参数  | 是否必填  | 默认值  |  说明  |
|  ----  | ----  | ----  | ----  |
| `wechatOpenTag`  | 否 | 空 | 微信开放标签 `<wx-open-launch-app>` 相关参数 |
| `wechatOpenTag.enable`  | 空 | 否 | 使用启用微信开放标签 |
| `wechatOpenTag.appID`  | 空 | 否 | appid |
| `wechatOpenTag.extInfo`  | 空 | 否 | extInfo |
| `appInfo`  | 空 | 否 | APP 信息 |
| `appInfo.name`  | 空 | 否 | APP 名称 |
| `appInfo.description`  | 空 | 否 | APP 描述 |
| `appInfo.icon`  | 空 | 否 | APP logo |
| `appInfo.buttonText`  | 空 | 否 | APP 按钮文案 |
| `appInfo.buttonTextColor`  | 空 | 否 | APP 按钮文本颜色 |
| `appInfo.buttonBackgroundColor`  | 空 | 否 | APP 按钮背景颜色 |
| `universalLink`  | 空 | 否 | universal links |
| `schemaUrl`  | 空 | 否 | URL Schema |
| `fallbackUrl`  | 空 | 否 | fallback 链接，当打开 APP 失败时跳转到该链接 |





