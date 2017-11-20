class ContructorImage {
  constructor(render, data) {
    this.render = render;
    this.type = 'image';
    this.id = data.id || '' + Date.now();

    this.view = new fabric.Image();

    this.setX(data.x || 50);
    this.setY(data.y || 50);
    this.setWidth(data.w || 500);
    this.setHeight(data.h || 150);
    this.setAngle(data.angle || 0);
    this.setValue('assets/image.png');
    this.setBorderWidth(data.borderWidth || 0);
    this.setBorderColor(data.borderColor || '#fff');
  }
  getJSON() {
    return {
      data: {
        id: this.id,
        type: "image",
        value: this.value,
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        w: Math.round(this.view.currentWidth),
        h: Math.round(this.view.currentHeight),
        angle: Math.round(this.view.angle),
        // border_color: obj.borderColor,
        // border_width: obj.borderWidth
      }
    }
  }
  setX(x) {
    this.view.left = x;
    this.render.canvas.renderAll();
  }
  setY(y) {
    this.view.top = y;
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
