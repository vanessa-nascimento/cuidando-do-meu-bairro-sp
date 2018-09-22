// Assets are converted on build to base64 strings, so in Browser they can
// be used as variables, reducing request number.
export var assets = {
  logo: require('@/assets/logo.svg'),
  lupa: require('@/assets/lupa.svg'),
  planejado: require('@/assets/map/planejado.svg'),
  empenhado: require('@/assets/map/empenhado.svg'),
  liquidado: require('@/assets/map/liquidado.svg'),
  aPla: require('@/assets/activities/planejado.svg'),
  aEmp: require('@/assets/activities/empenhado.svg'),
  aLiq: require('@/assets/activities/liquidado.svg'),
  aCom: require('@/assets/activities/comments.svg'),
  aComTop: require('@/assets/activities/comments-top.svg'),
  aComExtra: require('@/assets/activities/comments-extra.svg'),
  aPer: require('@/assets/activities/pergunta.svg'),
  // "isvg" is used to avoid default svg loader
  // eslint-disable-next-line
  moedas: require('svg-inline-loader!@/assets/moedas.isvg'),
  patM: require('@/assets/patM.png'),
  patNM: require('@/assets/patNM.png')
}

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$assets', {
    get () { return assets }
  })
}
