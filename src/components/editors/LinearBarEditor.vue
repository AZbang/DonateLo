<template>
  <editor-forms>
    <div class="input-field col s12 m6">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" value="100%">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Скругление:</p>
      <div class="input-wrap">
        <input class="input" value="5%">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" value="10px">
      </div>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Цвет прогресс линии:</p>
      <br>
      <color-picker></color-picker>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Задний фон:</p>
      <br>
      <color-picker></color-picker>
    </div>
  </editor-forms>
</template>

<script>
  const EditorForms = require('../helpers/EditorForms.vue');
  const ColorPicker = require('../helpers/ColorPicker.vue');

  module.exports = {
    components: {
      ColorPicker,
      EditorForms
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
    padding: .5em 1em;
  }
  .input {
    margin: 0;
    border: none;
    font-size: 1.5em;
    font-weight: 300;
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
