<template>
  <div id="app">
    <main-menu/>
    <div id="nav">
      <router-link :to="{ name: 'home', params: { year: 2018 }}">Home</router-link> |
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
import MainMenu from '@/components/MainMenu.vue'

export default {
  components: {
    MainMenu
  },
  computed: {
    ...mapState({
      year: state => state.route.params.year,
      code: state => state.route.params.code,
      page: state => state.route.params.page,
      pointInfo: state => state.money.pointInfo
    })
  },
  methods: {
    ...mapActions([
      'getYearPoints',
      'getPointInfo',
      'getEmpenhos',
      'getMoneyPage'
    ])
  },
  watch: {
    year (newValue, oldValue) {
      this.getYearPoints({ params: { year: newValue } })
    },
    code (newValue, oldValue) {
      if (newValue) this.getPointInfo({ params: { code: newValue } })
    },
    pointInfo (newValue, oldValue) {
      if (newValue) this.getEmpenhos({ params: { pointInfo: newValue } })
    },
    page (newValue, oldValue) {
      console.log(newValue)
      if (newValue) this.getMoneyPage({ params: { year: this.year, page: newValue } })
    }
  }
}
</script>

<style lang="scss">
</style>
