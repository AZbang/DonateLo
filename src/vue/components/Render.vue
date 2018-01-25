<template>
  <div style="height: inherit;">
    <div ref="wrapRender" :varibles="varibles" :widgets="widgets" :resources="resources"></div>
  </div>
</template>

<script>
  const Render = require('../../render');

  module.exports = {
    data() {
      return {
        render: new Render('playground')
      }
    },
    computed: {
      widgets() {
        return this.render.updateWidgets(this.$store.state.render.widgets);
      },
      // varibles() {
      //   return this.render.updateVaribles(this.$store.state.render.varibles);
      // },
      resources() {
        return this.render.updateResouces(this.$store.state.render.resources);
      }
    },
    mounted() {
      console.log(this.$refs);
      this.$refs.wrapRender.appendChild(this.render.wrapperEl);
    }
  }
</script>
