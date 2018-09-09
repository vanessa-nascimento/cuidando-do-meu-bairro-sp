<template>
  <div class="canvas-wrapper">
    <canvas :id="canvasId" class="donut" :width="width" :height="height"/>
    <span class="darker-text canvas-text">{{ percentage }}%</span>
  </div>
</template>

<script>
import { drawDonut } from './chart-utils'
export default {
  name: 'labeled-doughnut',
  props: {
    percentage: Number,
    color: String
  },
  computed: {
    build () {
      let canvas = document.getElementById(this.canvasId)
      if (canvas) drawDonut(canvas, this.color, this.percentage)
      return true
    }
  },
  data () {
    return {
      width: 200,
      height: 200,
      canvasId: 'canvas' + this.color
    }
  }
}
</script>
