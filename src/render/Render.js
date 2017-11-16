const WIDGETS = {
  'text': require('./Text'),
  'linear': require('./LinearBar'),
  'radial': require('./RadialBar'),
  'image': require('./Image')
}

class Render {
  constructor(id, w, h) {
    this.width = w;
    this.height = h;
    this.scale = 1;

    this.canvas = new fabric.Canvas(id);
    this.canvas.setWidth(this.width);
    this.canvas.setHeight(this.height);

    this.coverWidth = 1590;
    this.coverHeight = 400;
    this.coverImage = new fabric.Image();
    this.coverImage.set('selectable', false);
    this.canvas.add(this.coverImage);

    this.objectsScale = 1;

    this.widgets = [];
  }
  addWidget(type, data={}, res={}) {
    let widget = new WIDGETS[type](this, data, res);
    widget.view.objectCaching = false;
    widget.view.selectable = true;
    widget.view.scale(this.objectsScale);
    widget.view.setOriginToCenter();

    this.widgets.push(widget);
    this.canvas.add(widget.view);
    this.canvas.renderAll();
    this.canvas.setActiveObject(widget.view);

    return widget;
  }
  getJSON() {
    let resources = {};
    let views = [];

    let _scale = this.objectsScale;
    this.setScaleObjects(1);

    this.widgets.forEach((i) => {
      let data = i.getJSON();
      resources = {...resources, ...data.images};
      views.push(data.data);
    });
    this.setScaleObjects(_scale);

    console.log({resources, views})
    return {resources, views};
  }
  setScaleObjects(scale) {
    this.objectsScale = scale;
    this.widgets.forEach((i) => {
      i.view.scale(scale);
    });
  }
  resizeCoverToHeight() {
    let size = this.coverImage.getOriginalSize();
    let scale = this.height/size.height;
    this.coverImage.scale(scale);
    this.coverImage.left = this.width/2-size.width*scale/2;
    this.canvas.setHeight(this.height);
    this.setScaleObjects(this.height/this.coverHeight);
    this.canvas.renderAll();

    $('.views-wrap').css('margin-top', '348px');
  }
  resizeCoverToWidth() {
    let size = this.coverImage.getOriginalSize();
    let scale = this.width/size.width;
    this.coverImage.scale(scale);
    this.coverImage.left = 0;
    this.canvas.setHeight(size.height*scale);
    this.setScaleObjects(this.width/this.coverWidth);
    this.canvas.renderAll();

    $('.views-wrap').css('margin-top', '230px');
  }
  toggleSize(isFull) {
    if(isFull) this.resizeCoverToWidth();
    else this.resizeCoverToHeight();
  }
  uploadImage(base64) {
    fabric.Image.fromURL(base64, (texture) => {
      let scale = this.coverWidth/texture.getWidth();
      let w = this.coverWidth/scale;
      let h = this.coverHeight/scale;

      let coverSrc = texture.toDataURL({
        left: texture.getWidth()/2-w/2,
        top:  texture.getHeight()/2-h/2,
        width: w,
        height: h
      });

      this.setCover(coverSrc);
    });
  }
  setCover(src) {
    let img = new Image();
    img.onload = () => {
      this.coverImage.setElement(img);
      this.resizeCoverToWidth();
      this.canvas.renderAll();
    }
    img.src = src;
  }
}

module.exports = Render;
