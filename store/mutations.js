import { SET_ACCOUNT_CATEGORY } from '@/utils/mutation-types'
export default {
  [SET_ACCOUNT_CATEGORY](state, payload) {
    state.accountCategory = payload
  },
}
