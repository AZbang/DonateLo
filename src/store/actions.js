const MESSAGES = require('../lang/messages');
const api = require('../api/donatelo');

module.exports = {
  showMessage({state, getters}, log) {
    let msg = MESSAGES[log];
    if(msg.isError) this._vm.$message.error(msg[getters.lang]);
    else this._vm.$message.success(msg[getters.lang]);
  }

  async loadGroup({commit, getters, dispatch}) {
    let data = await api.getViews(getters.groupID);
    let varibles = await api.getVaribles(getters.groupID);
    let services = await api.getServices(getters.groupID);

    commit('setResources', data.resources);
    commit('setViews', data.views);
    commit('setVaribles', varibles);
    commit('setServices', services);

    dispatch('showMessage', 'GROUP_LOADED');
  }

  async computedView({state, commit, getters}) {
    let isExist = await api.isGroupExist(getters.groupID);

    // Проверяем ялвяется ли пользователь администратором
    if(state.vkData.viewer_type > 2 && getters.groupID != null) {
      // Если группа уже зарегистрирована, то отправляем в админ панель, иначе к регистрации
      if(isExist) commit('setView', 'ADMIN');
      else commit('setView', 'REGISTER_TOKEN');
    } else commit('setView', 'GETTING_STARTED');
  }

  async updateViews({state, getters, dispatch}, data) {
    await api.updateViews(getters.groupID, data);
    dispatch('showMessage', 'VIEWS_UPDATED');
  }

  async updateService({state, getters}, {id, fields}) {
    await api.updateService(getters.groupID, id, fields);
    dispatch('showMessage', 'SERVICE_UPDATED');
  }

  async editToken(getters, dispatch}, token) {
    await api.editToken(getters.groupID, token);
    dispatch('showMessage', 'TOKEN_UPDATED');
  },

  async loadVaribles({state, getters}) {
    let services = await api.getVaribles(getters.groupID);
    commit('setVaribles', varibles);
  }

  async loadServices({state, getters}) {
    let services = await api.getServices(getters.groupID);
    commit('setServices', services);
  }
}
