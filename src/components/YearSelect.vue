<template>
  <styled-select class="year-selector separated-caret" :options="options" :value="parseInt(year)" @input="selected"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'year-select',
  computed: {
    options () {
      return this.years.map((x) => { return { key: x, value: x } })
    },
    ...mapState({
      years: state => state.money.years,
      year: state => state.route.params.year
    })
  },
  mounted () {
    this.getYears()
  },
  methods: {
    selected (year) {
      this.$router.push({ name: 'home', params: { year } })
    },
    ...mapActions([
      'getYears'
    ])
  }
}
</script>
