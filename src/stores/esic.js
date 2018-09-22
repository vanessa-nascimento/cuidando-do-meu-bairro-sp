import Vapi from 'vuex-rest-api'
import { baseUrls } from '@/configs'
import { http } from '@/utils'

// EsicLivre
export default new Vapi({
  axios: http,
  baseURL: baseUrls.esic,
  state: {
    orgaos: [],
    updates: [],
    pedidos: [],
    prepedidos: []
  }
}).get({
  action: 'getPedidos',
  path: ({ key }) => `/keywords/${key}`,
  onSuccess (state, payload, axios) {
    function pedidosCompare (a, b) {
      let aDate = 0
      let bDate = 0
      if (a.history.length) aDate = a.history[0].date
      else aDate = a.request_date
      if (b.history.length) bDate = b.history[0].date
      else bDate = b.request_date
      return aDate < bDate ? 1 : -1
    }
    // Substitute strings for Dates
    for (let pedido of payload.data.pedidos) {
      if (pedido.request_date) pedido.request_date = new Date(pedido.request_date)
      for (let message of pedido.history) {
        message.date = new Date(message.date)
      }
    }
    state.pedidos = payload.data.pedidos.sort(pedidosCompare)
    state.prepedidos = payload.data.prepedidos || []
  }
}).get({
  action: 'getOrgaos',
  property: 'orgaos',
  path: `/orgaos`,
  onSuccess: (state, payload, axios) => {
    state.orgaos = payload.data.orgaos.sort().map((x) => { return { key: x, value: x } })
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
