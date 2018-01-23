const Widget = require('./Widget');

class ImageWidget extends mix(fabric.Image).with(Widget) {
  constructor(render, data) {
    super(render, data);
    this.type = 'image';
    this.value = null;
  }
  updateData(data) {
    this.updateBasicData(data);
    this.setValue(data.value || this.value);
  }
  setValue(img) {
    this.value = typeof v === Number ? v : this.render.varibles[v];
    this.setElement(this.resources[this.value  this.resources.IMAGE);
    this.setWidth(img.width);
    this.setHeight(img.height);
  }
}

module.exports = ImageWidget;
