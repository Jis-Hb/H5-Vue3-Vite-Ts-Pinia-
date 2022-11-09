<template>
  <div id="loading" v-if="visible">
    <div class="load-sixty-one">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <br />
    <span class="tips"> Loading...</span>
  </div>
</template>

<script>
import { defineComponent, ref, onUnmounted } from 'vue'
export default defineComponent({
  name: 'Loading',
  setup() {
    // 控制组件的状态
    let visible = ref(false)

    // 显示组件
    let showLoading = () => {
      visible.value = true
      let app = document.getElementById('app')
    }
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false
      let app = document.getElementById('app')
    }
    onUnmounted(() => {
      hideLoading()
    })
    return { visible, showLoading, hideLoading, onUnmounted }
  },
})
</script>
<style scoped lang="scss">
#loading {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  @include background-color('filter_BackColor');
  backdrop-filter: blur(6px);

  .tips {
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -40%);
    @include font-color('primary-color');
    font-size: 16px;
  }

  .load-sixty-one,
  .load-sixty-one > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .load-sixty-one > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  .load-sixty-one {
    width: 40px;
    height: 32px;
    display: block;
    font-size: 0;
    @include font-color('primary-color');

    margin: 75px auto;
  }
  .load-sixty-one > div {
    width: 2px;
    height: 32px;
    margin: 2px;
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    -webkit-animation: line-scale-pulse-out-rapid 0.9s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
    -moz-animation: line-scale-pulse-out-rapid 0.9s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
    -o-animation: line-scale-pulse-out-rapid 0.9s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
    animation: line-scale-pulse-out-rapid 0.9s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
  }
  .load-sixty-one > div:nth-child(3) {
    -webkit-animation-delay: -0.9s;
    -moz-animation-delay: -0.9s;
    -o-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .load-sixty-one > div:nth-child(2),
  .load-sixty-one > div:nth-child(4) {
    -webkit-animation-delay: -0.65s;
    -moz-animation-delay: -0.65s;
    -o-animation-delay: -0.65s;
    animation-delay: -0.65s;
  }
  .load-sixty-one > div:nth-child(1),
  .load-sixty-one > div:nth-child(5) {
    -webkit-animation-delay: -0.4s;
    -moz-animation-delay: -0.4s;
    -o-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .load-sixty-one {
    width: 90px;
    height: 40px;
  }
  .load-sixty-one > div {
    width: 8px;
    height: 40px;
    margin: 4px;
    margin-top: 0;
    margin-bottom: 0;
  }
  @-webkit-keyframes line-scale-pulse-out-rapid {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -webkit-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
  @-moz-keyframes line-scale-pulse-out-rapid {
    0% {
      -moz-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -moz-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -moz-transform: scaley(1);
      transform: scaley(1);
    }
  }
  @-o-keyframes line-scale-pulse-out-rapid {
    0% {
      -o-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -o-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -o-transform: scaley(1);
      transform: scaley(1);
    }
  }
  @keyframes line-scale-pulse-out-rapid {
    0% {
      -webkit-transform: scaley(1);
      -moz-transform: scaley(1);
      -o-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -webkit-transform: scaley(0.3);
      -moz-transform: scaley(0.3);
      -o-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -webkit-transform: scaley(1);
      -moz-transform: scaley(1);
      -o-transform: scaley(1);
      transform: scaley(1);
    }
  }
}
</style>
