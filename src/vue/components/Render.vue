<template>
  <div style="height: inherit;">
    <canvas id="playground"></canvas>
  </div>
</template>

<script>
  const { mapState } = require('vuex');
  const Render = require('../../render');

  module.exports = {
    computed: mapState([
      'cover',
      'varibles',
      'widgets',
      'resources'
    ]),
    watch() {
      cover(img) {
        this.render.setCover(img);
      }
      varibles(vars) {
        this.render.updateVaribles(vars);
      }
      widgets(widgets) {
        this.render.updateWidgets(widgets);
      }
      resources(res) {
        this.render.updateResouces(res);
      }
    },
    mounted() {
      this.render = new Render('playground');
    }
  }
</script>
