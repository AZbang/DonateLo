const helper = require('../helper');

module.exports = {
  state: {
    loading: true,
    sectionName: 'WIDGETS',
    viewName: null,
    vkData: helper.parseLocationParams(),

    services: [],
    activeService: null,
  },
  modules: {
    render: require('./render/index')
  },
  getters: require('./getters'),
  mutations: require('./mutations'),
  actions: require('./actions')
}
