import {
  GET_BVN_INFORMATION,
  POST_PERSONAL_INFORMATION,
  POST_CONTACT_INFORMATION,
  POST_KINS_INFORMATION,
  SAVE_ACCOUNT_NUMBER,
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
  [POST_KINS_INFORMATION]({ commit }, payload) {
    commit(POST_KINS_INFORMATION, payload)
  },
  [SAVE_ACCOUNT_NUMBER]({ commit }, payload) {
    commit(SAVE_ACCOUNT_NUMBER, payload)
  },
}
