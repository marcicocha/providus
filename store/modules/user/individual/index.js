import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = () => ({
  bvnDetails: {},
  personalInfoObj: {},
  contactInfoObj: {},
  kinObjInfo: {},
  accountNumber: '',
})
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
