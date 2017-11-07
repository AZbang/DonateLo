<template>
  <div class="row">
    <div class="input-field col s6">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" value="https://getimage.com/image">
      </div>
    </div>
    <div class="input-field col s3">
      <p class="flow-text">Скругление:</p>
      <div class="input-wrap">
        <input class="input" value="5%">
      </div>
    </div>
    <div class="input-field col s3">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" value="10px">
      </div>
    </div>

    <div class="input-field col s12">
      <p class="flow-text">Рамка:</p>
      <br>
      <color-picker></color-picker>
    </div>

    <div class="fixed-bottom">
      <div class="col s6">
        <button class="btn delete-btn waves-effect btn-flat red lighten-1">Удалить</button>
      </div>
      <div class="col s6">
        <button class="btn okey-btn waves-effect btn-flat green lighten-1">Вернуться</button>
      </div>
    </div>
  </div>
</template>

<script>
  const ColorPicker = require('./ColorPicker.vue');

  module.exports = {
    components: {
      ColorPicker
    },
    methods: {
      setColor(color) {

      }
    }
  }
</script>

<style scoped>
  .row {
    margin-bottom: 100px;
  }
  .input-field {
    margin-bottom: 1em;
  }
  .input-wrap {
    background-color: #f9f9f9;
    border-radius: 3px;
    padding: 15px;
  }
  .input {
    margin: 0;
    border: none;
    font-size: 2em;
    font-weight: 200;
  }
  textarea.input {
    resize: vertical;
    min-height: 100px;
  }
  .input:focus {
    border-bottom: none !important;
    box-shadow: none !important;
    outline: none;
  }
  p {
    font-size: 1.5em;
    margin: 0 0 5px;
    color: #6e7bbe;
    font-family: Roboto Light;
  }
  .btn-icon {
    font-size: 3rem;
    margin-top: 38px;
    background-color: #f9f9f9;
    padding: 13px 10px;
    cursor: pointer;
    color: #6e7bbe;
    float: right;
  }
  .btn-icon.active {
    color: #9d7bc4;
  }
  .btn-icon:hover {
    color: #9d7bc4;
  }
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px 0;
    background-color: #fff;
    z-index: 1000;
  }
  .btn {
    color: #fff;
    height: 100%;
    width: 100%;
  }
</style>
