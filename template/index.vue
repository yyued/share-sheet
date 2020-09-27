<template>
  <div class="share-sheet" v-if="isShow">
    <div class="mask" @click="close"></div>
    <dl class="content">
      <dt class="title">继续浏览内容</dt>
      <dd class="item">
        <img :src="appInfo.icon" :alt="appInfo.name">
        <div class="item-body">
          <p class="item-title">{{appInfo.name}}</p>
          <p class="item-slogan">{{appInfo.description}}</p>
        </div>
        <launch-app class="share-sheet-launch">
          <button
            class="button button-primary"
            :style="{color: appInfo.buttonTextColor, background: appInfo.buttonBackgroundColor}"
            @click="appCall">{{appInfo.buttonText || '打开'}}</button>
        </launch-app>
      </dd>
      <dd class="item">
        <img :src="browser.icon" :alt="browser.name">
        <div class="item-body">
          <p class="item-title">{{browser.name}}</p>
        </div>
        <button class="button" @click="close">继续</button>
      </dd>
    </dl>
  </div>
</template>

<script>
import isWechatBrowser from 'yypkg/is-wechat-browser'
import isChrome from 'yypkg/is-chrome'
import isSafari from 'yypkg/is-safari'
import appCall from 'yypkg/app-call'
import launchApp from './wx-open-launch-app.vue'

export default {
  data () {
    return {
      isShow: true,
      browserInfo: {
        safari: {
          name: 'Safari',
          icon: 'https://iovo-oss.yy.com/upload/1599047368163HmOAGwlv3.png'
        },
        wechat: {
          name: '微信',
          icon: 'https://iovo-oss.yy.com/upload/1599047395893nfc_odq5S.png'
        },
        chrome: {
          name: 'Chrome',
          icon: 'https://iovo-oss.yy.com/upload/1599047403712Cj69Z_UIK.png'
        }
      }
    }
  },
  computed: {
    appInfo () {
      return this.$root.appInfo
    },
    browser () {
      if (isWechatBrowser) {
        return this.browserInfo.wechat
      }
      if (isChrome) {
        return this.browserInfo.chrome
      }
      if (isSafari) {
        return this.browserInfo.safari
      }
      return null
    }
  },
  components: {
    'launch-app': launchApp
  },
  methods: {
    appCall () {
      const { universalLink, schemaUrl, fallbackUrl } = this.$root
      appCall({
        universalLink,
        schemaUrl,
        fallbackUrl
      })
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.share-sheet {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 100%;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 30%);
}
.content {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  border-radius: 20px 20px 0 0;
  background: #fff;
}
.title {
  margin: 30px 40px 0;
  font-size: 28px;
}
.item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 40px;
  padding: 40px 0;
  height: 168px;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
  img {
    margin-right: 20px;
    width: 88px;
    height: 88px;
    border-radius: 20px;

  }
}
.item-title {
  font-weight: 500;
  font-size: 32px;
}
.share-sheet-launch,
.button {
  position: absolute;
  top: 50%;
  right: 0;
  width: 160px;
  height: 72px;
  transform: translateY(-50%);
}
.button {
  outline: none;
  border: none;
  border-radius: 12px;
  background: #eee;
  font-weight: 500;
  font-family: "San Francisco", "Helvetica Neue", "Helvetica, Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", "sans-serif";
  &:active {
    background: #ddd;
  }
}
.button-primary {
  background: #121212;
  color: #fff;
  &:active {
    background: #242424;
  }
}
</style>
