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
    this.canvas.setWidth(1590);
    this.canvas.setHeight(400);

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
    widget.view.setOriginToCenter();
    widget.view.top -= widget.view.height/2;
    widget.view.left -= widget.view.width/2;

    this.widgets.push(widget);
    this.canvas.add(widget.view);
    this.canvas.renderAll();

    return widget;
  }
  removeWidget(id) {
    this.widgets.forEach((w, i) => {
      if(w.id == id) {
        this.canvas.remove(w.view);
        this.widgets.splice(i, 1);
      }
    });
  }
  getJSON() {
    let resources = {};
    let views = [];

    this.widgets.forEach((i) => {
      let data = i.getJSON();
      resources = {...resources, ...data.images};
      views.push(data.data);
    });
    console.log({resources, views})
    return {resources, views};
  }
  resizeCoverToHeight() {
    // let scale = this.height/this.coverHeight;
    // $('.canvas-container').css({
    //   'transform': 'scale(' + scale + ')',
    //   'margin-top': -this.coverHeight/4 + 'px',
    //   'margin-left': -this.coverWidth/4 + 'px'
    // });
    // $('#cover-control').css('height', this.coverHeight-48 + 'px');
    // $('.views-wrap').css('margin-top', '300px');
  }
  resizeCoverToWidth() {
    let scale = this.width/this.coverWidth;
    $('.canvas-container').css({
      'transform': 'scale(' + scale + ')',
      'margin-top': -this.coverHeight/4 + 'px',
      'margin-left': -this.coverWidth/4 + 'px'
    });
    $('#cover-control').css('height', this.height + 'px');
    $('.views-wrap').css('margin-top', '248px');
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
  zoomCanvas(factor) {
    this.canvas.setHeight(this.canvas.getHeight() * factor);
    this.canvas.setWidth(this.canvas.getWidth() * factor);
    // if(this.canvas.backgroundImage) {
    //     // Need to scale background images as well
    //     var bi = canvas.backgroundImage;
    //     bi.width = bi.width * factor; bi.height = bi.height * factor;
    // }
    var objects = this.canvas.getObjects();
    var tcounter = 0;

    for (var i in objects) {
        tcounter++;
        //alert(tcounter);
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * factor;
        var tempScaleY = scaleY * factor;
        var tempLeft = left * factor;
        var tempTop = top * factor;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }
    this.canvas.renderAll();
    this.canvas.calcOffset();
  }
  setCover(src) {
    let img = new Image();
    img.onload = () => {
      this.coverImage.setElement(img);
      this.coverImage.setWidth(this.coverWidth);
      this.coverImage.setHeight(this.coverHeight);

      this.resizeCoverToWidth();
      this.canvas.renderAll();
    }
    img.src = src;
  }
}

module.exports = Render;
