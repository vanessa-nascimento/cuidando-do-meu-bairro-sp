<template>
  <div class="spinner">
    <div class="spin-wheel" :style="`transform:translate(-50%,-50%) scale(${ scale })`">
      <div class="spin-wheel-part" v-for="i in angles" :key="i"
          :style="`-webkit-transform:rotate(${ i }deg) translate(0,-60px);transform:rotate(${ i }deg) translate(0,-60px)`"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner-anim',
  props: {
    scale: {
      type: [Number, String],
      default: 0.15
    }
  },
  data () {
    let angles = []
    for (let i = 0; i < 360; i += 30) angles.push(i)
    return {
      angles
    }
  }
}
</script>
