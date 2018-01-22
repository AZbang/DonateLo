module.exports = {
  setCoverEditable(state, isEditable) {
    state.isCoverEditable = isEditable;
  }
  setCover(state, img) {
    state.cover = img;
    state.isCoverExist = true;
  },
  addWidgets(state, widgets) {
    state.widgets.concat(widgets);
  },
  addWidget(state, data) {
    state.widgets.push(data);
  },
  removeWidget(state, id) {
    state.widgets.forEach((w, i) => {
      if(w.id === id) state.widgets.splice(i, 1);
    });
  },

  setVaribles(state, vars) {
    state.varibles = vars;
    state.widgets.forEach((widget) => {
      widget.setValue(widget.value);
    });
  },

  setEditableWidget(state, id) {
    state.editableWidget = id;
  },
  setWidgetProps(state, {id, props}) {
    state.widgets.forEach((w, i) => {
      if(w.id === id) Vue.set(state.widgets, i, Object.assign(w, props));
    });
  },

  addResources(state, res) {
    this.resources = Object.assign({}, this.resources, res);
  },
  addResource(state, {img) {
    Vue.set(this.resources, )
  },
  removeResource(state, id) {
    Vue.delete(this.resources, id);
  }
}
