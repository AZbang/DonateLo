<template>
  <editor-forms>
    <div class="input-field col s4">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" value="100%">
      </div>
    </div>
    <div class="input-field col s4">
      <p class="flow-text">Стартовый угол:</p>
      <div class="input-wrap">
        <input class="input" value="0">
      </div>
    </div>
    <div class="input-field col s4">
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
    <div class="input-field col s12">
      <p class="flow-text">Рамка:</p>
      <br>
      <color-picker></color-picker>
    </div>
  </editor-forms>
</template>

<script>
  const ColorPicker = require('../helpers/ColorPicker.vue');
  const EditorForms = require('../helpers/EditorForms.vue');

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
