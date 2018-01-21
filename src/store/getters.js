const VIEWS = require('../vue/views');
const SECTIONS = require('../vue/sections');

module.exports = {
  lang(state) {
    return 'ru';
  },
  groupID(state) {
    return state.vkData.group_id;
  },
  appId(state) {
    return state.vkData.api_id;
  },

  view(state) {
    return VIEWS[state.viewName];
  },
  section(state) {
    return SECTIONS[state.sectionName];
  }
}
