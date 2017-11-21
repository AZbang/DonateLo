<template>
  <editor-forms>
    <div class="input-field col s12 m12">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <span class="input-prefix">url</span>
        <input class="input" :value="object.value" @change="setValue">
      </div>
    </div>
    <div class="input-field col s12 m6">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="object.borderWidth" @change="setBorderWidth">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Цвет рамки:</p>
      <color-picker :initial="object.borderColor" :change="setBorderColor">
        <div class="input-wrap">
          <div class="input-color" :style="{background: object.borderColor}"></div>
          <input class="input" :value="object.borderColor">
        </div>
      </color-picker>
    </div>
  </editor-forms>
</template>

<script>
  const EditorForms = require('../helpers/EditorForms.vue');
  const ColorPicker = require('../helpers/ColorPicker.vue');
  const UploadImage = require('../helpers/UploadImage.vue');

  module.exports = {
    components: {
      ColorPicker,
      EditorForms,
      UploadImage
    },
    props: ['object'],
    methods: {
      setValue(e) {
        this.object.setValue(e.target.value);
      },
      setBorderWidth(c) {
        this.object.setBorderWidth(c);
      },
      setBorderColor(c) {
        this.object.setBorderColor(c);
      }
    }
  }
</script>
