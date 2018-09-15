import Vue from 'vue'
import Vuex from 'vuex'

import money from '@/stores/money'
import esic from '@/stores/esic'
import empenhos from '@/stores/empenhos'
import comments from '@/stores/comments'
import auth from '@/stores/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    money,
    esic,
    empenhos,
    comments,
    auth
  }
})