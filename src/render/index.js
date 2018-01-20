require('./fabricExtensions');

const CoverImage = require('./CoverImage');
const WIDGETS = {
  'text': require('./Text'),
  'linear': require('./LinearBar'),
  'radial': require('./RadialBar'),
  'image': require('./Image')
}

class Render extends fabric.Canvas {
  constructor(id) {
    super(id);

    this.width = 1000;
    this.height = 300;
    this.scale = 1;

    this.setWidth(this.coverWidth);
    this.setHeight(this.coverHeight);

    this.coverImage = new CoverImage();
    this.add(this.coverImage);

    this.widgets = [];
    this.varibles = {};
  }
  getValueFromVarible(id) {
    return this.varibles[id] || '';
  }
  setVaribles(varibles) {
    this.varibles = varibles;
    this.widgets.forEach((w) => {
      if(w.type === 'text') w.setValue(w.value);
      else w.setVarible(w.varible);
    });
  }

  addWidget(type, data={}, res={}) {
    let widget = new WIDGETS[type](this, data, res);
    this.widgets.push(widget);
    this.add(widget.view);
    this.renderAll();

    return widget;
  }
  removeWidget(id) {
    this.widgets.forEach((w, i) => {
      if(w.id == id) {
        this.remove(w.view);
        this.widgets.splice(i, 1);
      }
    });
  }
  getJSON() {
    let resources = {};
    let views = [];

    this.widgets.forEach((i) => {
      let data = i.getJSON();
      resources = {...resources, ...data.images};
      views.push(data.data);
    });
    return {resources, views};
  }
}

module.exports = Render;
