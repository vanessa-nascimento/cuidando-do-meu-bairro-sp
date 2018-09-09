<template>
  <div>
    <h3 class="subtitle">{ t('Recent Activities') }</h3>

    <ul class="top-bar list-bare">
        <li v-for="(activity, i) of activities" :key="i">

            <div class="activity-date">
                {{ formatDate(activity.date) }}
                <img class="icon" :src="getIcon(activity)">
            </div><!--
                avoid space
        --><div class="activity-content">

                <!-- If is a thread update -->
                <div v-if="activity.comments">
                    { t('comments_about', {'_num': activity.comments.length}) }
                    <!--
                    <a v-if="multiPontinfo"
                        class="clickable"
                        @click="routeDespesa(activity.thread_name)">
                        {{ multiPontinfo[activity.thread_name]['ds_projeto_atividade'] }}
                    </a>
                    -->
                </div>

                <!-- If is a pedido update -->
                <div v-if="activity.pedido"
                    class="clickable"
                    @click="routeDespesa(activity.code)">
                    Pergunta: {{ activity.pedido.justification }}
                </div>

                <!-- If is a money update -->
                <div v-if="activity.data">
                    <div v-if="activity.event === 'modified'">
                        <a class="clickable"
                            @click="routeDespesa(activity.code)">
                            {{activity.description}}
                        </a>
                        mudou de
                        {{activity.data.state[0]}}
                        para
                        <b>{{activity.data.state[1]}}</b>
                    </div>
                    <div v-if="activity.event === 'created'">
                        Novo:
                        <a class="clickable"
                            @click="routeDespesa(activity.code)">
                            {{activity.description}}
                        </a>
                    </div>
                </div>

            </div>

        </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '@/utils'
import assets from '@/assets'

export default {
  name: 'recent-activities',
  components: {
  },
  mounted () {
    this.getMoneyUpdates()
    this.getPedidosUpdates()
    this.getCommentsUpdates()
  },
  computed: {
    activities () {
      return this.pedidos.concat(this.money).concat(this.threads).sort(this.dateCompare)
    },
    ...mapState({
      money: state => state.money.updates,
      pedidos: state => state.esic.updates,
      threads: state => state.comments.updates
    })
  },
  methods: {
    formatDate,
    dateCompare (a, b) { return a.date < b.date ? 1 : -1 },
    getIcon (item) {
      if (item.data) {
        // Is a money update
        let currState = item.event === 'modified' ? item.data.state[1] : item.data.state
        if (currState === 'empenhado') return assets.aEmp
        if (currState === 'liquidado') return assets.aLiq
        if (currState === 'orcado' || currState === 'atualizado') return assets.aPla
      } else if (item.comments) {
        // Is a comments update
        if (item.comments.length > 4) return assets.aComExtra
        else return assets.aCom
      } else if (item.pedido) {
        // Is a pergunta update
        return assets.aPer
      }
      return ''
    },
    routeDespesa (code) {
      this.$router.push({ name: 'despesa', params: { code } })
    },
    ...mapActions([
      'getMoneyUpdates',
      'getPedidosUpdates',
      'getCommentsUpdates'
    ])
  }
}
</script>
