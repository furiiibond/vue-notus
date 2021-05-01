<template>
  <button @click="toast"></button>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default defineComponent({
  name: 'Toast',
  setup () {
    const toast = () => {
      createToast('Wow, easy')
    }
    return { toast }
  }
})
</script>