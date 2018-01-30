/*
  Коллекция секций в приложении для AdminGroup сцены
  Названия секций соответсвует Store.section
*/

module.exports = {
  WIDGETS: require('./Widgets.vue'),
  SERVICES: require('./Services.vue'),
  SETTINGS: require('./Settings.vue'),

  WIDGET_EDITOR: require('./WidgetEditor.vue'),
  SERVICE_EDITOR: require('./ServiceEditor.vue')
}
