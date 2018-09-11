import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

// enhance the original axios adapter with throttle and cache enhancer
const http = axios.create({
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
})

const httpNoHeaders = axios.create({
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
})

Vue.use(Vuex)

const baseUrls = {
  subscriptions: 'https://devcolab.each.usp.br/cochicho',
  money: 'https://devcolab.each.usp.br/gastos_abertos',
  auth: 'https://devcolab.each.usp.br/viralata',
  comments: 'https://devcolab.each.usp.br/tagarela',
  esic: 'https://devcolab.each.usp.br/esiclivre',
  empenhos: 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v2.1.0/'
}

// Authentication
const auth = new Vapi({
  axios: http,
  baseURL: baseUrls.auth,
  state: {
    username: null
  }
// }).get({
//   action: 'login',
//   property: 'username',
//   path: ({ year }) => `/minlist/${year}?state=1&capcor=1`,
//   onSuccess: (state, payload, axios, { params }) => {
//     state.yearPoints = {
//       type: 'FeatureCollection',
//       features: payload.data.FeatureColletion
//     }
//   }
}).getStore()

// Gastos Abertos
const money = new Vapi({
  axios: http,
  baseURL: baseUrls.money,
  state: {
    yearPoints: {},
    years: [],
    yearInfo: null,
    pointInfo: {},
    updates: [],
    page: {}
  }
}).get({
  action: 'getYearPoints',
  property: 'yearPoints',
  path: ({ year }) => `/minlist/${year}?state=1&capcor=1`,
  onSuccess: (state, payload, axios, { params }) => {
    state.yearPoints = {
      type: 'FeatureCollection',
      features: payload.data.FeatureColletion
    }
  }
}).get({
  action: 'getYears',
  property: 'years',
  path: `/info`,
  onSuccess: (state, payload, axios) => {
    state.years = payload.data.data.years.reverse()
  }
}).get({
  action: 'getYearInfo',
  property: 'yearInfo',
  path: ({ year }) => `/info/${year}`,
  onSuccess: (state, payload, axios) => {
    state.yearInfo = payload.data.data
  }
}).get({
  action: 'getPointInfo',
  property: 'pointInfo',
  path: ({ code }) => `/list?code=${code}`,
  onSuccess: (state, payload, axios) => {
    state.pointInfo = payload.data.data[0]
  }
}).get({
  action: 'getMoneyPage',
  property: 'page',
  path: ({ year, page }) => `/list?year=${year}&page=${page}&per_page_num=25`,
  onSuccess: (state, payload, axios) => {
    payload.data.totalRows = payload.headers['x-total-count']
    state.page = payload.data
  }
}).get({
  action: 'getMoneyUpdates',
  property: 'updates',
  path: `/updates?per_page_num=20&has_key=state`,
  onSuccess: (state, payload, axios) => {
    // Substitute strings for Dates
    for (let row of payload.data.data) {
      row.date = new Date(row.date)
    }
    state.updates = payload.data.data
  }
}).getStore()

// EsicLivre
const esic = new Vapi({
  axios: http,
  baseURL: baseUrls.esic,
  state: {
    orgaos: [],
    updates: []
  }
}).get({
  action: 'getOrgaos',
  property: 'orgaos',
  path: `/orgaos`,
  onSuccess: (state, payload, axios) => {
    state.years = payload.data.orgaos.sort().map((x) => { return { key: x, value: x } })
  }
}).get({
  action: 'getPedidosUpdates',
  property: 'updates',
  path: `/messages`,
  onSuccess: (state, payload, axios) => {
    // Substitute strings for Dates
    let pedidos = []
    for (let row of payload.data.messages) {
      row.date = new Date(row.date)
      if (row.keywords[0] !== 'recuperado') {
        pedidos.push({
          date: row.date,
          code: row.keywords[0],
          pedido: row
        })
      }
    }
    state.updates = pedidos
  }
}).getStore()

// Comments
const comments = new Vapi({
  axios: http,
  baseURL: baseUrls.comments,
  state: {
    updates: []
  }
}).get({
  action: 'getCommentsUpdates',
  property: 'updates',
  path: `/comment`,
  onSuccess: (state, payload, axios) => {
    // Substitute strings for Dates
    let updates = payload.data.comments
    for (let row of updates) {
      row.created = new Date(row.created)
      row.modified = new Date(row.modified)
    }

    let threads = []
    // TODO pegar infos sobre os pontos para mostrar os assuntos
    // falta só arrumar o triggerChange
    // Group comments by thread
    var threadsMap = updates.reduce((_threads, curr) => {
      if (_threads[curr.thread_name]) {
        _threads[curr.thread_name].push(curr)
      } else {
        let comments = [curr]
        _threads[curr.thread_name] = comments
        threads.push({
          date: curr.created,
          thread_name: curr.thread_name,
          comments
        })
      }
      return _threads
    }, {})

    // eslint-disable-next-line
    let codes = Object.keys(threadsMap)
    // this.triggerChange('multiPontinfo', {key: 'a', codes})

    state.updates = threads
  }
}).getStore()

// Empenhos Prefeitura
const empenhos = new Vapi({
  axios: httpNoHeaders,
  baseURL: baseUrls.empenhos,
  state: {
    empenhos: []
  }
}).get({
  headers: {
    Authorization: 'Bearer 198f959a5f39a1c441c7c863423264'
  },
  action: 'getEmpenhos',
  property: 'empenhos',
  path ({ pointInfo }) {
    let filters = {
      anoEmpenho: 'cd_exercicio',
      codOrgao: 'cd_orgao',
      codModalidade: 'cd_modalidade',
      codFuncao: 'cd_funcao',
      codSubFuncao: 'cd_subfuncao',
      codProjetoAtividade: 'projetoatividade',
      codPrograma: 'cd_programa',
      codElemento: 'cd_elemento',
      codFonteRecurso: 'cd_fonte',
      codCategoria: 'categoria_despesa',
      codGrupo: 'grupo_despesa'
    }
    return 'consultaEmpenhos?mesEmpenho=12&' +
      Object.keys(filters).map(k => k + '=' + pointInfo[filters[k]]).join('&')
  },
  onSuccess: (state, payload, axios) => {
    state.empenhos = payload.data.lstEmpenhos
  }
}).getStore()

export default new Vuex.Store({
  modules: {
    money,
    esic,
    empenhos,
    comments,
    auth
  }
})
