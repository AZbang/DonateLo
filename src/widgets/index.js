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
    this.add(this.coverImage);

    this.widgets = [];
    this.resources = {};
    this.varibles = {};

    this.resizeToWidth();
  }
  resizeToWidth() {
    this.setWidth(this.coverImage.coverWidth);
    this.setHeight(this.coverImage.coverHeight);

    let scale = this.render.width/this.coverImage.coverWidth;
    let container = document.getElementsByClassName('canvas-container')[0];
    container.style.transform = 'scale(' + scale + ')';
    container.style.transformOrigin = '0 0';
    document.getElementById('cover-control').style.height = this.coverImage.coverHeight*scale + 'px';
  }
  updateVaribles(varibles) {
    this.varibles = varibles;
    this.widgets.forEach((widget) => {
      widget.updateParams();
    });
  }
  updateResouces(res) {
    this.resources = res;
    this.coverImage.setCover(this.resources.background);
    this.widgets.forEach((widget) => {
      widget.updateParams();
    });
  }
  updateWidgets(widgets) {
    widgets.forEach((w) => {
      let widget = this.widgets.find((el) => el.id === w.id);
      if(widget) widget.updateParams(w);
      else this.addWidget(w);
    });

    this.widgets.forEach((w) => {
      if(!widgets.find((el) => el.id === w.id)) this.removeWidget(w);
    });
  }

  addWidget(type, data={}) {
    let widget = new WIDGETS[type](this, data);
    this.widgets.push(widget);
    this.add(widget);
    this.renderAll();

    return widget;
  }
  removeWidget(w) {
    this.remove(widget);
    this.widgets.splice(i, 1);
  }
}

module.exports = Render;
