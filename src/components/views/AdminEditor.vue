<template>
  <div id="admin">
    <div class="fixed-wrap">
      <cover-control :renderer="renderer" :isCoverEmpty="isCoverEmpty"></cover-control>
      <div class="wrap-menu">
        <ul id="menu" class="tabs">
          <li class="tab col s4"><a href="#widgets" class="active">Виджеты</a></li>
          <li class="tab col s4"><a href="#services">Сервисы</a></li>
          <li class="tab col s4 hide-on-small-only"><a href="#settings">Настройки</a></li>
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
      <div id="settings">
        <div class="controls-section">
          <settings-control @updateToken="updateToken"></settings-control>
        </div>
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
  const SettingsControl = require('../controls/SettingsControl.vue');

  module.exports = {
    components: {
      CoverControl,
      WidgetsControl,
      ServicesControl,
      EditorsControl,
      SettingsControl
    },
    props: ['api'],
    data() {
      return {
        isCoverEmpty: true,
        currentObject: null,
        renderer: null
      }
    },
    methods: {
      // API METHODS
      async loadGroup() {
        this.renderer.setVaribles(this.varibles);

        if(data.resources.background) {
          this.isCoverEmpty = false;
          this.renderer.setCover(data.resources.background);
        }

        for(let key in data.views) {
          let view = data.views[key];
          this.addWidget(view.type, view, data.resources);
        }
        this.renderer.canvas.trigger('selection:cleared');
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
      let w = helper.isMobile() ? window.innerWidth : Math.min(window.screen.availWidth-200, 1000);

      this.renderer = new Render('playground', w, 300);
      this.renderer.canvas.on('selection:cleared', () => {
        this.currentObject = null;
        $('#menu').tabs('select_tab', 'widgets');
      });

      $('ul.tabs').tabs();
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
  a.fixed-btns {
    position: fixed;
    bottom: 20px;
    z-index: 100000;
    right: 20px;
    width: 60px;
    background: #6e7bab;
    height: 60px;
  }
  a.fixed-btns i {
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
