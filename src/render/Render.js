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

    this.coverWidth = 1590;
    this.coverHeight = 400;

    this.canvas = new fabric.Canvas(id);
    this.canvas.setWidth(this.coverWidth);
    this.canvas.setHeight(this.coverHeight);

    this.coverImage = new fabric.Image();
    this.coverImage.set('selectable', false);
    this.canvas.add(this.coverImage);

    this.isEditCover = false;
    this.widgets = [];

    this.varibles = {};
  }
  getValueFromVarible(id) {
    return this.varibles[id] || '';
  }
  setVaribles(varibles) {
    this.varibles = varibles;
    this.widgets.forEach((w) => {
      if(w.type === 'text') w.setValue(w.value);
      else w.setVarible(w.varible);
    });
  }
  addWidget(type, data={}, res={}) {
    let widget = new WIDGETS[type](this, data, res);
    // widget.view.top += widget.view.height/
    widget.view.objectCaching = false;
    widget.view.selectable = true;
    widget.view.padding = 0;
    widget.view.cornerSize = 16;
    widget.view.borderColor = '#6e7bab';
    widget.view.cornerColor = '#6e7bab';
    widget.view.cornerStrokeColor = '#6e7bab';
    widget.view.transparentCorners = false;

    // this.canvas.setActiveObject(widget.view);
    this.widgets.push(widget);
    this.canvas.add(widget.view);
    this.canvas.renderAll();

    widget.view.on({
      scaling: function(e) {
        let obj = this,
            w = obj.width * obj.scaleX,
            h = obj.height * obj.scaleY,
            s = obj.strokeWidth;
        obj.set({
          scaleX: 1,
          scaleY: 1
        });
        if(widget.setSize) widget.setSize(w);
        else {
          widget.setWidth(w);
          widget.setHeight(h);
        }
      }
    });

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
      'transform-origin': '0 0'
    });
    $('#cover-control').css('height', this.coverHeight*scale + 'px');
    $('.views-wrap').css('height', window.innerHeight - (this.coverHeight*scale+48) + 'px');
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

      this.isEditCover = true;
      this.setCover(coverSrc);
    });
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
