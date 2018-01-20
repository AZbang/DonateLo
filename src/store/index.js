const MESSAGES = require('./messages.json');
const helper = require('../helper');

const db = require('./db');
const views = require('./views');
const render = require('./render');

module.exports = {
  modules: {
    db, views, render
  },
  state: {
    vkData: helper.parseLocationParams(),
    loading: false
  },
  getters: {
    lang(state) {
      return 'ru';
    },
    groupID(state) {
      return state.vkData.group_id;
    }
    appId(state) {
      return state.vkData.api_id;
    }
  },
  mutations: {
    setLoading(state, v) {
      state.loading = !!v;
    }
  },
  actions: {
    showLog({getters}, log) {
      let msg = MESSAGES[log];
      if(msg.isError) this._vm.$message.error(msg[getters.lang]);
      else this._vm.$message.success(msg[getters.lang]);
    }
  }
}
