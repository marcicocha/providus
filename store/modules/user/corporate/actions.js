import {
  POST_COMPANY_DETAILS,
  POST_REPRESENTATIVE_DETAILS,
} from '@/utils/mutation-types/user/corporate'
export default {
  [POST_COMPANY_DETAILS]({ commit }, payload) {
    commit(POST_COMPANY_DETAILS, payload)
  },
  [POST_REPRESENTATIVE_DETAILS]({ commit }, payload) {
    commit(POST_REPRESENTATIVE_DETAILS, payload)
  },
}
