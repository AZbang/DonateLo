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
    <div :is="viewControl"></div>
  </div>
</template>

<script>
  const CONTROLS = {
    widgets: require('../controls/WidgetsControl.vue'),
    // services: require('../controls/ServicesControl.vue'),
    // widgetEditor: require('../controls/widgetEditorControl.vue'),
    // serviceEditor: require('../controls/serviceEditorControl.vue'),
    // settings: require('../controls/SettingsControl.vue')
  }

  const CoverControl = require('../controls/CoverControl.vue');
  const helper = require('../../helper.js');

  module.exports = {
    components: {
      CoverControl
    },
    computed: {
      nameControl() {
        return this.$store.state.currentControl;
      },
      viewControl() {
        return CONTROLS[this.nameControl];
      }
    },
    methods: {
      setControl(view) {
        this.$store.commit('setControl', view);
      },
    },
    mounted() {
      VK.External.resizeWindow(window.screen.availWidth-200, Math.max(660, window.screen.availHeight-300));
      let w = helper.isMobile() ? window.innerWidth : Math.min(window.screen.availWidth-200, 1000);
    }
  }
</script>
