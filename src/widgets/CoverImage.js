class CoverImage extends fabric.Image {
  constructor(render) {
    super();
    this.render = render;
    this.coverWidth = 1590;
    this.coverHeight = 400;
    this.set('selectable', false);
  }
  generateCover(img) {
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
  async setCover(img) {
    let texture = await this.generateCover(img);
    let cover = new Image();
    cover.crossOrigin = 'anonymous';
    cover.src = texture;

    this.setElement(cover);
    this.setWidth(this.coverWidth);
    this.setHeight(this.coverHeight);
    this.render.renderAll();
  }
}

module.exports = CoverImage;
