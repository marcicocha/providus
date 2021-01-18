import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import individualModule from './modules/user/individual'
import corporateModule from './modules/user/corporate'
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      pageFlag: '',
      accountCategory: 'individual',
    }),
    getters,
    mutations,
    actions,
    modules: {
      individualModule,
      corporateModule,
    },
  })
}
export default createStore
