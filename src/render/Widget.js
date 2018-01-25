const Widget = (superclass) => class extends superclass {
  constructor(render, data, arg) {
    super(arg);

    this.renderer = render;

    this.cornerStrokeColor = '#6e7bab';
    this.borderColor = '#6e7bab';
    this.cornerColor = '#6e7bab';

    this.transparentCorners = false;
    this.objectCaching = false;
    this.selectable = true;
    this.cornerSize = 16;
    this.padding = 0;

    this.id = Date.now();
    this.angle = 0;
    this.top = 200;
    this.left = 200;
    this.width = 200;
    this.height = 200;
    this.borderSize = 0;
    this.borderColor = '#fff';

    this.setOriginToCenter();
    this.on({
      scaling: (e) => {
        this.setSize(this.width*this.scaleX, this.height*this.scaleY);
        this.set({scaleX: 1, scaleY: 1});
      }
    });
  }
  updateBasicData(data={}) {
    this.id = data.id || this.id;
    this.setX(data.x || this.top);
    this.setY(data.y || this.left);
    this.setWidth(data.w || this.width);
    this.setHeight(data.h || this.height);
    this.setAngle(data.angle || this.angle);
    this.setBorder(data.border_width || this.borderSize, data.border_color || this.borderColor);
  }
  setX(x) {
    this.left = x;
    this.renderer.renderAll();
  }
  setY(y) {
    this.top = y;
    this.renderer.renderAll();
  }
  setSize(w, h) {
    this.width = w;
    this.height = h;
    this.renderer.renderAll();
  }
  setWidth(w) {
    this.width = w;
    this.renderer.renderAll();
  }
  setHeight(h) {
    this.height = h;
    this.renderer.renderAll();
  }
  setAngle(angle) {
    this.angle = angle;
    this.renderer.renderAll();
  }
  setBorderColor(color) {
    this.setBorder(this.borderSize, color);
  }
  setBorderWidth(size) {
    this.setBorder(size, this.borderColor);
  }
  setBorder(size, color) {
    this.borderSize = size;
    this.borderColor = color;

    this.set({
      stroke: color,
      strokeWidth: size
    });
    this.renderer.renderAll();
  }
}

module.exports = Widget;
