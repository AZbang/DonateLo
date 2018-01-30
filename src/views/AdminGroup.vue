<template>
  <div class="admin">
    <cover-control class="admin__cover"></cover-control>
    <el-menu :default-active="sectionName" class="admin__menu" mode="horizontal" @select="setControl">
      <el-menu-item index="WIDGETS">Виджеты</el-menu-item>
      <el-menu-item index="SERVICES">Сервисы</el-menu-item>
      <el-menu-item index="SETTINGS">Настройки</el-menu-item>
    </el-menu>
    <div class="admin__section">
      <el-button class="admin__save" type="primary" @click="updateWidgets">Сохранить обложку</el-button>
      <div :is="section"></div>
    </div>
  </div>
</template>

<script>
  const CoverControl = require('../components/CoverControl.vue');
  const SECTIONS = require('../sections');

  module.exports = {
    components: {
      CoverControl
    },
    computed: {
      sectionName() {
        return this.$store.state.section;
      },
      section() {
        return SECTIONS[this.$store.state.section];
      }
    },
    methods: {
      setControl(view) {
        this.$store.commit('setSection', view);
      },
      updateWidgets() {
        this.$store.dispatch('updateWidgets');
      }
    },
    mounted() {
      this.$store.dispatch('loadGroup');
      setInterval(() => {
        this.$store.dispatch('loadVaribles');
      }, 1000);
    }
  }
</script>
