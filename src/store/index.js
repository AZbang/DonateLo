const axios = require('axios');
const helper = require('../helper');
const Render = require('../render');
const MESSAGES = require('./messages.json');

const DONATELO_API = 'https://app-donatelo.herokuapp.com';
const CONTROLS = {
  WIDGETS: 'widgets',
  SERVICES: 'services',
  WIDGET_EDITOR: 'widgetEditor',
  SERVICE_EDITOR: 'serviceEditor',
  SETTINGS: 'settings'
};
const VIEWS = {
  GETTING_STARTED: 'GettingStarted',
  REGISTER_TOKEN: 'Register',
  ADMIN: 'Admin'
}

module.exports = {
  state: {
    render: new Render(),

    loading: false,
    isGroupExist: false,
    lang: 'ru',
    api: helper.parseLocationParams(),

    currentControl: 'WIDGETS',
    currentView: 'GETTING_STARTED',

    views: [],
    varibles: [],
    services: [],
    resources: {}
  },
  mutations: {
    setControl(state, view) {
      if(CONTROLS[view]) state.currentControl = CONTROLS[view];
    },
    setView(state, view) {
      if(VIEWS[view]) state.currentView = VIEWS[view];
    },
    setLoading(state, v) {
      state.loading = !!v;
    },
    setGroupExist(state, v) {
      state.isGroupExist = v;
    },
    setViews(state, views) {

    },
    setResources(state, res) {

    },
    setServices(state, services) {
      for(let key in services) {
        for(let input in services[key].inputs) {
          services[key].inputs[input].value = '';
        }
        state.services.push(services[key]);
      }
    },
    setVaribles(state, vars) {

    }
  },
  actions: {
    showLog({state}, log) {
      this._vm.$message.error(log[state.lang]);
    },
    async computedView({state, commit, dispatch}) {
      await dispatch('callApi', 'getGroupExist');
      console.log(+state.api.viewer_type, state.api.group_id, state.isGroupExist);

      if(+state.api.viewer_type > 2 && state.api.group_id != null) {
        if(state.isGroupExist) commit('setView', 'ADMIN');
        else commit('setView', 'REGISTER_TOKEN');
      } else commit('setView', 'GETTING_STARTED');
    },
    async callApi({commit, dispatch}, methodApi, params={}) {
      !params.isSilent && commit('setLoading', true);
      try {
        var log = await dispatch(methodApi, params);
        log && dispatch('showLog', log);
      } catch(e) {
        dispatch('showLog', MESSAGES.METHOD_API_ERROR);
        console.error(e);
      }
      !params.isSilent && commit('setLoading', false);
      return log;
    },

    async getGroupExist({state, commit}) {
      let resp = await axios.post(DONATELO_API + '/group_exist', {
        group_id: state.api.group_id
      });
      commit('setGroupExist', resp.data.result);
    },
    async createGroup({state, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/create_group', {
        group_id: state.api.group_id,
        access_token: token
      });
      console.log(token)
      resp.data.code === 'ok' && commit('setView', 'ADMIN');
      return resp.data.code === 'ok' ? MESSAGES.CREATED_GROUP : MESSAGES.NOT_CORRECT_TOKEN;
    },
    async editToken({state, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/editToken', {
        group_id: this.api.group_id,
        access_token: token
      });
      return resp.data.code === 'ok' ? MESSAGES.CORRECT_TOKEN : MESSAGES.NOT_CORRECT_TOKEN;
    },
    async getGroup({state, commit}) {
      let resp = await axios.post(DONATELO_API + '/get_group', {group_id: state.api.group_id});
      let data = resp.data.result;

      commit('setViews', data.views);
      commit('setResources', data.resources);
      commit('setServices', data.services);
      commit('setVaribles', data.enviroment);

      return MESSAGES.GROUP_LOADED;
    },
    async updateGroup({state, commit}) {
      let data = this.renderer.getJSON();
      data.resources.background = this.renderer.coverImage._element.src;
      let resp = await axios.post(DONATELO_API + '/update_cover', {
        group_id: state.api.group_id,
        ...data
      });

      return MESSAGES.UPDATED_GROUP;
    },
    async loadVaribles({commit, state}) {
      let resp = await axios.post(DONATELO_API + '/get_enviroment', {
        group_id: state.api.group_id
      });
      commit('setVaribles', resp.data.result);
    },
    async updateService({commit, state}, {id, form}) {
      let resp = await axios.post(DONATELO_API + '/update_service', {
        group_id: state.api.group_id,
        service_id: id,
        fields: form
      });
      return MESSAGES.UPDATED_SERVICE;
    },
  }
}
