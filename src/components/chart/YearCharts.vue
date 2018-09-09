<template>
    <div v-if="yearInfo" class="row">
        <div class="col-lg-6 margin-bottom">
            <div class="inline-block donut-group not-mapped">
                <labeled-doughnut :color="assets.colorNM" :percentage="perNotMapped"/>
                <p class="abs-number">{rowsNotMapped}</p>
                <p>{{ $t('Not mapped') }}</p>
            </div>
            <div class="inline-block donut-group mapped">
                <labeled-doughnut :color="assets.colorM" :percentage="perMapped"/>
                <p class="abs-number">{rowsMapped}</p>
                <p>{{ $t('Mapped') }}</p>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="inline-block values-block">
                <div v-for="(v, i) of values" :key="i" class="value-block">
                    <div class="icon-block">
                        <img :src="assets[v.name]">
                        <span class="capitalize">{{ $t(v.name) }}</span>
                    </div>
                    <div class="bar-block">
                        <hor-bar :color="assets.colorNM"
                              extraclass="not-mapped"
                              :title="$t('Not mapped')"
                              :absolute="v.notMapped.abs"
                              :percentage="v.notMapped.per"/>
                        <hor-bar :color="assets.colorM"
                              extraclass="mapped"
                              :title="$t('Mapped')"
                              :absolute="v.mapped.abs"
                              :percentage="v.mapped.per"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { format } from '@/utils'
import HorBar from '@/components/chart/HorBar.vue'
import LabeledDoughnut from '@/components/chart/LabeledDoughnut.vue'
import assets from '@/assets'

export default {
  name: 'year-charts',
  components: {
    HorBar,
    LabeledDoughnut
  },
  data () {
    return {
      assets
    }
  },
  mounted () {
    this.getYearInfo({ params: { year: this.year } })
  },
  computed: {
    perMapped () {
      return Math.round(this.yearInfo.rows.mapped / this.yearInfo.rows.total * 100)
    },
    perNotMapped () {
      return 100 - this.perMapped
    },
    rowsNotMapped () {
      return format(this.yearInfo.rows.total - this.yearInfo.rows.mapped)
    },
    rowsMapped () {
      return format(this.yearInfo.rows.mapped)
    },
    values () {
      let values = []
      for (let info of this.yearInfo.values) {
        if (info.name !== 'orcado') {
          let notMapped = info.total - info.mapped
          values.push({
            name: info.name === 'atualizado' ? 'planejado' : info.name,
            mapped: {
              abs: `R$${format(info.mapped)}`,
              per: Math.round(info.mapped / info.total * 100)
            },
            notMapped: {
              abs: `R$${format(notMapped)}`,
              per: Math.round(notMapped / info.total * 100)
            }
          })
        }
      }
      return values
    },
    ...mapState({
      yearInfo: state => state.money.yearInfo,
      year: state => state.route.params.year
    })
  },
  methods: {
    // TODO: translate!
    t (a) { return a },
    ...mapActions([
      'getYearInfo'
    ])
  }
}
</script>
