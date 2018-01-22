const helper = require('../helper');

module.exports = {
  state: {
    loading: true,
    sectionName: 'WIDGET',
    viewName: 'GETTING_STARTED',
    vkData: helper.parseLocationParams(),

    services: [],
    activeService: null,
  },
  plugins: [require('./render')],
  getters: require('./getters'),
  mutations: require('./mutations'),
  actions: require('./actions')
}
