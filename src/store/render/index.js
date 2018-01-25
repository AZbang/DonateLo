module.exports = {
  state: {
    widgets: [],
    resources: {},
    varibles: [],
    isCoverEditable: false,
    editableWidget: null
  },
  mutations: require('./mutations'),
  getters: require('./getters'),
  actions: require('./actions'),
}
