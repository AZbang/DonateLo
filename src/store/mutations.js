module.exports = {
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setView(state, view) {
    state.viewName = view;
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
