const Widget = require('./Widget');

class RadialBar extends mix(fabric.Group).with(Widget) {
  constructor(render, data) {
    super(render, data);
    this.type = 'radial';

    this.value = 25;
    this.maxValue = 100;
    this.progressColor = '#ded2f7';
    this.standColor = '#fff';

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();
    this.progressImage.setOriginToCenter();
    this.add([this.standImage, this.progressImage]);

    this.setControlsVisibility({
       mt: false,
       mb: false,
       ml: false,
       mr: false
    });
    this.updateParams(data);
  }
  updateData(data) {
    this.updateBasicParams(data);

    this.setValue(data.value || this.value);
    this.setStartAngle(data.start_angle || this.startAngle);
    this.setMaxValue(data.max_value || this.maxValue);
    this.setProgressImage(this.render.resources[this.id + ':bar'] || this.render.resources.WHITE);
    this.setStandImage(this.render.resources[this.id + ':stand'] || this.render.resources.WHITE);
    this.setProgressColor(data.bar_color || this.progressColor);
    this.setStandColor(data.stand_color || this.standColor);
  }
  setValue(v) {
    this.value = typeof v === Number ? v : this.render.varibles[v];
    this.progressImage.set({
      clipTo: (ctx) => {
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, this.view.width/2, 0, Math.PI*2/this.maxValue*this.value, false);
        ctx.lineTo(0, 0);
        ctx.fill();
      }
    });
    this.render.renderAll();
  }
  setSize(w) {
    this.width = w;
    this.height = w;
    this.progressImage.top = 0;
    this.progressImage.left = 0;
    this.progressImage.width = this.width;
    this.progressImage.height = this.width;
    this.setBorder(this.borderSize, this.borderColor);
    this.setValue(this.value);
  }
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setProgressImage(img) {
    this.progressImage.setElement(img);
    this.setSize(this.width);
    this.setStartAngle(this.startAngle);
    this.setProgressColor(this.progressColor);
    this.setValue(this.value);
    this.render.renderAll();
  }
  setStandImage(img) {
    this.standImage.setElement(img);
    this.setSize(this.width);
    this.setStandColor(this.standColor);
    this.render.renderAll();
  }
  setStartAngle(angle) {
    this.startAngle = angle;
    this.progressImage.angle = angle;
    this.render.renderAll();
  }
  setMaxValue(max) {
    this.maxValue = max;
    this.setValue(this.value);
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

module.exports = RadialBar;
