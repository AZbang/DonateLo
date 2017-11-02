fabric.Canvas.prototype.getItemsByAttr = (attr, name) => {
  let result = [];
  let objects = canvas.getObjects();

  for(let i = 0, len = canvas.size(); i < len; i++) {
    if(objects[i][attr] && objects[i][attr] === name) {
      result.push(object[i]);
    }
  }
  return result;
};
