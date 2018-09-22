<template>
  <div id="app">
    <main-menu/>
    <transition name="fade">
      <keep-alive>
        <router-view name="map"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainMenu from '@/components/MainMenu.vue'
import MsgShower from '@/components/MsgShower.vue'

export default {
  components: {
    MainMenu,
    MsgShower
  },
  computed: {
    ...mapState({
      year: state => state.route.params.year,
      code: state => state.route.params.code,
      page: state => state.route.params.page,
      username: state => state.route.params.username,
      pointInfo: state => state.money.pointInfo
    })
  },
  mounted () {
    this.loadPrevAuthData()
  },
  methods: {
    ...mapActions([
      'getYearPoints',
      'getYearInfo',
      'getPointInfo',
      'getEmpenhos',
      'getMoneyPage',
      'getPedidos',
      'getComments',
      'getUserInfo',
      'loadPrevAuthData'
    ])
  },
  watch: {
    year: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.getYearPoints({ params: { year: newValue } })
          this.getYearInfo({ params: { year: newValue } })
        }
      },
      immediate: true
    },
    code: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.getPointInfo({ params: { code: newValue } })
          this.getPedidos({ params: { key: newValue } })
          this.getComments({ params: { key: newValue } })
        }
      },
      immediate: true
    },
    username: {
      handler (newValue, oldValue) {
        if (newValue) this.getUserInfo({ params: { username: newValue } })
      },
      immediate: true
    },
    page: {
      handler (newValue, oldValue) {
        if (newValue) this.getMoneyPage({ params: { year: this.year, page: newValue } })
      },
      immediate: true
    },
    pointInfo (newValue, oldValue) {
      if (newValue) this.getEmpenhos({ params: { pointInfo: newValue } })
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
