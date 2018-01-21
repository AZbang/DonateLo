module.exports = {
  getWidgetsData(state) {
    let resources = {};
    let views = [];

    state.widgets.forEach((i) => {
      let data = i.getData();
      resources = {...resources, ...data.images};
      views.push(data.data);
    });
    return {resources, views};
  }
}
