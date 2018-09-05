<template>
<div id="app">
  <div id="nav">
    <router-link :to="{ name: 'home', params: { year: 2018 }}">Home</router-link> |
    <router-link :to="{ name: 'despesa', params: { year: 2018, code: 1 }}">Despesa</router-link> |
    <router-link :to="{ name: 'about'}">About</router-link>
  </div>
  <keep-alive>
    <router-view name="map"></router-view>
  </keep-alive>
  <router-view/>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      year: state => state.route.params.year,
      code: state => state.route.params.code,
      pointInfo: state => state.money.pointInfo
    })
  },
  methods: {
    ...mapActions([
      'getYearPoints',
      'getPointInfo',
      'getEmpenhos'
    ])
  },
  watch: {
    year (newValue, oldValue) {
      this.getYearPoints({ params: { year: newValue } })
    },
    code (newValue, oldValue) {
      this.getPointInfo({ params: { code: newValue } })
    },
    pointInfo (newValue, oldValue) {
      this.getEmpenhos({ params: { pointInfo: newValue } })
    }
  }
}
</script>

<style lang="scss">
</style>
