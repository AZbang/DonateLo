module.exports = {
  states: {
    widgets: [].
    resources: {},
    varibles: [],

    cover: null,
    isCoverExist: false,
    isCoverEditable: false,
    editableWidget: null
  },
  mutations: require('./mutations'),
  getters: require('./getters'),
  actions: require('./actions'),
}
