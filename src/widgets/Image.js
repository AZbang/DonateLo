const Widget = require('./Widget');

class ImageWidget extends mix(fabric.Image).with(Widget) {
  constructor(render, data) {
    super(render, data);
    this.type = 'image';

    if(data.value) this.setVarible(data.value);
    else this.setValue('assets/image.png');
  }
  getJSON() {
    return {
      data: {
        ...this.getBasicData(),
        value: this.varible || '',
      }
    }
  }
  setVarible(id) {
    this.varible = id;
    this.setValue(this.render.getValueFromVarible(id));
  }
  setValue(img) {
    this.view.setElement(img);
    this.setWidth(img.width);
    this.setHeight(img.height);
  }
}

module.exports = ImageWidget;
