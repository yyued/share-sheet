<template>
  <div class="launch">
    <wx-open-launch-app
      class="launch-btn"
      ref="launchButton"
      v-if="isShow"
      @ready="launchAppReady"
      @launch="launchAppSuccess"
      @error="launchAppError"
      :appid="wechatOpenTag.appID"
      :extinfo="wechatOpenTag.extInfo"
    >
      <script type="text/wxtag-template">
        <style>.button {width: 100%; height: {{buttonHeight}}px; opacity: 0; }</style>
        <div class="button"></div>
      </script>
    </wx-open-launch-app>
    <slot></slot>
  </div>
</template>

<script>
import compareVersion from 'yypkg/compare-version'
import appCall from 'yypkg/app-call'

export default {
  name: 'launch-app',
  data () {
    return {
      buttonHeight: 100
    }
  },
  computed: {
    isShow () {
      const wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\\.]+)/i)

      // 非微信或者 iOS 系统不显示
      if (!this.wechatOpenTag.enable || !wechatInfo) {
        return false
      }

      // 微信版本号大于等于7.0.12
      if (compareVersion(wechatInfo[1], '7.0.12') >= 0) {
        return true
      } else {
        return false
      }
    },
    wechatOpenTag () {
      return this.$root.wechatOpenTag || {}
    }
  },
  mounted () {
    if (this.$refs.launchButton) {
      this.buttonHeight = this.$refs.launchButton.scrollHeight
    }
  },
  methods: {
    launchAppReady () {
      console.log('launch app ready')
    },
    launchAppSuccess () {
      console.log('launch app success')
    },
    launchAppError (e) {
      console.error('launch app fail', e.detail)
      const { universalLink, schemaUrl, fallbackUrl } = this.$root
      appCall({
        universalLink,
        schemaUrl,
        fallbackUrl
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.launch {
  position: relative;
}
.launch-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  // background: rgba(102, 51, 153, 0.3);
  opacity: 0;
  pointer-events: auto;
}
</style>
