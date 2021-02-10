import {
  POST_COMPANY_DETAILS,
  POST_REPRESENTATIVE_DETAILS,
  GET_RC_INFORMATION,
} from '@/utils/mutation-types/user/corporate'
export default {
  [POST_COMPANY_DETAILS](state, payload) {
    state.companyDetails = payload
  },
  [POST_REPRESENTATIVE_DETAILS](state, payload) {
    state.representativeDetails = payload
  },
  [GET_RC_INFORMATION](state, payload) {
    state.rcNo = payload
  },
}
