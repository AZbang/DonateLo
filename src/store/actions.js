const MESSAGES = require('../lang/messages');
const api = require('../api/donatelo');

module.exports = {
  showMessage({state, getters}, log) {
    console.log(log);
    let msg = MESSAGES[log];
    if(msg.isError) this._vm.$message.error(msg[getters.lang]);
    else this._vm.$message.success(msg[getters.lang]);
  },

  async createGroup({dispatch, getters}, token) {
    commit('setLoading', true);
    await api.createGroup(getters.groupID, token);
    commit('setView', 'ADMIN');
    commit('setLoading', false);
    dispatch('showMessage', 'GROUP_CREATED');
  },

  async computedView({state, commit, getters}) {
    commit('setLoading', true);
    let isExist = await api.isGroupExist(getters.groupID);

    // Проверяем ялвяется ли пользователь администратором
    if(state.vkData.viewer_type > 2 && getters.groupID != null) {
      // Если группа уже зарегистрирована, то отправляем в админ панель, иначе к регистрации
      if(isExist) commit('setView', 'ADMIN');
      else commit('setView', 'REGISTER_TOKEN');
    } else commit('setView', 'GETTING_STARTED');
    commit('setLoading', false);
  },

  async loadGroup({state, commit, getters, dispatch}) {
    commit('setLoading', true);

    let data = await api.getViews(getters.groupID);
    let varibles = await api.getVaribles(getters.groupID);
    let services = await api.getServices(getters.groupID);

    await dispatch('loadResources', Object.assign(data.resources, {
      WHITE: 'assets/widgets/white_pixel.png',
      IMAGE: 'assets/widgets/image.png'
    }));

    commit('addWidgets', data.views);
    commit('setVaribles', varibles);
    commit('setServices', services);
    commit('setLoading', false);

    dispatch('showMessage', 'GROUP_LOADED');

    console.log("STATE", state);

  },

  async updateViews({state, getters, dispatch}, data) {
    commit('setLoading', true);

    await api.updateViews(getters.groupID, {
      views: state.widgets, resources: getters.resourcesData
    });
    commit('setLoading', false);
    dispatch('showMessage', 'VIEWS_UPDATED');
  },

  async updateService({state, getters}, {id, fields}) {
    commit('setLoading', true);
    await api.updateService(getters.groupID, id, fields);
    commit('setLoading', false);
    dispatch('showMessage', 'SERVICE_UPDATED');
  },

  async editToken({getters, dispatch}, token) {
    commit('setLoading', true);
    await api.editToken(getters.groupID, token);
    commit('setLoading', false);
    dispatch('showMessage', 'TOKEN_UPDATED');
  },

  async loadVaribles({commit, getters}) {
    let vars = await api.getVaribles(getters.groupID);
    commit('setVaribles', vars);
  }
}
