class ImageWidget extends fabric.Image {
  constructor(render, data) {
    this.type = 'image';

    if(data.value) this.setVarible(data.value);
    else this.setValue('assets/image.png');
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
  setValue(img) {
    this.view.setElement(img);
    this.setWidth(img.width);
    this.setHeight(img.height);
  }
}

module.exports = ImageWidget;
