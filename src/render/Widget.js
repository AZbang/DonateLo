class Widget {
  constructor(render, data) {
    this.render = render;
    this.id = data.id || '' + Date.now();
    this.setOriginToCenter();
    this.setX(data.x || 200);
    this.setY(data.y || 200);
    this.setWidth(data.w || 200);
    this.setHeight(data.h || 200);
    this.setAngle(360-data.angle || 0);
    this.setBorderWidth(data.borderWidth || 0);
    this.setBorderColor(data.borderColor || '#fff');

    this.objectCaching = false;
    this.selectable = true;
    this.padding = 0;
    this.cornerSize = 16;
    this.borderColor = '#6e7bab';
    this.cornerColor = '#6e7bab';
    this.cornerStrokeColor = '#6e7bab';
    this.transparentCorners = false;

    this.on({
      scaling: (e) => {
        let w = this.width * this.scaleX;
        let h = this.height * this.scaleY;
        let s = this.strokeWidth;
        this.set({
          scaleX: 1,
          scaleY: 1
        });
        this.setSize(w, h);
      }
    });
  }
  getBasicData() {
    return {
      id: this.id,
      type: this.type,
      x: Math.round(this.left),
      y: Math.round(this.top),
      angle: Math.round(360-this.angle)
    }
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
}

module.exports = Widget;
