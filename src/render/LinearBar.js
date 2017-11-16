class LinearBar  {
  constructor(render, data, res) {
    this.render = render;

    this.type = 'linear';
    this.id = data.id || '' + Date.now();

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();

    this.view = new fabric.Group([this.standImage, this.progressImage]);
    this._saveLastBorder = 0;

    this.setX(data.x || 50);
    this.setY(data.y || 50);
    this.setWidth(data.width || 200);
    this.setHeight(data.height || 50);
    this.setAngle(data.angle || 0);
    this.setValue(data.value || 50);
    this.setMaxValue(data.maxValue || 100);
    this.setStandImage(res[this.id + ':stand'] || 'assets/white_pixel.png');
    this.setProgressImage(res[this.id + ':bar'] || 'assets/white_pixel.png');
    this.setProgressColor(data.progressColor || '#fff');
    this.setStandColor(data.standColor || '#fff');
    this.setBorder(data.border || 0);
  }
  getJSON() {
    console.log(this.standImage);
    return {
      images: {
        [this.id + ':stand']: this.standImage._element.src,
        [this.id + ':bar']: this.progressImage._element.src
      },
      data: {
        id: this.id,
        type: "linear",
        value: "" + this.value,
        max_value: this.maxValue,
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        w: Math.round(this.view.width),
        h: Math.round(this.view.height),
        angle: this.view.angle,
        stand_color: this.standColor,
        bar_color: this.progressColor,
        border: this.border
      }
    }
  }
  setX(x) {
    this.view.left = x;
    this.render.canvas.renderAll();
  }
  setY(y) {
    this.view.top = y;
    this.render.canvas.renderAll();
  }
  setWidth(w) {
    this.view.width = w;
    this.render.canvas.renderAll();
  }
  setHeight(h) {
    this.view.height = h;
    this.render.canvas.renderAll();
  }
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setProgressImage(url) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.progressImage.setElement(img);
      this.progressImage.top = -this.view.height/2;
      this.progressImage.left = -this.view.width/2;
      this.progressImage.setHeight(this.view.height);
      this.setValue(this.value);
    }
    img.src = url;
  }
  setStandImage(url) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.standImage.setElement(img);
      this.standImage.top = -this.view.height/2;
      this.standImage.left = -this.view.width/2;
      this.standImage.setHeight(this.view.height);
      this.standImage.setWidth(this.view.width);
      this.render.canvas.renderAll();
    }
    img.src = url;
  }
  setValue(val) {
    this.value = +val;
    this.progressImage.width = this.view.width/this.maxValue*this.value;
    this.render.canvas.renderAll();
  }
  setMaxValue(max) {
    this.maxValue = max;
    this.progressImage.width = this.view.width/this.maxValue*this.value;
    this.render.canvas.renderAll();
  }
  setProgressColor(color) {
    this.progressColor = color;
    this.progressImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.progressImage.applyFilters(this.render.canvas.renderAll.bind(this.render.canvas));
  }
  setStandColor(color) {
    this.standColor = color;
    this.standImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.standImage.applyFilters(this.render.canvas.renderAll.bind(this.render.canvas));
  }
  setBorder(border) {
    this.border = border;
    this.standImage.setHeight(this.view.height+this.border*2);
    this.standImage.setWidth(this.view.width+this.border*2);
    this.standImage.left -= this._saveLastBorder+this.border;
    this.standImage.top -= this._saveLastBorder+this.border;
    this._saveLastBorder = this.border;
    this.render.canvas.renderAll();
  }
}

module.exports = LinearBar;
