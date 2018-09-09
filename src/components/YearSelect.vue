<template>
  <styled-select :options="options" :selected-value="year" @change="selected"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StyledSelect from '@/components/StyledSelect.vue'
export default {
  name: 'year-select',
  components: {
    StyledSelect
  },
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
