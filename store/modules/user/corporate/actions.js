import {
  POST_COMPANY_DETAILS,
  POST_REPRESENTATIVE_DETAILS,
  GET_RC_INFORMATION,
} from '@/utils/mutation-types/user/corporate'
export default {
  [POST_COMPANY_DETAILS]({ commit }, payload) {
    commit(POST_COMPANY_DETAILS, payload)
  },
  [POST_REPRESENTATIVE_DETAILS]({ commit }, payload) {
    commit(POST_REPRESENTATIVE_DETAILS, payload)
  },
  [GET_RC_INFORMATION]({ commit }, payload) {
    commit(GET_RC_INFORMATION, payload)
  },
}
