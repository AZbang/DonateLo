fabric.Canvas.prototype.getItemsByAttr = function(attr, name) {
  let result = [];
  let objects = this.getObjects();

  for(let i = 0, len = this.size(); i < len; i++) {
    if(objects[i][attr] && objects[i][attr] === name) {
      result.push(objects[i]);
    }
  }
  return result;
};

fabric.Object.prototype.setOriginToCenter = function() {
  this._originalOriginX = this.originX;
  this._originalOriginY = this.originY;

  let center = this.getCenterPoint();

  this.set({
    originX: 'center',
    originY: 'center',
    left: center.x,
    top: center.y
  });
};

fabric.Object.prototype.setCenterToOrigin = function() {
  let originPoint = this.translateToOriginPoint(
  this.getCenterPoint(),
  this._originalOriginX,
  this._originalOriginY);

  this.set({
    originX: this._originalOriginX,
    originY: this._originalOriginY,
    left: originPoint.x,
    top: originPoint.y
  });
};
