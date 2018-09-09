<template>
  <div class="outer-bar">
    <div class="inner-bar"
        @mouseenter="isShowingTooltip = true"
        @mouseleave="isShowingTooltip = false"
        :style="style"/>
    <div :class="['tooltip', extraclass]" role="tooltip" v-if="isShowingTooltip">
      <div class="darker-text number">
        {{ absolute }}
      </div>
      <div>
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hor-bar',
  props: {
    percentage: Number,
    color: String,
    'extraclass': String,
    absolute: [String, Number],
    title: String
  },
  computed: {
    style () {
      return { width: this.percentage + '%', 'background-image': `url(${this.color})` }
    }
  },
  data () {
    return {
      isShowingTooltip: false
    }
  }
}
</script>
