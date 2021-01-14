import { GET_BVN_INFORMATION } from '@/utils/mutation-types/user/individual'

export default {
  [GET_BVN_INFORMATION](state, payload) {
    state.bvnDetails = payload
  },
}
