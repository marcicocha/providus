import {
  GET_BVN_INFORMATION,
  POST_PERSONAL_INFORMATION,
  POST_CONTACT_INFORMATION,
} from '@/utils/mutation-types/user/individual'

export default {
  [GET_BVN_INFORMATION]({ commit }, payload) {
    commit(GET_BVN_INFORMATION, payload)
  },
  [POST_PERSONAL_INFORMATION]({ commit }, payload) {
    commit(POST_PERSONAL_INFORMATION, payload)
  },
  [POST_CONTACT_INFORMATION]({ commit }, payload) {
    commit(POST_CONTACT_INFORMATION, payload)
  },
}
