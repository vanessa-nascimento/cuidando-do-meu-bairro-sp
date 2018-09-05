<template>
  <div class="home">
    <h1>Dados do orçamento da cidade de São Paulo em tempo real</h1>
    <p>Aqui explicamos qual é a fonte dos dados públicos que utilizamos, a porcentagem dos gastos que conseguimos colocar no mapa da cidade e informações sobre os gastos que não estão no mapa, mas também podem ser explorados.</p>
    {{ years }}
    {{ yearInfo }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
  },
  mounted () {
    this.getYears()
    this.getYearInfo({ params: { year: 2018 } })
  },
  computed: mapState({
    years: state => state.years,
    yearInfo: state => state.yearInfo
  }),
  methods: {
    ...mapActions([
      'getYears',
      'getYearInfo'
    ])
  }
}
</script>
