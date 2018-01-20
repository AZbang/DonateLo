<template lang="html">
  <div style="height: inherit;" >
    <canvas id="playground"></canvas>
  </div>
</template>

<script>
  module.exports = {
    mounted() {
      this.render = new Render('playground');
    }
  }
</script>

<style lang="css">
</style>
