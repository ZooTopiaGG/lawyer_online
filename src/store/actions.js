export default {
  'SHOW_CON_IT': ({ commit }) => {
    commit('SHOW_CON_IT')
  },
  'HIDE_CON_IT': ({ commit }) => {
    commit('HIDE_CON_IT')
  },
  'SHOW_SHARE': ({ commit }) => {
    commit('SHOW_SHARE')
  },
  'HIDE_SHARE': ({ commit }) => {
    commit('HIDE_SHARE')
  },
  'LAWYER_DATA': ({ commit }, para) => {
    commit('LAWYER_DATA', para)
  }
}
