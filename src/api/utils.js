// Модуль для утилитарных задач

module.exports = {
  // Генерируем img
  loadResource(id, url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
      img.id = id;
    })
  }
  // Генерируем из объекта ресурсов {id: 'url', ...} объект {id: <img src='url'>, ...}
  loadResources(res) {
    // Список промисов
    let imgs = [];
    for(let key in res) {
      imgs.push(loadResource(key, res[key]));
    }

    return Promise.all(imgs)
      .then((imgs) => {
        // Генерируем объек картинок
        imgs.forEach((img) => {
          res[img.id] = img;
        })
        return res;
      })
  }
}
