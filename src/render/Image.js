const mix = require('mixwith').mix;
const Widget = require('./Widget.js');

class ImageWidget extends mix(fabric.Image).with(Widget) {
  constructor(render, data) {
    super(render, data);
    this.type = 'image';
    this.value = null;

    this.updateData(data);
  }
  updateData(data={}) {
    this.updateBasicData(data);
    this.setValue(data.value || this.value);
  }
  setValue(v) {
    this.value = typeof v === Number ? v : this.renderer.varibles[v];
    let img = this.renderer.resources[this.value] || this.renderer.resources.IMAGE;
    console.log(img, this.renderer.resources);
    this.setElement(img);
    this.setWidth(img.width);
    this.setHeight(img.height);
  }
}

module.exports = ImageWidget;
