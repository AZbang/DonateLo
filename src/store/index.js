const axios = require('axios');
const MESSAGES = require('./messages.json');
const DONATELO_API = 'https://app-donatelo.herokuapp.com';
const helper = require('../helper');

module.exports = {
  state: {
    loading: false,
    isGroupExist: false,
    lang: 'ru',
    api: helper.parseLocationParams(),

    views: [],
    varibles: [],
    services: [],
    resources: {},

  },
  mutations: {
    setLoading(state, v) {
      state.loading = v;
    },
    setGroupExist(state, v) {
      state.isGroupExist = v;
    },
    addVaribles() {

    },
    addServices(state, services) {
      for(let key in services) {
        for(let input in services[key].inputs) {
          services[key].inputs[input].value = '';
        }
        state.services.push(services[key]);
      }
    },
    addResources() {

    },
    addViews() {

    }
  },
  actions: {
    showLog({state}, log) {
      Materialize.toast(log[state.lang], 2000);
    },
    async callApi({commit, dispatch}, methodApi) {
      commit('setLoading', true);
      try {
        let log = await dispatch(methodApi);
        log && dispatch.showLog(log);
      } catch(e) {
        console.error(e);
        dispatch.showLog(MESSAGES.METHOD_API_ERROR);
      }
      commit('isLoading', false);
      return log.isError;
    },
    async editToken({state, commit}) {
      let resp = await axios.post(DONATELO_API + '/create_group', {
        group_id: this.api.group_id,
        access_token: token
      });
      return resp.data.code === 'ok' ? MESSAGES.CORRECT_TOKEN : MESSAGES.NOT_CORRECT_TOKEN;
    }
    async getGroup({state, commit}) {
      let resp = await axios.post(DONATELO_API + '/get_group', {group_id: state.api.group_id});
      let data = resp.data.result;

      commit('addViews', data.views);
      commit('addResources', data.resources);
      commit('addServices', data.services);
      commit('addVaribles', data.enviroment);

      return MESSAGES.GROUP_LOADED;
    },
    async getGroupExist({state, commit}) {
      let resp = await axios.post(DONATELO_API + '/group_exist', {
        group_id: state.api.group_id
      });
      commit('setGroupExist', resp.data.result);
    },
  }
}
