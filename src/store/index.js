module.exports = {
  state: {
    loading: true,
    sectionName: 'WIDGET',
    viewName: 'GETTING_STARTED',
    vkData: helper.parseLocationParams(),

    views: [],
    services: [],
    resources: {},
    varibles: [],
    activeService: null,
  },
  getters: require('./getters'),
  mutations: require('./mutations'),
  actions: require('./actions')
}
