module.exports = {
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setView(state, view) {
    state.viewName = view;
  },
  setSection(state, section) {
    state.sectionName = section;
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
  setActiveService(state, id) {
    if(state.services[id])
      state.activeService = state.services[id];
  }
}
