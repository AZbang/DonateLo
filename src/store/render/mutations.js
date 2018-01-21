module.exports = {
  setCoverEditable(state, isEditable) {
    state.isCoverEditable = isEditable;
  }
  setCover(state, img) {
    state.render.setCover(img);
    state.isCoverExist = true;
  },
  addWidget(state, {type, data, res}) {
    let widget = new WIDGETS[type](state, data, res);
    state.widgets.push(widget);
    state.render.add(widget);
    state.render.renderAll();
  },
  removeWidget(state, id) {
    state.widgets.forEach((widget, i) => {
      if(widget.id == id) {
        state.render.remove(widget);
        state.widgets.splice(i, 1);
      }
    });
  }
}
