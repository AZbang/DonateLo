<template>
  <render>
    <cover-image></cover-image>
    <widget v-for="widget in widgets" v-bind="widget"></widget>
  </render>
</template>

<script>
  const Widget = require('../../widgets/Widget');

  module.exports = {
    data() {
      return {
        render: new Render('playground', this.$store.state)
      }
    },
    computed: {
      widgets() {
        return this.$store.state.widgets;
      }
    },
    methods: {
      resizeToWidth() {
        this.setWidth(this.coverImage.coverWidth);
        this.setHeight(this.coverImage.coverHeight);

        let scale = this.width/this.coverImage.coverWidth;
        this.wrapperEl.style.transform = 'scale(' + scale + ')';
        this.wrapperEl.style.transformOrigin = '0 0';
        document.getElementById('cover-control').style.height = this.coverImage.coverHeight*scale + 'px';
      }
    },
    mounted() {
      this.$refs.wrapRender.appendChild(this.render.wrapperEl);
    }
  }
</script>
