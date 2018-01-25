module.exports = {
  resourcesData(state) {
    let res = {};
    for(let key in state.resources) {
      res[key] = state.resources[key].src;
    }
  },
  isBackgrounExist(state) {
    return !state.background;
  }
}
