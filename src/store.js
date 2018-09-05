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

// Gastos Abertos
const money = new Vapi({
  axios: http,
  baseURL: baseUrls.money,
  state: {
    yearPoints: {},
    years: [],
    yearInfo: {},
    pointInfo: {}
  }
}).get({
  action: 'getYearPoints',
  property: 'yearPoints',
  path: ({ year }) => `/minlist/${year}?state=1&capcor=1`,
  onSuccess: (state, payload, axios) => {
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
    state.yearInfo = payload.data
  }
}).get({
  action: 'getPointInfo',
  property: 'pointInfo',
  path: ({ code }) => `/list?code=${code}`,
  onSuccess: (state, payload, axios) => {
    state.pointInfo = payload.data.data[0]
  }
}).getStore()

// EsicLivre
const esic = new Vapi({
  axios: http,
  baseURL: baseUrls.esic,
  state: {
    orgaos: []
  }
}).get({
  action: 'getOrgaos',
  property: 'orgaos',
  path: `/orgaos`,
  onSuccess: (state, payload, axios) => {
    state.years = payload.data.orgaos.sort().map((x) => { return { key: x, value: x } })
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
    console.log(pointInfo)
    window.p = pointInfo
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
    empenhos
  }
})
