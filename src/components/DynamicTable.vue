<template>
  <div>
    <div class="table-responsive">
        <table class="table table-hover">
            <tr>
                <th class="text-left relative">
                    {{ $t('description') }}
                    <span class="table-header-mark"/>
                </th>
                <th>{{ $t('planejado') }}</th>
                <th>{{ $t('empenhado') }}</th>
                <th>{{ $t('liquidado') }}</th>
                <th class="text-left">{{ $t('body') }}</th>
            </tr>
            <tr v-for="(row, i) in pageData.data" :key="i">
                <td class="main-cell">
                  <router-link :to="{ name: 'despesa', params: { code: row.code } }">
                    {{ row.ds_projeto_atividade }}</router-link>
                </td>
                <td class="text-right">
                    {{ formatCur(calcPlanejado(row.sld_orcado_ano, row.vl_atualizado)) }}
                </td>
                <td class="text-right">
                    {{ formatCur(row.vl_empenhadoliquido) }}
                </td>
                <td class="text-right">
                    {{ formatCur(row.vl_liquidado) }}
                </td>
                <td>{{ row.ds_orgao }}</td>
            </tr>
        </table>
    </div>
    <div class="text-right table-controls">
        <router-link :to="{params: { page: 0 }}"
            v-if="currPage !== 0">
            {{ $t('first') }}
        </router-link>
        <router-link v-for="(num, i) in pageIndexes" :key="i"
            :to="{params: { page: num }}"
            :class="{disabled: num == currPage }"
            role="button">
            {{ num }}
        </router-link>
        <router-link
            :to="{params: { page: lastPage }}"
            v-if="currPage !== lastPage">
            {{ $t('last') }}
        </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatCur } from '@/utils'
export default {
  name: 'dynamic-table',
  data () {
    return {
      // defaultPage: 1,
      per_page_num: 25
    }
  },
  mounted () {
    this.getMoneyPage({ params: { year: this.year, page: this.currPage } })
  },
  computed: {
    lastPage () {
      // Calculate last page
      return Math.floor(this.pageData.totalRows / this.per_page_num)
    },
    pageIndexes () {
      // Page index numbers
      let numShownPages = 7
      return Array(...Array(numShownPages))
        .map((_, i) => i + this.currPage - Math.floor(numShownPages / 2))
        .filter(i => i >= 0 && i <= this.lastPage)
    },
    ...mapState({
      pageData: state => state.money.page,
      year: state => state.route.params.year,
      currPage: state => state.route.params.page
    })
  },
  methods: {
    formatCur,
    calcPlanejado (orcado, atualizado) {
      return atualizado || orcado
    },
    ...mapActions([
      'getMoneyPage'
    ])
  }
}
</script>
