export default {
  'SHOW_CON_IT': (state) => {
    state.show = true
  },
  'HIDE_CON_IT': (state) => {
    state.show = false
  },
  'SHOW_SHARE': (state) => {
    state.shareShow = true
  },
  'HIDE_SHARE': (state) => {
    state.shareShow = false
  },
  'LAWYER_DATA': (state, para) => {
    state.lawyerData = para
  }
}
