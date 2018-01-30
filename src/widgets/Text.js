const mix = require('mixwith').mix;
const Widget = require('./Widget.js');
const FONTS = {
  "BEBAS": "Bebas Neue",
  "ROBOTO": "Roboto"
}

class Text extends mix(fabric.Text).with(Widget) {
  constructor(render, data) {
    super(render, data, 'text');

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
    this.updateData(data);
  }
  updateData(data={}) {
    this.updateBasicData(data);
    this.setValue(data.value || this.value);
    this.setFontType(data.font || this.fontType);
    this.setColor(data.color || this.fill);
    this.setSize(data.size || this.fontSize);
  }
  setFontType(type) {
    this.fontType = type;
    this.fontFamily = FONTS[type];
    this.renderer.renderAll();
  }
  setValue(val) {
    this.value = val;
    this.text = val.replace(/\{\{([a-zA-Z_]+)\}\}/g, (str, v) => {
      return this.renderer.varibles[v];
    });
    this.renderer.renderAll();
  }
  setSize(size) {
    this.fontSize = size;
    this.renderer.renderAll();
  }
  setColor(color) {
    this.fill = color;
    this.renderer.renderAll();
  }
}

module.exports = Text;
