<template >
  <div id="widgets">
    <div class="row">
      <div class="col s6 m3">
        <div class="card-panel hoverable" @click="addWidget('text')">
          <div class="wrap-card-content">
            <i class="material-icons">text_format</i>
            <p>Текст</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable" @click="addWidget('linear')">
          <div class="wrap-card-content">
            <i class="material-icons">format_align_left</i>
            <p>Линейный бар</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable" @click="addWidget('radial')">
          <div class="wrap-card-content">
            <i class="material-icons">panorama_fish_eye</i>
            <p>Радиальный бар</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable" @click="addWidget('image')">
          <div class="wrap-card-content">
            <i class="material-icons">image</i>
            <p>Картинка</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      addWidget(type) {
        this.$emit('addWidget', type);
      }
    }
  }
</script>


<style scoped>
  .col {
    padding: 0 5px;
    border-radius: 10px;
  }
  .card-panel {
    position: relative;
    margin-bottom: 2px;
  }
  .wrap-card-content {
    background: -webkit-linear-gradient(#5e81a8, #b660bb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .card-panel {
    border-radius: 7px;
    cursor: pointer;
    height: 150px;
    text-align: center;
    background: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 5px 0 rgba(0, 0, 0, 0), 0 3px 1px -2px rgba(0, 0, 0, 0.05);
  }
  .card-panel i {
    background: -webkit-linear-gradient(#5e81a8, #b660bb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3em;
  }
</style>
