<template>
  <div class="Jis-TabBar">
    <van-tabbar v-model="active" route safe-area-inset-bottom placeholder>
      <van-tabbar-item replace icon="home-o" to="/">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        主页
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const active = ref(0)
</script>

<style scoped lang="scss">
:deep(.van-badge--top-right) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -5px;
  border-radius: 50%;
  font-size: 10px;
  border: none;
  font-weight: bold;
  z-index: 999;
}
:deep(.van-tabbar--fixed) {
  position: fixed;
  left: 50%;
  bottom: 0;
  // max-width: 12.5rem;
  // min-width: 350px;
  transform: translateX(-50%);
}
</style>
