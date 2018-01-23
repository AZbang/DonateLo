class Widget {
  constructor(render, data) {
    this.render = render;

    this.cornerStrokeColor = '#6e7bab';
    this.borderColor = '#6e7bab';
    this.cornerColor = '#6e7bab';

    this.transparentCorners = false;
    this.objectCaching = false;
    this.selectable = true;
    this.cornerSize = 16;
    this.padding = 0;

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
  updateBasicData(data) {
    this.id = data.id || '' + Date.now();
    this.setX(data.x || this.top);
    this.setY(data.y || this.top);
    this.setWidth(data.w || this.top);
    this.setHeight(data.h || this.top);
    this.setAngle(data.angle || this.angle);
    this.setBorder(data.border_width || 0, data.border_color || '#fff');
  }
  setX(x) {
    this.left = x;
    this.render.renderAll();
  }
  setY(y) {
    this.top = y;
    this.render.renderAll();
  }
  setSize(w, h) {
    this.width = w;
    this.height = h;
    this.render.renderAll();
  }
  setWidth(w) {
    this.width = w;
    this.render.renderAll();
  }
  setHeight(h) {
    this.height = h;
    this.render.renderAll();
  }
  setAngle(angle) {
    this.angle = angle;
    this.render.renderAll();
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
    this.render.renderAll();
  }
}

module.exports = Widget;
