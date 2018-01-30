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
    let canvas = document.createElement('canvas');
    canvas.id = id;
    super(canvas);

    this.width = 1000;
    this.height = 300;
    this.scale = 1;

    this.coverImage = new CoverImage(this);
    this.add(this.coverImage);

    this.views = [];
    this.resources = {};
    this.varibles = {};
    this.widgets = [];
  }


  updateWidgets() {
    let widgets = this.views;
    widgets.forEach((w) => {
      let widget = this.widgets.find((el) => el.id === w.id);
      if(widget) widget.updateData(w);
      else this.addWidget(w);
    });

    this.widgets.forEach((w) => {
      if(!widgets.find((el) => el.id === w.id)) this.removeWidget(w);
    });
  }

  addWidget(data={}) {
    let widget = new WIDGETS[data.type](this, data);
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
