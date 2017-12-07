class ContructorImage {
  constructor(render, data) {
    this.render = render;
    this.type = 'image';
    this.id = data.id || '' + Date.now();

    this.view = new fabric.Image();

    this.view.setOriginToCenter();
    this.setX(data.x || 200);
    this.setY(data.y || 200);
    this.setWidth(data.w || 200);
    this.setHeight(data.h || 200);
    this.setAngle(360-data.angle || 0);
    if(data.value) this.setVarible(data.value);
    else this.setValue('assets/image.png');

    this.setBorderWidth(data.borderWidth || 0);
    this.setBorderColor(data.borderColor || '#fff');
  }
  getJSON() {
    return {
      data: {
        id: this.id,
        type: "image",
        value: this.varible || '',
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        w: Math.round(this.view.width),
        h: Math.round(this.view.height),
        angle: Math.round(360-this.view.angle),
        // border_color: obj.borderColor,
        // border_width: obj.borderWidth
      }
    }
  }
  setVarible(id) {
    this.varible = id;
    this.setValue(this.render.getValueFromVarible(id));
  }
  setX(x) {
    this.view.left = x;
    this.render.canvas.renderAll();
  }
  setY(y) {
    this.view.top = y;
    this.render.canvas.renderAll();
  }
  setSize(w, h) {
    this.view.width = w;
    this.view.height = h;
    this.render.canvas.renderAll();
  }
  setWidth(w) {
    this.view.width = w;
    this.render.canvas.renderAll();
  }
  setHeight(h) {
    this.view.height = h;
    this.render.canvas.renderAll();
  }
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setValue(src) {
    this.value = src;
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let w = this.view.width;
      let h = this.view.height
      this.view.setElement(img);
      this.setWidth(w);
      this.setHeight(h);
    }
    img.src = src;
  }
  setBorderWidth(width) {
    this.borderWidth = +width;
    this.view.strokeWidth = +width;
  }
  setBorderColor(color) {
    this.borderColor = color;
    this.view.stroke = color;
  }
}

module.exports = ContructorImage;
