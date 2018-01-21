const Widget = require('./Widget');
const FONTS = {
  "BEBAS": "Bebas Neue",
  "ROBOTO": "Roboto"
}

class Text extends mix(fabric.Text).with(Widget) {
  constructor(render, data) {
    super(render, data);

    this.type = 'text';
    this.setValue(data.value || 'Ваш текстовый элемент...');
    this.setFontType(data.font || 'BEBAS');
    this.setColor(data.color || '#fff');
    this.setSize(data.size || 42);

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
  getData() {
    return {
      data: {
        ...this.getBasicData(),
        value: this.value,
        font: this.fontType,
        size: this.fontSize,
        color: this.fill
      }
    }
  }
  setFontType(type) {
    this.fontType = type;
    this.view.fontFamily = this.FONTS[type];
    this.render.renderAll();
  }
  setValue(val) {
    this.value = val;

    this.text = val.replace(/\{\{([a-zA-Z_]+)\}\}/g, (str, v) => {
      return this.render.getValueFromVarible(v);
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
