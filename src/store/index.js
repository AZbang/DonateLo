const helper = require('../helper');
const Render = require('../render');

module.exports = {
  state: {
    loading: true,
    sectionName: 'WIDGET',
    viewName: 'GETTING_STARTED',
    vkData: helper.parseLocationParams(),

    services: [],
    resources: {},
    varibles: [],
    activeService: null,

    isCoverExist: false,
    isCoverEditable: false, 
    render: new Render(),
    editableObject: null
  },
  getters: require('./getters'),
  mutations: require('./mutations'),
  actions: require('./actions')
}
