let canvas = document.createElement('canvas');
let render = new fabric.Canvas('canvas');
let coverImage = new CoverImage();
render.setWidth(coverImage.coverWidth);
render.setHeight(coverImage.coverHeight);
render.add(coverImage);

module.exports = {
  render, coverImage
}
