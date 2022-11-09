<template>
  <var-style-provider :style-vars="styleVars" style="width: 100%; height: 100%">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName">
        <component :is="Component" :key="route.path" mode="out-in"> </component>
      </transition>
    </router-view>
  </var-style-provider>
</template>
<script setup lang="ts">
import app from '@/main'

import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
// 切换主题
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'

// 主题
import dark from '@/Theme/VarLetTheme/dark'
import VarLight from '@/Theme/VarLetTheme/light'

import { StyleProvider } from '@varlet/ui'

import ThemeStore from '@/Pinia/Theme'
import useUser from '@/Pinia/User'
import { storeToRefs } from 'pinia'

// I18
import { useI18n } from 'vue-i18n'

// token
import { getToken } from '@/utils/Auth'

let { t, locale } = useI18n()

const ThemeStores = ThemeStore()
const User = useUser()
const { Theme: Themes } = storeToRefs(ThemeStores)
const { Balance } = storeToRefs(User)

const router = useRouter()
const route = useRoute()

const styleVars = ref(null)
const successTheme = {}

// 改变Var组件主题颜色
const subscribe = ThemeStores.$subscribe(
  (mutation, state) => {
    if (state.Theme == 'light') {
      window.document.documentElement.setAttribute('data-theme', 'light')
      StyleProvider(null)
      styleVars.value = VarLight
    } else if (state.Theme == 'dark') {
      window.document.documentElement.setAttribute('data-theme', 'dark')
      StyleProvider(dark)
      styleVars.value = null
    }
  },
  { detached: false },
)

// 判断本地储存的主题变量
const ChangeTheme = () => {
  if (Themes.value != 'light') {
    window.document.documentElement.setAttribute('data-theme', 'dark')
    StyleProvider(dark)
    styleVars.value = null
    toggleTheme({
      scopeName: 'theme-dark',
    })
  } else {
    window.document.documentElement.setAttribute('data-theme', 'light')
    StyleProvider(null)
    styleVars.value = VarLight
    toggleTheme({
      scopeName: 'theme-default',
    })
  }
}
// 每次进来调用一次
ChangeTheme()

// 监听手机自带暗黑模式
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

mediaQuery.onchange = (e) => {
  console.log('mediaQuery', e)

  MatchesTheme(e)
}
const MatchesTheme = (mediaQuery: any) => {
  if (mediaQuery.matches) {
    Themes.value = 'dark'
    ChangeTheme()
  } else {
    Themes.value = 'light'
    ChangeTheme()
  }
}

// 当本地没有选择主题时监听暗黑模式
!Themes.value && MatchesTheme(mediaQuery)

const I18Val = window.localStorage.getItem('I18')
if (I18Val != null) {
  locale.value = I18Val
}

const transitionName = ref('')

watch(
  () => router.currentRoute.value.meta,
  (newValue: any, oldValue: any) => {
    console.log('newValue', newValue)

    if (oldValue && oldValue.tree && newValue && newValue.tree) {
      if (oldValue.tree > newValue.tree) {
        transitionName.value = 'return'
      } else {
        transitionName.value = 'slide'
      }
    } else {
      if (newValue && newValue.tree && !(oldValue && oldValue.tree)) {
        transitionName.value = 'slide'
      } else if (!(newValue && newValue.tree) && oldValue && oldValue.tree) {
        transitionName.value = 'return'
      } else {
        transitionName.value = 'brother'
      }
    }
  },
  { immediate: true },
)

onMounted(() => {})
</script>

<style lang="scss">
body,
html,
#app {
  @include font_color('text-color');
  @include background_color('background_color');
  font-size: 12px;
}
.brother-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.brother-enter-active {
  transition: opacity 0.2s, transform 0.3s;
}

.brother-enter-to {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  transform: scale(1);
}

.brother-leave-from {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  transform: scale(1);
}

.brother-leave-active {
  transition: opacity 0.2s, transform 0.3s;
}

.brother-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-active {
  transition: transform 0.3s ease;
}

.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  display: none;
}

.slide-leave-to {
  display: block;
}

.return-enter-from {
  transform: translateX(-100%);
}

.return-enter-active {
  transition: transform 0.3s ease;
}
.return-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.return-leave-from {
  display: none;
}

.return-leave-to {
  display: block;
}
</style>
