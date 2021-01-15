import { GET_BVN_INFORMATION } from '@/utils/mutation-types/user/individual'

export default {
  async [GET_BVN_INFORMATION]({ commit }, payload) {
    const { response } = await this.$axios.$post('', payload)
    commit(GET_BVN_INFORMATION, response)
  },
}
