
/**
  DB Mudule Store
  Набор данных и методов, полученные с помощью api
**/

module.exports = {
  state: {
    isGroupExist: false,
    currentService: null,

    views: [],
    varibles: [],
    services: [],
    resources: {},
  },
  mutations: {
    setGroupExist(state, v) {
      state.isGroupExist = v;
    },
    setServices(state, services) {
      for(let key in services) {
        for(let input in services[key].inputs) {
          services[key].id = key;
          services[key].inputs[input].value = '';
        }
        state.services.push(services[key]);
      }
    },
    setService(state, id) {
      if(state.services[id]) state.currentService = state.services[id];
    },
    setVaribles(state, vars) {
      state.varibles = vars;
    }
  },
  actions: {
    async callApi({commit, dispatch}, params) {
      !params.silent && commit('setLoading', true);

      try {
        var log = await dispatch(params.method, params);
        log && dispatch('showLog', log);
      } catch(e) {
        console.log(e);
        dispatch('showLog', 'METHOD_API_ERROR');
      }

      !params.silent && commit('setLoading', false);
    },

    async getGroupExist({rootState, getters, commit}) {
      let data = api.getGroupExist(getters.groupID);
      commit('setGroupExist', data);
    },
    async createGroup({rootState, getters, commit}, {token}) {
      let data = api.createGroup(getters.groupID, token);
      return data.status;
    },
    async editToken({rootState, getters, commit}, {token}) {
      api.editToken(getters.groupID, token);
    },
    async getGroup({rootState, getters, dispatch, commit}) {
      let data = api.getGroup(rgetters.groupID);

      commit('setServices', data.services);
      commit('setVaribles', data.enviroment);
      commit('setResources', data.resources);
      commit('setWidgets', data.views);
    },
    async updateGroup({state, getters, rootState}) {
      let data = getters.renderViews;

      if(rootState.render.isCoverEditable)
        data.resources.background = getters.coverImage;

      let data = api.updateGroup(getters.groupID, data);
    },
    async loadVaribles({rootState, commit}) {
      let data = api.loadVaribles(rootState.vkData.group_id);
      commit('setVaribles', data);
    },
    async updateService({rootState, state}, {id, form}) {
      let data = api.updateService(rootState.vkData.group_id, id, form);
    }
  }
}
