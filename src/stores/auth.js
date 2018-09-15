import Vapi from 'vuex-rest-api'
import { baseUrls } from '@/configs'
import { http } from '@/utils'

// Authentication
export default new Vapi({
  axios: http,
  baseURL: baseUrls.auth,
  state: {
    username: null,
    userInfo: null
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
}).get({
  action: 'getUserInfo',
  property: 'userInfo',
  path: ({ username }) => `/users/${username}`,
  onSuccess: (state, payload, axios, { params }) => {
    state.userInfo = payload.data
  }
}).getStore()
