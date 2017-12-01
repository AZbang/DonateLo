<template>
  <div id="admin">
    <cover-control></cover-control>
    <div class="fixed-wrap">
      <el-menu :default-active="'widgets'" class="el-menu-demo" mode="horizontal" @select="setControl">
        <el-menu-item index="widgets">Виджеты</el-menu-item>
        <el-menu-item index="services">Сервисы</el-menu-item>
        <el-menu-item index="controls">Настройки</el-menu-item>
      </el-menu>
    </div>
    <div :is="control"></div>
  </div>
</template>

<script>
  const CoverControl = require('../controls/CoverControl.vue');
  // const WidgetsControl = require('../controls/WidgetsControl.vue');
  // const ServicesControl = require('../controls/ServicesControl.vue');
  // const EditorsControl = require('../controls/EditorsControl.vue');
  // const SettingsControl = require('../controls/SettingsControl.vue');
  const helper = require('../../helper.js');

  module.exports = {
    components: {
      CoverControl
    },
    methods: {
      setControl(name) {
        console.log(name);
      },
      // API METHODS
      loadGroup() {
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
      
      // this.renderer = new Render('playground', w, 300);
      // this.renderer.canvas.on('selection:cleared', () => {
      //   this.currentObject = null;
      //   $('#menu').tabs('select_tab', 'widgets');
      // });
      //
      // $('ul.tabs').tabs();
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
