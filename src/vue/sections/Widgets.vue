<template>
  <div class="widgets">
    <p class="text">Добавить виджет:</p>
    <el-row :gutter="10">
      <el-col class="widgets__col" :span="6" v-for="widget in widgets">
        <div class="widget-card" @click="addWidget(widget.type)" :class="widget.disable && 'widget-card--disable'">
          <div class="widget-card__content">
            <i class="widget-card__icon material-icons">{{widget.icon}}</i>
            <p class="widget-card__text">{{widget.label}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const WIDGETS = require('./widgets.json');
  module.exports = {
    computed: {
      widgets() {
        return WIDGETS;
      }
    },
    methods: {
      addWidget(type) {
        this.$store.dispatch('addWidget', {type});
      }
    }
  }
</script>
