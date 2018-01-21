<template>
  <div class="admin">
    <cover-control class="admin__cover"></cover-control>
    <div class="admin__menu">
      <el-menu :default-active="sectionName" class="el-menu-demo" mode="horizontal" @select="setControl">
        <el-menu-item index="WIDGETS">Виджеты</el-menu-item>
        <el-menu-item index="SERVICES">Сервисы</el-menu-item>
        <el-menu-item index="SETTINGS">Настройки</el-menu-item>
      </el-menu>
    </div>
    <div class="admin__section">
      <el-button class="admin__save" type="primary" @click="updateViews">Сохранить обложку</el-button>
      <div :is="currentSection"></div>
    </div>
  </div>
</template>

<script>
  const CoverControl = require('../components/CoverControl.vue');

  module.exports = {
    components: {
      CoverControl
    },
    computed: {
      sectionName() {
        return this.$store.state.sectionName;
      },
      currentSection() {
        return this.$store.getters.section;
      }
    },
    methods: {
      setControl(view) {
        this.$store.commit('setSection', view);
      },
      updateViews() {
        this.$store.dispatch('updateViews');
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
