<template>
  <div class="container">
    <h2>Perguntas feitas por {{ $t(grouping) }}</h2>

    <div class="control-buttons">
      <button v-for="g of Object.keys(groupConfig)" :key="g"
              class="btn btn-color-sec"
              :disabled="grouping === g"
              @click="getData(g)">
        {{ $t(g) }}
      </button>
    </div>
    <apexcharts v-if="esicStats.dates" height="400" type="line" :options="chartOptions" :series="series"></apexcharts>

    <h2>Perguntas feitas por órgão</h2>
    <table>
      <thead>
        <tr>
          <th>Órgão</th>
          <th>Número de Pedidos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row of esicStats.orgaos" :key="row.name">
          <td>{{ row.name }}</td>
          <td class="text-center">{{ row.count }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    apexcharts: VueApexCharts
  },
  data () {
    return {
      grouping: 'year',
      groupConfig: {
        'day': {
          tooltipFormat: 'dd MMM yyyy',
          datetimeFormatter: {
            year: 'dd MMM yyyy',
            month: 'dd MMM yyyy',
            day: 'dd MMM yyyy',
            hour: ''
          }
        },
        'month': {
          tooltipFormat: 'MMM yyyy',
          datetimeFormatter: {
            year: 'MMM yyyy',
            month: 'MMM yyyy',
            day: '',
            hour: ''
          }
        },
        'year': {
          tooltipFormat: 'yyyy',
          datetimeFormatter: {
            year: 'yyyy',
            month: '',
            day: '',
            hour: ''
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      esicStats: state => state.esic.stats
    }),
    series () {
      return [{
        name: 'perguntas',
        // data: this.esicStats.dates.map(x => x[1])
        data: this.esicStats.dates
      }]
    },
    chartOptions () {
      return {
        chart: {
          // id: 'vuechart-example'
          locales: [
            {
              'name': 'pt',
              'options': {
                'months': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                'shortMonths': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                'days': ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                'shortDays': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                'toolbar': {
                  'download': 'Baixar SVG',
                  'selection': 'Selecionar',
                  'selectionZoom': 'Selecionar Zoom',
                  'zoomIn': 'Aumentar',
                  'zoomOut': 'Diminuir',
                  'pan': 'Navegação',
                  'reset': 'Reiniciar Zoom'
                }
              }
            }
          ],
          defaultLocale: 'pt'
        },
        xaxis: {
          type: 'datetime',
          // tickAmount: 6,
          // labels: {
          //   formatter: function (val, timestamp) {
          //     return val
          //   }
          // }
          // categories: this.esicStats.dates.map(x => x[0]),
          labels: {
            datetimeFormatter: this.groupConfig[this.grouping].datetimeFormatter
          },
          tooltip: {
            enabled: false
          }
        },
        markers: {
          size: 0,
          style: 'hollow'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        tooltip: {
          x: {
            format: this.groupConfig[this.grouping].tooltipFormat
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getEsicStats'
    ]),
    getData (grouping) {
      if (grouping) this.grouping = grouping
      this.getEsicStats({ params: { grouping: this.grouping } })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
