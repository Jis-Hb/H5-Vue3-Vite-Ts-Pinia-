<template>
  <van-empty :image="Image" :description="description" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const Image = new URL('../../static/Image/Empy.png', import.meta.url).href

console.log(Image)

interface DefaultProps {
  ImageSize: string
  description: string
}

const props = withDefaults(defineProps<DefaultProps>(), {
  description: '暂无数据',
})
</script>

<style scoped lang="scss">
:deep(.van-empty__image) {
  width: 100%;
  height: 100%;
}
</style>
