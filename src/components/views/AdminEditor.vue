<template>
  <div id="admin">
    <div class="fixed-wrap">
      <cover-control :renderer="renderer" :isCoverEmpty="isCoverEmpty"></cover-control>
      <div class="wrap-menu">
        <ul id="menu" class="tabs">
          <li class="tab col s4"><a href="#widgets" class="active">Виджеты</a></li>
          <li class="tab col s4"><a href="#services">Сервисы</a></li>
          <li class="tab col s4" style="display: none;"><a href="#edit">Изменить</a></li>
          <div class="indicator"></div>
        </ul>
      </div>
    </div>
    <div class="views-wrap">
      <div id="widgets">
        <div class="controls-section">
          <p class="flow-text label">Добавить виджет:</p>
          <widgets-control @addWidget="addWidget"></widgets-control>
        </div>
        <a @click="uploadData" class="fixed-btns btn-upload-data btn-floating btn-large waves-effect waves-light">
          <i class="material-icons">cloud_upload</i>
        </a>
      </div>
      <div id="services">
        <div class="controls-section">
          <services-control @toggleService="toggleService" @updateService="updateService" :services="services"></services-control>
        </div>
        <a @click="uploadData" class="fixed-btns btn-upload-data btn-floating btn-large waves-effect waves-light">
          <i class="material-icons">cloud_upload</i>
        </a>
      </div>
      <div id="edit">
        <div class="controls-section">
          <p class="flow-text label" v-show="!currentObject">Выберите объект или сервис для изменения</p>
          <editors-control :varibles="varibles" :renderer="renderer" :currentObject="currentObject"></editors-control>
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
        services: {},
        varibles: {}
      }
    },
    methods: {
      // API METHODS
      async loadData() {
        this.$emit('isLoad', true);
        let resp = await axios.post('https://app-donatelo.herokuapp.com/get_group', {group_id: this.api.group_id});
        let data = resp.data.result;
        if(resp.data.code == 'ok') {
          this.isCoverEmpty = false;

          this.services = data.services;
          for(let key in this.services) {
            for(let input in this.services[key].inputs) {
              this.services[key].inputs[input].value = '';
            }
          }
          this.varibles = data.enviroment;
          this.renderer.setVaribles(this.varibles);
          this.renderer.setCover(data.resources.background);
          for(let key in data.views) {
            let view = data.views[key];
            this.addWidget(view.type, view, data.resources);
          }
          this.renderer.canvas.trigger('selection:cleared');
          this.$emit('isLoad', false);
        } else this.isCoverEmpty = true;
      },
      async uploadData() {
        let data = this.renderer.getJSON();
        this.$emit('isLoad', true);

        if(this.renderer.isEditCover || !this.$parent.isExist)
          data.resources.background = this.renderer.coverImage._element.src;

        try {
          let resp = await axios.post('https://app-donatelo.herokuapp.com/update_cover', {
            group_id: this.api.group_id,
            ...data
          });

          if(resp.data.code == 'ok') {
            Materialize.toast('Обложка сохранена!', 1000);
            this.renderer.isEditCover = false;
            this.$parent.isExist = true;
          } else {
            console.log(resp.data);
            Materialize.toast('Извините, произошла ошибка, попробуйте позже.', 1000);
          }
        } catch(err) {
          console.log(err);
          Materialize.toast('Извините, произошла ошибка, попробуйте позже.', 1000);
        }
        this.$emit('isLoad', false);
      },
      async loadVaribles() {
        let resp = await axios.post('https://app-donatelo.herokuapp.com/get_enviroment', {group_id: this.api.group_id});
        if(resp.data.code === 'ok') {
          this.varibles = resp.data.result;
          this.renderer.setVaribles(this.varibles);
        }
      },
      async toggleService(id, isActive) {
        let resp = await axios.post('https://app-donatelo.herokuapp.com/activate_service', {
          group_id: this.api.group_id,
          service_id: id,
          activation: isActive
        });
        return resp.data.code === 'ok';
      },
      async updateService(id, form) {
        let resp = await axios.post('https://app-donatelo.herokuapp.com/update_service', {
          group_id: this.api.group_id,
          service_id: id,
          fields: form
        });
        await this.loadVaribles();
        return resp.data.code === 'ok';
      },

      setCoverFromVK() {
        this.isCoverEmpty = true;
        this.$emit('isLoad', false);
        let covers =  this.api.api_result.response[0].cover.images;
        if(covers && covers.length) {
          this.isCoverEmpty = false;
          this.renderer.setCover(covers[covers.length-1].url);
        }
      },
      addWidget(type, data, res) {
        let widget = this.renderer.addWidget(type, data, res);

        widget.view.on('mousedown', () => {
          this.currentObject = widget;
          $('#menu').tabs('select_tab', 'edit');
        });
        widget.view.trigger('mousedown');
        this.isCoverEmpty = false;
      },
    },
    mounted() {
      VK.External.resizeWindow(window.screen.availWidth-200, Math.max(660, window.screen.availHeight-300));

      let w = mobilecheck() ? window.innerWidth : Math.min(window.screen.availWidth-200, 1000);

      $('ul.tabs').tabs();
      this.renderer = new Render('playground', w, 300);
      this.renderer.canvas.on('selection:cleared', () => {
        this.currentObject = null;
        $('#menu').tabs('select_tab', 'widgets');
      });

      if(this.$parent.isExist) {
        this.loadData();
      }
    }
  }
</script>

<style scoped>
  .wrap-menu {
    position: relative;
    width: 100%;
    height: 48px;
    background: #fff;
  }
  .tabs {
    width: 70%;
    position: absolute;
    left: 0;
    top: 0;
  }
  #admin {
    background-color: #edeef0;
  }
  .btn-upload-data {
    position: absolute;
    bottom: 20px;
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
    height: 70vh;
    overflow-y: scroll;
  }
  .controls-section {
    position: relative;
    padding: 1em 1em 0;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
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
