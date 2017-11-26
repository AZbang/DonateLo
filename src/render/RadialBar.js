class RadialBar  {
  constructor(render, data, res) {
    this.render = render;

    this.type = 'radial';
    this.id = data.id || '' + Date.now();

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();
    this.progressImage.setOriginToCenter();

    this.view = new fabric.Group([this.standImage, this.progressImage]);
    this._saveLastBorder = 0;

    this.view.setOriginToCenter();
    this.setX(data.x || 500);
    this.setY(data.y || 150);
    this.setSize(data.w || 200);
    this.setAngle(360-data.angle || 0);
    if(data.value) this.setVarible(data.value);
    else this.setValue(25);

    this.setStartAngle(-90);
    this.setMaxValue(data.max_value || 100);
    this.setStandImage(res[this.id + ':stand'] || 'dist/assets/white_pixel.png');
    this.setProgressImage(res[this.id + ':bar'] || 'dist/assets/white_pixel.png');
    this.setProgressColor(data.bar_color || '#ded2f7');
    this.setStandColor(data.stand_color || '#fff');
    this.setBorder(data.border || 0);

    this.view.setControlsVisibility({
       mt: false,
       mb: false,
       ml: false,
       mr: false
    });
  }
  getJSON() {
    return {
      images: {
        [this.id + ':stand']: this.standImage._element.src,
        [this.id + ':bar']: this.progressImage._element.src
      },
      data: {
        id: this.id,
        type: "radial",
        value: this.varible || '',
        max_value: this.maxValue,
        start_angle: 0,
        direction: 0,
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        w: Math.round(this.view.width),
        h: Math.round(this.view.height),
        angle: Math.round(360-this.view.angle),
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
  setSize(w) {
    this.view.width = w;
    this.view.height = w;
    this.progressImage.top = 0;
    this.progressImage.left = 0;
    this.progressImage.width = this.view.width;
    this.progressImage.height = this.view.width;
    this.standImage.top = -this.view.height/2;
    this.standImage.left = -this.view.width/2;
    this.standImage.width = this.view.width;
    this.standImage.height = this.view.width;
    this.standImage.set({
      clipTo: (ctx) => {
        ctx.arc(0, 0, this.view.width/2, 0, Math.PI*2, true);
      }
    });
    this.setValue(this.value);
  }
  setVarible(id) {
    this.varible = id;
    this.setValue(this.render.getValueFromVarible(id));
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
      this.progressImage.top = 0;
      this.progressImage.left = 0;
      this.progressImage.width = this.view.width;
      this.progressImage.height = this.view.width;
      this.setStartAngle(this.startAngle);
      this.setProgressColor(this.progressColor);
      this.setValue(this.value);
      this.render.canvas.renderAll();
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
      this.standImage.width = this.view.width;
      this.standImage.height = this.view.width;

      this.setStandColor(this.standColor);
      this.standImage.set({
        clipTo: (ctx) => {
          ctx.arc(0, 0, this.view.width/2, 0, Math.PI*2, true);
        }
      });
      this.render.canvas.renderAll();
    }
    img.src = url;
  }
  setStartAngle(angle) {
    this.startAngle = +angle;
    this.progressImage.angle = angle;
    this.render.canvas.renderAll();
  }
  setValue(v) {
    this.value = +v;
    this.progressImage.set({
      clipTo: (ctx) => {
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, this.view.width/2, 0, Math.PI*2/this.maxValue*this.value, false);
        ctx.lineTo(0, 0);
        ctx.fill();
      }
    });
    this.render.canvas.renderAll();
  }
  setMaxValue(v) {
    this.maxValue = +v;
    this.setValue(this.value);
  }
  setBorder(br) {
    this.border = +br;
    this.standImage.width = this.view.width+br*2;
    this.standImage.height = this.view.width+br*2;

    this.standImage.left -= this._saveLastBorder+br;
    this.standImage.top -= this._saveLastBorder+br;
    this.standImage.set({
      clipTo: (ctx) => {
        ctx.arc(0, 0, this.standImage.width/2, 0, Math.PI*2, true);
      }
    });
    this._saveLastBorder = br;
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
}

module.exports = RadialBar;
