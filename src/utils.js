import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

// enhance the original axios adapter with throttle and cache enhancer
export const http = axios.create({
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
})

export const httpNoHeaders = axios.create({
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
})

// Convert number to locale string
export function format (number, opts) {
  // TODO: usar locale
  return number.toLocaleString('pt-br', opts)
  // return number.toLocaleString(router.getParam('lang'), opts)
}

export function formatDate (date, opts = { month: '2-digit', day: '2-digit' }) {
  // TODO: usar locale
  return date.toLocaleString('pt-br', opts)
  // return date.toLocaleString(router.getParam('lang'), opts)
}

// Convert number to locale string with 2 decimal digits
export function formatCur (number) {
  return format(number, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
