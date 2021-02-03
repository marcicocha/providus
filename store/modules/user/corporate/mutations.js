import {
  POST_COMPANY_DETAILS,
  POST_REPRESENTATIVE_DETAILS,
} from '@/utils/mutation-types/user/corporate'
export default {
  [POST_COMPANY_DETAILS](state, payload) {
    state.bvnDetails = payload
  },
  [POST_REPRESENTATIVE_DETAILS](state, payload) {
    state.bvnDetails = payload
  },
}
