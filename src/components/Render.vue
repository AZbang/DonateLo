<template lang="html">
  <div style="height: inherit;" >
    <canvas id="playground"></canvas>
  </div>
</template>

<script>
  module.exports = {
    watch: {
      removedView(view) {
        this.render.removeView(views);
      },
      addedView(view) {
        this.render.addViews(views);
      },
      setViews(views) {
        this.render.setViews(views);
      },
      varibles() {

      }
    },
    mounted() {
      this.render = new Render('playground');
    }
  }
</script>

<style lang="css">
</style>
