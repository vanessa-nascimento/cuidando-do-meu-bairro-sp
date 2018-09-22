<template>
  <button class="btn btn-color-sec relative" :disabled="condition">
    <spinner-anim v-if="condition"/>
    <span :class="{ transparent: condition }">
      <slot/>
    </span>
  </button>
</template>

<script>
import SpinnerAnim from '@/components/SpinnerAnim'
export default {
  name: 'button-spinner',
  components: {
    SpinnerAnim
  },
  props: {
    condition: Boolean
  }
}
</script>
