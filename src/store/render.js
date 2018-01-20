/**
  Render Mudule Store
  Набор реактивных свойств и методов для работы с Render API
**/

// Render API
const Render = require('../render');

module.exports = {
  state: {
    render: null,
    isCoverExist: false,
    isCoverEditable: false,
    editableObject: null
  },
  mutations: {
    initRender(state, id) {
      state.render = new Render(id);
    },
    setVariblesRender(state, vars) {
      state.render.setVaribles(vars);
    },
    setEditableObject(state, widget) {
      state.editableObject = widget;
    },
    setCoverEditable(state, v) {
      state.isCoverEditable = !!v;
    },
    setCoverExist(state, v) {
      state.isCoverExist = !!v;
    }
  },
  getters: {
    coverImage(state) {
      return state.render.coverImage._element.src;
    },
    renderViews(state) {
      return state.render.getJSON();
    }
  },
  actions: {
    async setCover({commit, state}, src) {
      commit('setCoverExist');
      await state.render.coverImage.setCover(src);
    },
    addWidgets({dispatch, state}, data) {
      for(let key in data.views) {
        let view = data.views[key];
        dispatch('addWidget', {
          type: view.type, view, res: data.resources
        });
      }
      state.render.trigger('selection:cleared');
    },
    addWidget({state, commit}, data) {
      let widget = state.render.addWidget(data.type, data.view || [], data.res || {});

      widget.view.on('mousedown', () => {
        commit('setEditableObject', widget);
        commit('setSection', 'WIDGET_EDITOR');
      });
      state.render.on('selection:cleared', () => {
        commit('setEditableObject', null);
        commit('setSection', 'WIDGETS');
      });
      widget.view.trigger('mousedown');
    },
    removeWidget({state, commit}, id) {
      commit('setSection', 'WIDGETS');
      state.render.removeWidget(id);
    }
  }
}
