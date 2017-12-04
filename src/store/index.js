const axios = require('axios');
const helper = require('../helper');
const Render = require('../render');

const DONATELO_API = 'https://app-donatelo.herokuapp.com';

const MESSAGES = require('./messages.json');
const WIDGETS = require('./widgets.json');

const SECTIONS = require('../vue/sections');
const VIEWS = require('../vue/views');

module.exports = {
  state: {
    render: null,

    lang: 'ru',
    api: helper.parseLocationParams(),

    loading: false,
    isGroupExist: false,
    isCoverEditable: false,

    currentSection: SECTIONS.WIDGETS,
    currentView: null,
    editableObject: null,

    widgets: WIDGETS,
    varibles: [],
    services: []
  },
  mutations: {
    initRender(state, id) {
      state.render = new Render(id);
    },
    setSection(state, view) {
      if(SECTIONS[view]) state.currentSection = SECTIONS[view];
    },
    setView(state, view) {
      if(VIEWS[view]) state.currentView = VIEWS[view];
    },
    setEditableObject(state, widget) {
      state.editableObject = widget;
    },
    setService(state, id) {
      if(state.services[id]) state.currentService = state.services[id];
    },

    setCover(state, src) {
      state.isCoverEditable = true;
      state.render.setCover(src);
    },

    setLoading(state, v) {
      state.loading = !!v;
    },
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
    setVaribles(state, vars) {
      state.varibles = vars;
      state.render.setVaribles(vars);
    }
  },
  actions: {
    addWidgets({dispatch}, data) {
      for(let key in data.views) {
        let view = data.views[key];
        dispatch('addWidget', {
          type: view.type, view, res: data.resources
        });
      }
    },
    addWidget({state, commit}, data) {
      let widget = state.render.addWidget(data.type, data.view || [], data.res || {});

      widget.view.on('mousedown', () => {
        commit('setEditableObject', widget);
        commit('setSection', 'WIDGET_EDITOR');
      });
      state.render.canvas.on('selection:cleared', () => {
        commit('setEditableObject', null);
        commit('setSection', 'WIDGETS');
      });
      widget.view.trigger('mousedown');
    },
    removeWidget({state, commit}, id) {
      commit('setSection', 'WIDGETS');
      state.render.removeWidget(id);
    },

    showLog({state}, log) {
      let ms = MESSAGES[log];
      if(ms.isError) this._vm.$message.error(ms[state.lang]);
      else this._vm.$message.success(ms[state.lang]);
    },
    async computedView({state, commit, dispatch}) {
      await dispatch('callApi', {
        method: 'getGroupExist',
        silent: true
      });
      if(+state.api.viewer_type > 2 && state.api.group_id != null) {
        if(state.isGroupExist) commit('setView', 'ADMIN');
        else commit('setView', 'REGISTER_TOKEN');
      } else commit('setView', 'GETTING_STARTED');
    },
    async callApi({commit, dispatch}, params) {
      !params.silent && commit('setLoading', true);

      try {
        var log = await dispatch(params.method, params);
        log && dispatch('showLog', log);
      }

      catch(e) {
        console.error(e);
        dispatch('showLog', 'METHOD_API_ERROR');
      }

      !params.silent && commit('setLoading', false);
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
      resp.data.code === 'ok' && commit('setView', 'ADMIN');
      return resp.data.code === 'ok' ? 'CREATED_GROUP' : 'NOT_CORRECT_TOKEN';
    },
    async editToken({state, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/edit_token', {
        group_id: state.api.group_id,
        access_token: token
      });
      return resp.data.code === 'ok' ? 'CORRECT_TOKEN' : 'NOT_CORRECT_TOKEN';
    },
    async getGroup({state, dispatch, commit}) {
      let resp = await axios.post(DONATELO_API + '/get_group', {group_id: state.api.group_id});
      let data = resp.data.result;

      commit('setServices', data.services);
      commit('setVaribles', data.enviroment);
      dispatch('addWidgets', data);

      if(data.resources.background) {
        commit('setCover', data.resources.background);
      }
      state.render.canvas.trigger('selection:cleared');

      return 'LOADED_GROUP';
    },
    async updateGroup({state, commit}) {
      let data = state.render.getJSON();

      data.resources.background = state.render.coverImage._element.src;
      let resp = await axios.post(DONATELO_API + '/update_cover', {
        group_id: state.api.group_id,
        ...data
      });

      return 'UPDATED_GROUP';
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
      return 'CREATED_SERVICE';
    },
  }
}
