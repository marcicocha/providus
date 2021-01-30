import {
  GET_BVN_INFORMATION,
  POST_PERSONAL_INFORMATION,
  POST_CONTACT_INFORMATION,
  POST_KINS_INFORMATION,
  SAVE_ACCOUNT_NUMBER,
} from '@/utils/mutation-types/user/individual'

export default {
  [GET_BVN_INFORMATION](state, payload) {
    state.bvnDetails = payload
  },
  [POST_PERSONAL_INFORMATION](state, payload) {
    state.personalInfoObj = payload
  },
  [POST_CONTACT_INFORMATION](state, payload) {
    state.contactInfoObj = payload
  },
  [POST_KINS_INFORMATION](state, payload) {
    state.kinObjInfo = payload
  },
  [SAVE_ACCOUNT_NUMBER](state, payload) {
    state.accountNumber = payload
  },
}
