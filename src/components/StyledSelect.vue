<template>
  <div class="styled-select">
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
// import {onClickedOutside} from '../utils/helpers'

export default {
  name: 'styled-select',
  props: {
    options: Array,
    // Used to bind the displayed selected value
    // If not passed, use a variable internal to this component (internalSelectedValue)
    selectedValue: [String, Number]
  },
  data () {
    return {
      open: false,
      internalSelectedValue: null
    }
  },
  computed: {
    displayedValue () {
      let key = this.selectedValue ? this.selectedValue : this.internalSelectedValue
      for (let option of this.options) {
        if (option.key === key) return option.value
      }
      return '...'
    }
  },
  methods: {
    toggleList () {
      this.open = !this.open
      // TODO: migrar do riot
      // if (this.open) {
      //   onClickedOutside(this.root, () => {
      //     this.open = false
      //     this.update()
      //   })
      // } else {
      //   onClickedOutside()
      // }
    },
    optionSelected (event) {
      this.internalSelectedValue = event.target.dataset.key
      this.open = false
      this.$emit('change', this.internalSelectedValue)
    }
  }
}
</script>
