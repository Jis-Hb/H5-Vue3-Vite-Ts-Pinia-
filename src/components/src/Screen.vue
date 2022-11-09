<template>
  <div class="Screen_Container">
    <div class="Text" v-if="Text">{{ Text }}</div>
    <div class="Screen_Box">
      <div
        :class="Current == index ? 'ItemS' : 'Item'"
        v-show="Type.indexOf(index) != -1"
        v-for="(item, index) in Arr"
        :key="index"
        @click="ChangeScreen(item.value, index)">
        {{ item.label }}
      </div>
    </div>
    <div class="Label" v-if="Label">{{ Label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Time from '@/utils/Time'

type DefaultProps = {
  Type: number[]
  Label: string
  Text: string
  DefaultCurrent: number
}

const props = withDefaults(defineProps<DefaultProps>(), {
  Type: null,
  Label: '',
  Text: '',
  DefaultCurrent: 0,
})

let Props = ref<DefaultProps>(props).value
const emit = defineEmits(['change'])

console.log(Props.Type)
console.log(Props.Label)

const Current = ref(0)

const Arr = reactive([
  {
    label: 'Today',
    value: 0,
  },
  {
    label: 'Yesterday',
    value: 1,
  },
  {
    label: '7 days',
    value: 2,
  },
  {
    label: '15 days',
    value: 3,
  },
  {
    label: '30 days',
    value: 4,
  },
])

const ChangeScreen = (item, index) => {
  let TimeArr = []
  console.log(item);
  
  switch (item) {
    case 0:
      TimeArr[0] = Time.getDay(0)
      TimeArr[1] = Time.getDay(0)
      break
    case 1:
      TimeArr[0] = Time.getDay(-1)
      TimeArr[1] = Time.getDay(-1)
      break
    case 2:
      TimeArr[0] = Time.getDay(0)
      TimeArr[1] = Time.getDay(-7)

      break
    case 3:
      TimeArr[0] = Time.getDay(0)
      TimeArr[1] = Time.getDay(-15)

      break
    case 4:
      TimeArr[0] = Time.getDay(0)
      TimeArr[1] = Time.getDay(-30)

      break
  }
  Current.value = index
  emit('change', TimeArr)
}

onMounted(() => {
  Current.value = Props.DefaultCurrent

  ChangeScreen(Current.value, Current.value)
})
</script>

<style scoped lang="scss">
.Screen_Container {
  @include background_color('background_1color');
  padding-top: 10px;
  .Screen_Box {
    display: flex;
    gap: 10px;
    padding: 0 20px;
    .Item,
    .ItemS {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      border-radius: 5px;
      font-size: 10px;
    }
    .Item {
      @include background_color('background_2color');
      @include font_color('F-text-color');
    }
    .ItemS {
      @include background_color('primary-color');
      @include font_color('F-text-color');
    }
  }
  .Label,
  .Text {
    font-size: 15px;
    padding: 0 20px 10px;
    @include font_color('background_2color');
  }
  .Label {
    margin-top: 10px;
  }
}
</style>
