<template>
  <div class="container">
    <div class="NavBlock" v-if="type != 'Default'"></div>
    <div :class="'NavBar ' + type">
      <div class="left">
        <slot name="left"></slot>
        <i
          class="iconfont icon-youbian-copy"
          v-if="ShowBack"
          style="font-size: 28px"
          @click="BackRouter"></i>
      </div>
      <div class="center" @click="ShowMask">
        <div class="Center_Label">
          <div class="Center_Info">
            <slot></slot>
            <span class="Handel_Title" v-if="ShowHandel">{{ HandelTitle }}</span>
          </div>
          <van-icon class="CenterIcon" name="arrow-down" v-if="ShowHandel" />
        </div>
      </div>
      <div class="right">
        <slot name="right" v-if="slotTest"></slot>
        <div class="Default_Right" v-else>
          <div class="Right_Info" v-if="getToken() && ShowHandelS">
            <div class="Info1">
              <i class="iconfont icon-yonghuming MyIcon"></i>
              <span class="Label">{{ UserInfo.username }}</span>
            </div>
            <div class="Info1">
              <i class="iconfont icon-qian MyIcon"></i>
              <span class="Label">{{ Balance.balance }}</span>
            </div>
          </div>
          <van-popover
            v-model:show="showPopover"
            :actions="actions"
            :offset="[5, 20]"
            placement="bottom-end"
            overlay>
            <template #reference>
              <div class="Right_Handel">
                <i class="iconfont icon-gengduo"></i>
              </div>
            </template>
            <template #default>
              <div class="Popover_container">
                <van-popover
                  v-model:show="showTheme"
                  :actions="Theme"
                  @select="ChangeTheme"
                  :offset="[0, 8]"
                  placement="left-start">
                  <template #reference>
                    <div class="Popover_Box-center">切换主题</div>
                  </template>
                </van-popover>
                <van-popover
                  v-model:show="showI18"
                  :actions="I18"
                  @select="ChangeI18"
                  :offset="[0, 8]"
                  placement="left-end">
                  <template #reference>
                    <div class="Popover_Box-center">切换语言</div>
                  </template>
                </van-popover>
              </div>
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <!-- 下滑进入 -->
    <transition name="van-slide-down">
      <div class="Nav_Mask" v-show="Mask" @click.stop="Mask = false">
        <div class="Mask_Handel_Box">
          <div
            class="Mask_Btn"
            v-for="(item, index) in HandelArr"
            :key="index"
            @click.stop="EmitHandel(item, index)">
            {{ item[HandelLabel] }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, reactive, onMounted, computed, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
import { StyleProvider } from '@varlet/ui'

import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'
import dark from '@/Theme/VarLetTheme/dark'
import VarLight from '@/Theme/VarLetTheme/light'

import ThemeStore from '@/Pinia/Theme'
import { storeToRefs } from 'pinia'
import useUser from '@/Pinia/User'

import { useI18n } from 'vue-i18n'

import { removeToken, getToken } from '@/utils/Auth'

// Pinia
const User = useUser()

const { Config, Balance, UserInfo } = storeToRefs<any>(User)

let { t, locale } = useI18n()
const slotTest = useSlots().right

interface DefaultProps {
  type: string
  ShowBack: boolean
  ShowHandel: boolean
  ShowHandelS: boolean
  HandelTitle: string
  HandelArr: any
  HandelLabel: string
}

const props = withDefaults(defineProps<DefaultProps>(), {
  type: 'Linear',
  ShowBack: false,
  ShowHandel: false,
  ShowHandelS: true,
  HandelTitle: '',
  HandelArr: [],
  HandelLabel: 'label',
})

let Props = ref<DefaultProps>(props)
const emit = defineEmits(['change'])

const router = useRouter()
const Mask = ref(false)
const showPopover = ref(false)
const showTheme = ref(false)
const showI18 = ref(false)
const actions = ref(null)

const BackRouter = () => {
  router.back()
}

const onSelect = (action) => {
  console.log(action)

  switch (action.text) {
    case 'Bet on details':
      router.push('/Bet')
      break
    case 'exit':
      removeToken()
      Toast('退出成功')
      router.push('/login')
      break
  }
}

const Theme = reactive([
  { text: '浅色', value: 'light' },
  { text: '深色', value: 'dark' },
  { text: '绿色', value: 'green' },
])
const ThemeStores = ThemeStore()
const { Theme: Themes } = storeToRefs(ThemeStores)

const ChangeTheme = (action) => {
  if (action.value == 'light') {
    window.document.documentElement.setAttribute('data-theme', 'light')
    StyleProvider(null)
    Themes.value = 'light'
    toggleTheme({
      scopeName: 'theme-default',
    })
  } else if (action.value == 'dark') {
    window.document.documentElement.setAttribute('data-theme', 'dark')
    StyleProvider(dark)
    Themes.value = 'dark'
    toggleTheme({
      scopeName: 'theme-dark',
    })
  }
}

const I18 = reactive([
  { text: '台湾', code: 'Taiwan' },
  {
    text: '英语',
    code: 'English',
  },
])

const ChangeI18 = (action) => {
  window.localStorage.setItem('I18', action.text)
  locale.value = action.text
}

// Mask
const ShowMask = () => {
  if (Props.value.ShowHandel) {
    Mask.value = !Mask.value
  }
}

// 点击MaskHandel事件
const EmitHandel = (item, index) => {
  emit('change', item, index)
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.NavBlock {
  width: 100%;
  height: 50px;
}
.NavBar {
  position: fixed;
  left: 50%;
  top: 0;
  // max-width: 12.5rem;
  // min-width: 350px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 999999;

  .left {
    flex: 0.2;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    font-size: 25px;
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
    .Center_Label {
      display: flex;
      align-items: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .Center_Info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .Handel_Title {
          font-size: 12px;
          @include font-color('H-text-color');
        }
      }
      .CenterIcon {
        margin-left: 10px;
      }
    }
  }
  .right {
    flex: 0.2;
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    font-size: 25px;
    .Default_Right {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 100%;
      .Right_Info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: 5px;
        padding: 5px 0;
        box-sizing: border-box;
        .Info1 {
          flex: 0.5;
          display: flex;
          align-items: center;
          height: 20px;

          .MyIcon {
            font-size: 14px;
          }
          .Label {
            max-width: 50px;
            font-size: 12px;
            margin-left: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
.Linear {
  @include background_color('NavBar-Back-color');
  @include font_color('NavBar-color');
}
.Default {
  position: relative !important;
  @include background_color('primary');
  @include font_color('NavBar-color');
}
.Popover_container {
  display: flex;
  flex-direction: column;
  .Popover_Box {
    display: flex;
    align-items: center;
    width: 200px;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    @include background_color('background_1color');
    @include font_color('text-color');
    font-size: 17px;
  }
  .Popover_Box-center {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    @include background_color('background_1color');
    @include font_color('text-color');
    font-size: 17px;
  }
}

.Min_Icon {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}

.Nav_Mask {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  box-sizing: border-box;
  .Mask_Handel_Box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    @include background-color('primary-color');
    padding: 20px;
    box-sizing: border-box;
    opacity: 0.9;
    .Mask_Btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc((100% - 10px) / 2);
      height: 40px;
      border-radius: 5px;
      box-sizing: border-box;
      @include Border(null, 1px, solid, 'F-text-color');
      @include font-color('H-text-color');
    }
  }
}
.Cell_Icon1 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -0.51rem;
  background-size: 2.81rem;
}
.Cell_Icon2 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -3.56rem;
  background-size: 2.81rem;
}
.Cell_Icon3 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -2.06rem;
  background-size: 2.81rem;
}
.Cell_Icon4 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -3rem;
  background-size: 2.81rem;
}
.Cell_Icon5 {
  background: url('@/static/Image/music.png') no-repeat;
  background-size: 95%;
}
.Cell_Icon6 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -1.54rem;
  background-size: 2.81rem;
}
.Cell_Icon7 {
  background: url('@/static/Image/icon-min.png') no-repeat -0.02rem -2.55rem;
  background-size: 2.81rem;
}
.Cell_Icon8 {
  background: url('@/static/Image/icon-min.png') no-repeat;
  background-size: 2.81rem;
}
</style>
