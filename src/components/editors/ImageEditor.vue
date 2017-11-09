<template>
  <editor-forms>
    <div class="input-field col s12 m6">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" value="https://getimage.com/image">
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
      <p class="flow-text">Рамка:</p>
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
