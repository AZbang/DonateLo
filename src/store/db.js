const axios = require('axios');
const DONATELO_API = 'https://app-donatelo.herokuapp.com';

/**
  DB Mudule Store
  Набор данных и методов, полученные с помощью api
**/

module.exports = {
  state: {
    isGroupExist: false,
    currentService: null,
    varibles: [],
    services: [],

    resources: {}
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

    async getGroupExist({rootState, commit}) {
      let resp = await axios.post(DONATELO_API + '/group_exist', {
        group_id: rootState.vkData.group_id
      });
      commit('setGroupExist', resp.data.result);
    },
    async createGroup({rootState, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/create_group', {
        group_id: rootState.vkData.group_id,
        access_token: token
      });
      resp.data.code === 'ok' && commit('setView', 'ADMIN');
      return resp.data.code === 'ok' ? 'CREATED_GROUP' : 'NOT_CORRECT_TOKEN';
    },
    async editToken({rootState, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/edit_token', {
        group_id: rootState.vkData.group_id,
        access_token: token
      });
      return resp.data.code === 'ok' ? 'CORRECT_TOKEN' : 'NOT_CORRECT_TOKEN';
    },
    async getGroup({rootState, dispatch, commit}) {
      let resp = await axios.post(DONATELO_API + '/get_group', {
        group_id: rootState.vkData.group_id
      });
      let data = resp.data.result;

      commit('setServices', data.services);
      commit('setVaribles', data.enviroment);
      commit('setVariblesRender', data.enviroment);

      dispatch('addWidgets', data);

      if(data.resources.background) {
        commit('setCover', data.resources.background);
      }

      return 'LOADED_GROUP';
    },
    async updateGroup({state, getters, rootState}) {
      let data = getters.renderViews;

      if(state.setCoverEditable)
        data.resources.background = getters.coverImage;

      let resp = await axios.post(DONATELO_API + '/update_cover', {
        group_id: rootState.vkData.group_id,
        ...data
      });

      return 'UPDATED_GROUP';
    },
    async loadVaribles({rootState, commit}) {
      let resp = await axios.post(DONATELO_API + '/get_enviroment', {
        group_id: rootState.vkData.group_id
      });
      commit('setVaribles', resp.data.result);
      commit('setVariblesRender', resp.data.result);
    },
    async updateService({rootState, state}, {id, form}) {
      let resp = await axios.post(DONATELO_API + '/update_service', {
        group_id: rootState.vkData.group_id,
        service_id: id,
        fields: form
      });
      return 'CREATED_SERVICE';
    }
  }
}
