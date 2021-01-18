import { SET_ACCOUNT_CATEGORY } from '@/utils/mutation-types'
export default {
  [SET_ACCOUNT_CATEGORY]({ commit }, payload) {
    commit(SET_ACCOUNT_CATEGORY, payload)
  },
}
