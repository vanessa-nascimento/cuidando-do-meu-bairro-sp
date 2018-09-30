<template>
  <div class="styled-select" v-click-outside="close">
    <div class="inner"
         @click="toggleList"
         :aria-expanded="open"
         role="listbox">
        {{ displayedValue }}
        <span class="caret"/>
    </div>
    <ul v-if="open" class="list-bare">
        <li v-for="option of options"
            :key="option.key"
            :data-key="option.key"
            @click="optionSelected"
            role="option">
          {{ option.value }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'styled-select',
  props: {
    options: Array,
    // Used to bind the displayed selected value
    // If not passed, use a variable internal to this component (internalSelectedValue)
    value: [String, Number]
  },
  data () {
    return {
      open: false,
      internalSelectedValue: null
    }
  },
  computed: {
    displayedValue () {
      let key = this.value ? this.value : this.internalSelectedValue
      for (let option of this.options) {
        if (option.key === key) return option.value
      }
      return '...'
    }
  },
  methods: {
    toggleList () {
      this.open = !this.open
    },
    close () {
      this.open = false
    },
    optionSelected (event) {
      this.internalSelectedValue = event.target.dataset.key
      this.open = false
      this.$emit('input', this.internalSelectedValue)
    }
  }
}
</script>
