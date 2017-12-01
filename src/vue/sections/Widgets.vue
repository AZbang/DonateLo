<template >
  <div id="widgets" class="widgets-container">
    <p class="text">Добавить виджет:</p>
    <el-row :gutter="10">
      <el-col class="widgets-container__col" :span="6" v-for="widget in widgets">
        <div class="widget-card" @click="addWidget(widget.type)" :class="widget.disable && 'widget-card--disable'">
          <div class="widget-card__content">
            <i class="widget-card__icon" :class="widget.icon"></i>
            <p>{{widget.label}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      widgets() {
        return this.$store.state.widgets;
      }
    },
    methods: {
      addWidget(type) {
        this.$store.dispatch('addWidget', {type});
      }
    }
  }
</script>
