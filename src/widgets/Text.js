const Widget = require('./Widget');
const FONTS = {
  "BEBAS": "Bebas Neue",
  "ROBOTO": "Roboto"
}

class Text extends mix(fabric.Text).with(Widget) {
  constructor(render, data) {
    super(render, data);

    this.type = 'text';
    this.value = 'Ваш текстовый элемент...';
    this.fontType = 'BEBAS';
    this.fill = '#fff';
    this.fontSize = 42;

    this.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      br: false,
      tl: false,
      tr: false
    });
  }
  updateData(data) {
    this.updateBasicData(data);
    this.setValue(data.value || this.value);
    this.setFontType(data.font || this.fontType);
    this.setColor(data.color || this.fill);
    this.setSize(data.size || this.fontSize);
  }
  setFontType(type) {
    this.fontType = type;
    this.view.fontFamily = this.FONTS[type];
    this.render.renderAll();
  }
  setValue(val) {
    this.value = val;
    this.text = val.replace(/\{\{([a-zA-Z_]+)\}\}/g, (str, v) => {
      return this.render.varibles[v];
    });
    this.render.renderAll();
  }
  setSize(size) {
    this.fontSize = size;
    this.render.renderAll();
  }
  setColor(color) {
    this.fill = color;
    this.render.renderAll();
  }
}

module.exports = Text;
