const Widget = require('./Widget');

class LinearBar extends mix(fabric.Group).with(Widget) {
  constructor(render, data, res) {
    super(render, data);
    this.type = 'linear';

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();
    this.progressImage.setOriginToCenter();
    this.add([this.standImage, this.progressImage]);
  }

  updateData(data) {
    this.updateBasicParams(data);
    this.setValue(data.value || this.value);
    this.setStartAngle(data.start_angle || this.startAngle);
    this.setMaxValue(data.max_value || this.maxValue);
    this.setProgressImage(this.resources[this.id + ':bar'] || this.resources.WHITE);
    this.setStandImage(this.resources[this.id + ':stand'] || this.resources.WHITE);
    this.setProgressColor(data.bar_color || this.progressColor);
    this.setStandColor(data.stand_color || this.standColor);
  }
  setValue(v) {
    this.value = typeof v === Number ? v : this.render.varibles[v];
    this.progressImage.width = this.width/this.maxValue*this.value;
    this.render.renderAll();
  }
  setWidth(w) {
    this.progressImage.left = -this.width/2;
    this.progressImage.setWidth(this.width);

    this.standImage.left = -this.width/2;
    this.standImage.setWidth(this.width);
    this.setValue(this.value);
  }
  setHeight(h) {
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
}

module.exports = LinearBar;
