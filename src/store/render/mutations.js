module.exports = {
  addWidgets(state, widgets) {
    state.widgets = state.widgets.concat(widgets);
  },
  addWidget(state, data) {
    state.widgets.push(Object.assign({
      id: Date.now(),
      angle: 0,
      x: 200,
      y: 200,
      w: 200,
      h: 200
    }, data));
  },
  removeWidget(state, id) {
    state.widgets.forEach((w, i) => {
      if(w.id === id) state.widgets.splice(i, 1);
    });
  },

  setVaribles(state, vars) {
    state.varibles = vars;
  },

  setEditableWidget(state, id) {
    state.editableWidget = id;
  },
  setWidgetProps(state, {id, data}) {
    state.widgets.forEach((w, i) => {
      if(w.id === id) Vue.set(state.widgets, i, Object.assign(w, data));
    });
  },

  addResources(state, res) {
    state.resources = Object.assign({}, state.resources, res);
  },
  addResource(state, {key, img}) {
    Vue.set(state.resources, key, img);
  },
  removeResource(state, id) {
    Vue.delete(state.resources, id);
  }
}
