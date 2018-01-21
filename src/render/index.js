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

    this.coverImage = new CoverImage();
    this.setWidth(this.coverImage.coverWidth);
    this.setHeight(this.coverImage.coverHeight);
    this.add(this.coverImage);

    this.widgets = [];
    this.varibles = {};
  }
  resizeToWidth() {
    let scale = this.render.width/this.coverWidth;
    let container = document.getElementsByClassName('canvas-container')[0];
    container.style.transform = 'scale(' + scale + ')';
    container.style.transformOrigin = '0 0';
    document.getElementById('cover-control').style.height = this.coverHeight*scale + 'px';
  }
  getValueFromVarible(id) {
    return this.varibles[id] || '';
  }
  setVaribles(varibles) {
    this.varibles = varibles;
    this.widgets.forEach((widget) => {
      if(widget.type === 'text') widget.setValue(widget.value);
      else widget.setVarible(widget.varible);
    });
  }

  addWidget(type, data={}, res={}) {
    let widget = new WIDGETS[type](this, data, res);
    this.widgets.push(widget);
    this.add(widget);
    this.renderAll();

    return widget;
  }
  removeWidget(id) {
    this.widgets.forEach((widget, i) => {
      if(widget.id == id) {
        this.remove(widget);
        this.widgets.splice(i, 1);
      }
    });
  }
  getJSON() {
    let resources = {};
    let views = [];

    this.widgets.forEach((i) => {
      let data = i.getData();
      resources = {...resources, ...data.images};
      views.push(data.data);
    });
    return {resources, views};
  }
}

module.exports = Render;
