class CoverImage extends fabric.Image {
  constructor(render) {
    super();
    this.render = render;
    this.coverWidth = 1590;
    this.coverHeight = 400;
    this.set('selectable', false);
  }
  resizeToWidth() {
    let scale = this.render.width/this.coverWidth;
    let container = document.getElementsByClassName('canvas-container')[0];
    container.style.transform = 'scale(' + scale + ')';
    container.style.transformOrigin = '0 0';
    document.getElementById('cover-control').style.height = this.coverHeight*scale + 'px';
  }
  loadTexture(img) {
    let texture = new fabric.Image();

    texture.setElement(img);
    let scale = this.coverWidth/texture.getWidth();
    let w = this.coverWidth/scale;
    let h = this.coverHeight/scale;

    let coverSrc = texture.toDataURL({
      left: texture.getWidth()/2-w/2,
      top:  texture.getHeight()/2-h/2,
      width: w,
      height: h
    });

    return coverSrc;
  }
  setCover(img) {
    let texture = await this.loadTexture(img);
    let cover = new Image();
    cover.crossOrigin = 'anonymous';
    cover.src = texture;

    this.setElement(cover);
    this.setWidth(this.coverWidth);
    this.setHeight(this.coverHeight);
    this.resizeToWidth();
    this.render.renderAll();
  }
}

module.exports = CoverImage;
