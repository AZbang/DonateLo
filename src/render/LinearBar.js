const Widget = require('./Widget');

class LinearBar extends mix(fabric.Group).with(Widget) {
  constructor(render, data, res) {
    super(render, data, res);
    this.type = 'linear';

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();
    this.progressImage.setOriginToCenter();
    this.add([this.standImage, this.progressImage]);

    if(data.value) this.setVarible(data.value);
    else this.setValue(50);

    this.setMaxValue(data.max_value || 100);
    this.setStandImage(res[this.id + ':stand'] || 'assets/white_pixel.png');
    this.setProgressImage(res[this.id + ':bar'] || 'assets/white_pixel.png');
    this.setProgressColor(data.bar_color || '#ded2f7');
    this.setStandColor(data.stand_color || '#fff');
    this.setBorder(data.borderSize || 0, this.borderColor || '#fff');
  }
  getJSON() {
    return {
      images: {
        [this.id + ':stand']: this.standImage._element.src,
        [this.id + ':bar']: this.progressImage._element.src
      },
      data: {
        ...getBasicData(),
        value: this.varible || '',
        max_value: this.maxValue,
        stand_color: this.standColor,
        bar_color: this.progressColor,
        border_size: this.borderSize,
        border_color: this.borderColor
      }
    }
  }
  setVarible(id) {
    this.varible = id;
    this.setValue(this.render.getValueFromVarible(id));
  }
  setWidth(w) {
    this.view.setWidth(w);
    this.progressImage.left = -this.width/2;
    this.progressImage.setWidth(this.width);

    this.standImage.left = -this.width/2;
    this.standImage.setWidth(this.width);
    this.setValue(this.value);
  }
  setHeight(h) {
    this.view.setHeight(h);
    this.progressImage.top = -this.height/2;
    this.progressImage.setHeight(this.height);

    this.standImage.top = -this.height/2;
    this.standImage.setHeight(this.height);
    this.setValue(this.value);
  }
  setSize(w, h) {
    this.setHeight(h);
    this.setWidth(w);
  }
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setProgressImage(url) {
    this.progressImage.setElement(img);
    this.setSize(this.width, this.height);
    this.setProgressColor(this.progressColor);
    this.setValue(this.value);
  }
  setStandImage(img) {
    this.standImage.setElement(img);
    this.setSize(this.width, this.height);
    this.setStandColor(this.standColor);
    this.render.renderAll();
  }
  setValue(val) {
    this.value = val;
    this.progressImage.width = this.width/this.maxValue*this.value;
    this.render.renderAll();
  }
  setMaxValue(max) {
    this.maxValue = +max;
    this.progressImage.width = this.width/this.maxValue*this.value;
    this.render.renderAll();
  }
  setProgressColor(color) {
    this.progressColor = color;
    this.progressImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.progressImage.applyFilters(() => this.render.renderAll());
  }
  setStandColor(color) {
    this.standColor = color;
    this.standImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.standImage.applyFilters(() => this.render.renderAll());
  }
  setBorderColor(color) {
    this.setBorder(this.borderSize, color);
  }
  setBorderWidth(size) {
    this.setBorder(size, this.borderColor);
  }
  setBorder(size, color) {
    this.borderSize = size;
    this.borderColor = color;

    this.set({
      stroke: color,
      strokeWidth: size
    });
    this.render.renderAll();
  }
}

module.exports = LinearBar;
