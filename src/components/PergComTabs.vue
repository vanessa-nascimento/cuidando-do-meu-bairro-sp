<template>
  <div>
    <div class="container-fluid light-dark-bg">
      <div class="row tabs-row">
        <div class="container">
          <ul class="list-bare">
            <div class="row">
              <li :class="{ tab: true, 'is-active': tab.component === currTabComponent }"
                v-for="(tab, i) in tabs" :key="i"
                @click="currTabComponent = tab.component">
                <span class="block-decorator"/>
                <div class="number">{{ counts[tab.component] }}</div>
                <div>{{ $t(tab.title) }}</div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <div class="container tabContent">
      <transition name="fade" mode="out-in">
        <component :is="currTabComponent"/>
      </transition>
    </div>
  </div>
</template>

<script>
import PerguntasTab from '@/components/perguntas/PerguntasTab.vue'
import CommentsTab from '@/components/comments/CommentsTab.vue'
import { mapState } from 'vuex'

export default {
  name: 'perg-com-tabs',
  components: {
    PerguntasTab,
    CommentsTab
  },
  data () {
    let tabs = [
      { title: 'questions', component: 'perguntas-tab', countArray: 'pedidos' },
      { title: 'comments', component: 'comments-tab', countArray: 'comments' }
    ]
    return {
      tabs,
      currTabComponent: tabs[0].component
    }
  },
  computed: {
    counts () {
      let counts = {}
      for (let tab of this.tabs) {
        counts[tab.component] = this[tab.countArray] ? this[tab.countArray].length : 0
      }
      return counts
    },
    ...mapState({
      pedidos: state => state.esic.pedidos,
      comments: state => state.comments.commentsPage.comments
    })
  }
}
</script>
