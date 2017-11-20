<template>
  <div id="admin">
    <div class="fixed-wrap">
      <cover-control :renderer="renderer" :isCoverEmpty="isCoverEmpty"></cover-control>
      <div class="wrap-tabs">
        <ul id="menu" class="tabs">
          <li class="tab col s4"><a href="#widgets" class="active">Виджеты</a></li>
          <li class="tab col s4"><a href="#services">Сервисы</a></li>
          <li class="tab col s4"><a href="#edit">Изменить</a></li>
          <div class="indicator"></div>
        </ul>
        <a @click="uploadData" v-show="!currentObject" class="btn-upload-data btn-floating btn-large waves-effect waves-light">
          <i class="material-icons">cloud_upload</i>
        </a>
      </div>
    </div>
    <div class="views-wrap">
      <div id="widgets">
        <div class="controls-section">
          <p class="flow-text label">Добавить виджет:</p>
          <widgets-control @addWidget="addWidget"></widgets-control>
        </div>
      </div>
      <div id="services">
        <div class="controls-section">
          <services-control :services="services"></services-control>
        </div>
      </div>
      <div id="edit">
        <div class="controls-section">
          <p class="flow-text label" v-show="!currentObject">Выберите объект или сервис для изменения</p>
          <editors-control :renderer="renderer" :currentObject="currentObject"></editors-control>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');

  const Render = require('../../render/Render.js');
  const CoverControl = require('../controls/CoverControl.vue');
  const WidgetsControl = require('../controls/WidgetsControl.vue');
  const ServicesControl = require('../controls/ServicesControl.vue');
  const EditorsControl = require('../controls/EditorsControl.vue');


  module.exports = {
    components: {
      CoverControl,
      WidgetsControl,
      ServicesControl,
      EditorsControl
    },
    props: ['api'],
    data() {
      return {
        isCoverEmpty: true,
        currentObject: null,
        renderer: null,
        services: {
          "bitcoin": {
            "is_register": true,
            "name": "Биткоин-кошелек",
            "decrtiption": "Данный сервис позволит вам вести актуальную статистику по пожертвованиями на ваш bitcoin-кошелек.",
            "api_link": "https://bitok-donatelo.herokuapp.com",
            "inputs": {
              "bitcoin-adress": {
                "description": "Введите ваш биткоин-адрес.",
                "regexp": "([0-9|a-z|A_Z]){32,34}",
                "type": "str"
              }
            },
            "card_style": {
              "icon": "mic_none",
              "color": "red lightness-1"
            }
          },
          "a": {
            "is_register": false,
            "name": "Биткоин-кошелек",
            "decrtiption": "Данный сервис позволит вам вести актуальную статистику по пожертвованиями на ваш bitcoin-кошелек.",
            "api_link": "https://bitok-donatelo.herokuapp.com",
            "inputs": {
              "bitcoin-adress": {
                "description": "Введите ваш биткоин-адрес.",
                "regexp": "([0-9|a-z|A_Z]){32,34}",
                "type": "str"
              }
            },
            "card_style": {
              "icon": "mic_none",
              "color": "green lightness-1"
            }
          },
          "b": {
            "is_register": false,
            "name": "Биткоин-кошелек",
            "decrtiption": "Данный сервис позволит вам вести актуальную статистику по пожертвованиями на ваш bitcoin-кошелек.",
            "api_link": "https://bitok-donatelo.herokuapp.com",
            "inputs": {
              "bitcoin-adress": {
                "description": "Введите ваш биткоин-адрес.",
                "regexp": "([0-9|a-z|A_Z]){32,34}",
                "type": "str"
              }
            },
            "card_style": {
              "icon": "mic_none",
              "color": "blue lightness-1"
            }
          }
        }
      }
    },
    methods: {
      // API METHODS
      async loadData() {
        this.$emit('isLoad', true);
        let resp = await axios.post('https://app-donatelo.herokuapp.com/get_cover', {
          app_id: this.api.api_id,
          auth_token: this.api.auth_key,
          group_id: this.api.group_id,
          viewer_id: this.api.viewer_id
        });
        let data = resp.data.result;

        this.renderer.setCover(data.resources.background);
        for(let key in data.views) {
          let view = data.views[key];
          this.addWidget(view.type, view, data.resources);
        }
        this.renderer.canvas.trigger('selection:cleared');

        this.$emit('isLoad', false);
      },
      async uploadData() {
        let data = this.renderer.getJSON();
        this.$emit('isLoad', true);

        if(this.renderer.isEditCover || !this.$parent.isExist)
          data.resources.background = this.renderer.coverImage._element.src;


        console.log(data);

        try {
          let resp = await axios.post('https://app-donatelo.herokuapp.com/update_cover', {
            app_id: this.api.api_id,
            auth_token: this.api.auth_key,
            group_id: this.api.group_id,
            viewer_id: this.api.viewer_id,
            ...data
          });
          console.log(resp);

          if(resp.data.code == 'ok') {
            Materialize.toast('Обложка сохранена!', 1000);
            this.renderer.isEditCover = false;
            this.$parent.isExist = true;
          } else {
            Materialize.toast('Извините, произошла ошибка, попробуйте позже.', 1000);
          }
        } catch(e) {
          Materialize.toast('Извините, произошла ошибка, попробуйте позже.', 1000);
        }
        this.$emit('isLoad', false);
      },

      addWidget(type, data, res) {
        let widget = this.renderer.addWidget(type, data, res);

        widget.view.on('mousedown', () => {
          this.currentObject = widget;
          $('#menu').tabs('select_tab', 'edit');
        });
        widget.view.trigger('mousedown');
      },
    },
    mounted() {
      $('ul.tabs').tabs();
      this.renderer = new Render('playground', window.innerWidth, 300);
      this.renderer.canvas.on('selection:cleared', () => {
        this.currentObject = null;
        $('#menu').tabs('select_tab', 'widgets');
      });

      if(this.$parent.isExist) {
        this.loadData();
        this.isCoverEmpty = false;
      } else {
        let covers = this.api.api_result.response[0].cover.images;
        if(covers.length) {
          this.isCoverEmpty = false;
          this.renderer.setCover(covers[covers.length-1].url);
        }
      }
    }
  }
</script>

<style scoped>
  .fixed-wrap {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 10000;
  }
  .btn-upload-data {
    position: absolute;
    top: -31px;
    z-index: 100000;
    right: 20px;
    width: 60px;
    background: #6e7bab;
    height: 60px;
  }
  .btn-upload-data i {
    line-height: 62px;
    font-size: 35px;
  }
  .views-wrap {
    margin-top: 348px;
  }
  .controls-section {
    position: relative;
    padding: 1em 1em 0;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
  }
  .wrap-tabs {
    z-index: 100000;
    background: #fff;
    position: relative;
    width: 100vw;
    height: 48px;
  }
  .tabs {
    width: 50%;
    position: absolute;
    left: 0;
  }
  .tab a {
    color: #6e7bab !important;
  }
  .tab a.active {
    color: #6e7bab !important;
  }
  .tabs .indicator {
    background-color: #6e7bab !important;
  }
</style>
