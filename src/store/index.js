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
const WIDGETS = [
  {
    type: "text",
    label: "Текст",
    icon: "el-icon-tickets"
  },
  {
    type: "linear",
    label: "Линейный бар",
    icon: "el-icon-menu"
  },
  {
    type: "radial",
    label: "Радиальный бар",
    icon: "el-icon-remove"
  },
  {
    type: "image",
    label: "Картинка",
    icon: "el-icon-picture"
  },
  {
    type: "stickers",
    label: "Стикеры",
    disable: true,
    icon: "el-icon-star-on"
  },
  {
    type: "stickers",
    label: "Стикеры",
    disable: true,
    icon: "el-icon-star-on"
  },
  {
    type: "stickers",
    label: "Стикеры",
    disable: true,
    icon: "el-icon-star-on"
  },
  {
    type: "stickers",
    label: "Стикеры",
    disable: true,
    icon: "el-icon-star-on"
  }
];

module.exports = {
  state: {
    render: new Render(),

    lang: 'ru',
    api: helper.parseLocationParams(),

    loading: false,
    isGroupExist: false,
    isCoverEditable: false,

    currentControl: 'widgets',
    currentView: 'GettingStarted',
    editableObject: null,

    widgets: WIDGETS,
    varibles: [],
    services: []
  },
  mutations: {
    setControl(state, view) {
      if(CONTROLS[view]) state.currentControl = CONTROLS[view];
    },
    setView(state, view) {
      if(VIEWS[view]) state.currentView = VIEWS[view];
    },
    setEditableObject(state, widget) {
      state.editableObject = widget;
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
          services[key].inputs[input].value = '';
        }
        state.services.push(services[key]);
      }
    },
    setVaribles(state, vars) {
      state.varibles = vars;
      state.renderer.setVaribles(vars);
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
        commit('setControl', 'WIDGET_EDITOR');
      });
      widget.view.on('selection:cleared', () => {
        commit('setEditableObject', null);
        commit('setControl', 'WIDGET_EDITOR');
      });
      widget.view.trigger('mousedown');
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
      console.log(params);

      !params.silent && commit('setLoading', true);
      console.log(params);

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
      console.log(token);
      let resp = await axios.post(DONATELO_API + '/create_group', {
        group_id: state.api.group_id,
        access_token: token
      });
      resp.data.code === 'ok' && commit('setView', 'ADMIN');
      return resp.data.code === 'ok' ? 'CREATED_GROUP' : 'NOT_CORRECT_TOKEN';
    },
    async editToken({state, commit}, {token}) {
      let resp = await axios.post(DONATELO_API + '/editToken', {
        group_id: this.api.group_id,
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
        dispatch('setCover', data.resources.background);
      }
      state.render.canvas.trigger('selection:cleared');

      return 'GROUP_LOADED';
    },
    async updateGroup({state, commit}) {
      let data = this.renderer.getJSON();

      data.resources.background = this.renderer.coverImage._element.src;
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
      return 'UPDATED_SERVICE';
    },
  }
}
