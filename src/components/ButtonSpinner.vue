<template>
  <button>
    <spinner-anim v-if="condition"/>
    <slot v-else/>
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
