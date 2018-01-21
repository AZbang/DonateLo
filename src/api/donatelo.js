// Библиотека для работы с Donatelo APP API

const axios = require('axios');
const utils = require('./utils');
const DONATELO_API = 'https://app-donatelo.herokuapp.com';

module.exports = {
  get apiUrl() {
    return DONATELO_API;
  },

  // Возращает bool проверку на существование группы в базе донателло
  async isGroupExist(groupID) {
    let resp = await axios.post(DONATELO_API + '/group_exist', {
      group_id: groupID
    });
    return resp.data.result;
  },

  // Регистрирует группу в базу донателло, нужен токен
  async createGroup(groupID, token) {
    let resp = await axios.post(DONATELO_API + '/create_group', {
      group_id: groupID,
      access_token: token
    });
    return resp.data.result;
  },

  // Изменяет API токен для взаимодействия с группой
  async editToken(groupID, token) {
    let resp = await axios.post(DONATELO_API + '/edit_token', {
      group_id: groupID,
      access_token: token
    });
    return resp.data.result;
  },

  // Получает объект данных для обложки группы
  async getViews(groupID) {
    let resp = await axios.post(DONATELO_API + '/get_views', {
      group_id: groupID
    });
    // Загружаем ресурсы в <img>
    let data = resp.data.result;
    data.resources = await utils.loadResources(data.resources);

    return data;
  },

  // Обновляет данные обложки группы
  async updateViews(groupID, data) {
    let resp = await axios.post(DONATELO_API + '/update_views', {
      group_id: groupID,
      ...data
    });
    return resp.data.result;
  },

  // Загружает переменные сервисов
  async loadVaribles(groupID) {
    let resp = await axios.post(DONATELO_API + '/get_enviroment', {
      group_id: groupID
    });
    return resp.data.result;
  },

  // Обновляет данные для сервиса
  async updateService(groupID, id, form) {
    let resp = await axios.post(DONATELO_API + '/update_service', {
      group_id: groupID,
      service_id: id,
      fields: form
    });
    return resp.data.result;
  }
}
