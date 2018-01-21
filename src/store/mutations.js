module.exports = {
  setView(state, view) {
    state.viewName = view;
  },

  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setVaribles(state, vars) {
    state.varibles = vars;
    state.widgets.forEach((widget) => {
      widget.setValue(widget.value);
    });
  },
  setViews(state, views) {
    state.views = views;
  },
  setResources(state, resources) {
    state.resources = resources;
  },
  setServices(state, services) {
    for(let key in services) {
      for(let input in services[key].inputs) {
        services[key].id = key;
        services[key].inputs[input].value = '';
      }
      state.services.push(services[key]);
    }
  },
  activeService(state, id) {
    if(state.services[id])
      state.activeService = state.services[id];
  }
}
