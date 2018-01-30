const helper = require('../helper');

module.exports = {
  strict: process.env.NODE_ENV !== 'production',

  state: {
    loading: true,
    section: 'WIDGETS',
    view: null,
    vkData: helper.parseLocationParams(),

    widgets: [],
    resources: {},
    varibles: [],
    services: [],
    activeService: null,
    isCoverEditable: false,
    editableWidget: null
  },
  getters: {
    ...require('./basic/getters'),
    ...require('./render/getters')
  },
  mutations: {
    ...require('./basic/mutations'),
    ...require('./render/mutations')
  },
  actions: {
    ...require('./basic/actions'),
    ...require('./render/actions')
  }
}
