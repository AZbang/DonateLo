const mix = require('mixwith').mix;
const Widget = require('./Widget.js');

class LinearBar extends mix(fabric.Group).with(Widget) {
  constructor(render, data, res) {
    super(render, data);
    this.type = 'linear';

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();
    this.progressImage.setOriginToCenter();
    this.add(this.standImage, this.progressImage);

    this.updateData(data);
  }

  updateData(data={}) {
    this.updateBasicData(data);
    this.setValue(data.value || this.value);
    this.setMaxValue(data.max_value || this.maxValue);
    this.setProgressImage(this.renderer.resources[this.id + ':bar'] || this.renderer.resources.WHITE);
    this.setStandImage(this.renderer.resources[this.id + ':stand'] || this.renderer.resources.WHITE);
    this.setProgressColor(data.bar_color || this.progressColor);
    this.setStandColor(data.stand_color || this.standColor);
  }
  setValue(v) {
    this.value = typeof v === Number ? v : this.renderer.varibles[v];
    this.progressImage.width = this.width/this.maxValue*this.value;
    this.renderer.renderAll();
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
  setProgressImage(img) {
    this.progressImage.setElement(img);
    this.setSize(this.width, this.height);
    this.setProgressColor(this.progressColor);
    this.setValue(this.value);
  }
  setStandImage(img) {
    this.standImage.setElement(img);
    this.setSize(this.width, this.height);
    this.setStandColor(this.standColor);
    this.renderer.renderAll();
  }
  setMaxValue(max) {
    this.maxValue = +max;
    this.progressImage.width = this.width/this.maxValue*this.value;
    this.renderer.renderAll();
  }
  setProgressColor(color) {
    this.progressColor = color;
    this.progressImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.progressImage.applyFilters(() => this.renderer.renderAll());
  }
  setStandColor(color) {
    this.standColor = color;
    this.standImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.standImage.applyFilters(() => this.renderer.renderAll());
  }
}

module.exports = LinearBar;
