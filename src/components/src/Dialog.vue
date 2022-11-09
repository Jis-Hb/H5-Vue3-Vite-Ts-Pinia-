<template>
  <transition name="van-fade">
    <div class="Dialog_Container" v-show="Show" @click.self="CloseEmpy">
      <transition name="Dialog">
        <div class="Dialog" v-show="Show">
          <div class="Dialog_Header" v-if="ShowTitle">
            <div class="Title">{{ Title }}</div>
          </div>
          <div class="Dialog_Content" v-html="Content" v-if="Content != ''"></div>
          <div class="Dialog_Content" v-else>
            <slot />
          </div>
          <div class="Dialog_Handel">
            <div class="Cancel" @click="Cancel" v-if="ShowCancel">取消</div>
            <div class="Confirm" @click="Confirm">确定</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

type DefaultProps = {
  Show: boolean
  Title: string
  Content: string
  ShowTitle: boolean
  ShowCancel: boolean
  PConfirm: any
  PCancel: any
}

const props = withDefaults(defineProps<DefaultProps>(), {
  Show: false,
  Title: '',
  Content: '',
  ShowCancel: true,
  PConfirm: null,
  PCancel: null,
  ShowTitle: true,
})

let { Show } = toRefs(props)
const emit = defineEmits(['update:Show', 'Confirm', 'Cancel'])

// 点击遮罩层关闭
const CloseEmpy = () => {
  // console.log(!Show)
  // emit('update:Show', !Show)
}

const Confirm = (e) => {
  emit('Confirm', e)
  props.PConfirm && props.PConfirm()
}

const Cancel = (e) => {
  emit('update:Show', !Show)
  emit('Cancel', e)
  props.PCancel && props.PCancel()
}
const DialogClick = (e) => {}
</script>

<style scoped lang="scss">
.Dialog-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.Dialog-enter-active {
  transition: opacity 0.2s, transform 0.3s;
}

.Dialog-enter-to {
  opacity: 1;
  transform: scale(1);
}

.Dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.Dialog-leave-active {
  transition: opacity 0.2s, transform 0.3s;
}

.Dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.Dialog_Container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.4);
  .Dialog {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 100px;
    max-width: 90%;
    min-height: 100px;
    max-height: 60%;
    @include background_color('background_1color');
    border-radius: 5px;
    overflow: hidden;
    .Dialog_Header {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      max-height: 100px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 15px;
      font-weight: bold;

      @include background_color('primary-color');
      @include font_color('F-text-color');
      .Title {
        text-align: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        margin-left: 7px;
      }
    }
    .Dialog_Content {
      flex: 1;
      word-break: break-all;
      margin-bottom: 50px;
      padding: 10px;
      overflow: auto;
      height: calc(100% - 100px);
      font-size: 14px;
    }
    .Dialog_Handel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      @include Border(top, 1px, solid, 'background_color');
      .Confirm {
        @include font_color('primary-color');
      }
      .Cancel {
        @include font_color('H-text-color');
      }
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 16px;
        @include Border(right, 1px, solid, 'background_color');

        &:label-child() {
          border: none;
        }
      }
    }
  }
}
</style>
