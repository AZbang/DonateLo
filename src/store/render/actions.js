const helper = require('../../helper');

module.exports = {
  // Генерируем из объекта ресурсов {id: 'url', ...} объект {id: <img src='url'>, ...}
  loadResources({commit}, res) {
    // Список промисов
    let imgs = [];
    for(let key in res) imgs.push(helper.loadImage(key, res[key]));

    // Ждем загрузки всех картинок и генерируем объект ресурсов
    return Promise.all(imgs).then((imgs) => {
      imgs.forEach((img) => res[img.id] = img);
      commit('addResources', res);
    })
  }
}
