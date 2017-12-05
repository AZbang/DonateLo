/**
  Views Mudule Store
  Набор переключателей компонентов
**/

// Набор Vue компонентов
const SECTIONS = require('../vue/sections');
const VIEWS = require('../vue/views');

module.exports = {
  state: {
    currentSection: SECTIONS.WIDGETS,
    currentView: null
  },
  mutations: {
    setSection(state, view) {
      if(SECTIONS[view]) state.currentSection = SECTIONS[view];
    },
    setView(state, view) {
      if(VIEWS[view]) state.currentView = VIEWS[view];
    }
  },
  actions: {
    async computedView({rootState, commit, dispatch}) {
      await dispatch('callApi', {
        method: 'getGroupExist',
        silent: true
      });
      if(+rootState.vkData.viewer_type > 2 && rootState.vkData.group_id != null) {
        if(rootState.db.isGroupExist) commit('setView', 'ADMIN');
        else commit('setView', 'REGISTER_TOKEN');
      } else commit('setView', 'GETTING_STARTED');
    }
  }
}
