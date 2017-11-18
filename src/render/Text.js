const FONTS = {
  "BEBAS": "Roboto Regular",
  "ROBOTO": "Roboto"
}

class Text {
  constructor(render, data) {

    this.id = data.id || '' + Date.now();
    this.type = 'text';

    this.view = new fabric.Text(data.value || 'Здесь ваш текст, йоу', {
      fontSize: data.size || 42
    });
    this.render = render;

    this.setValue(data.value || 'Здесь ваш текст, йоу');
    this.setFontType(data.font || 'BEBAS');
    this.setColor(data.color || '#fff');
    this.setSize(data.size || 42);
    this.setX(data.x || 500);
    this.setY(data.y || 150);
    this.setAngle(data.angle || 0);
    this.view.fontWeight = 'bold';
  }
  getJSON() {
    return {
      data: {
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        angle: Math.round(this.view.angle),

        id: this.id,
        type: "text",
        value: this.value,
        font: this.fontType,
        size: this.size,
        color: this.color
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
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setFontType(type) {
    this.fontType = type;
    this.view.fontFamily = FONTS[type];
    this.render.canvas.renderAll();
  }
  setValue(val) {
    this.value = val;
    this.view.text = val;
    this.render.canvas.renderAll();
  }
  setSize(size) {
    this.size = +size;
    this.view.fontSize = size;
    this.render.canvas.renderAll();
  }
  setColor(color) {
    this.color = color;
    this.view.fill = color;
    this.render.canvas.renderAll();
  }
}

module.exports = Text;
