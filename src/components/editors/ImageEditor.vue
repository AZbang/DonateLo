<template>
  <editor-forms>
    <div class="input-field col s10 m11">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" :value="object.value" @keyup.enter="setValue">
      </div>
    </div>
    <div class="input-field col s6 m6">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" :value="object.borderWidth" @keyup.enter="setBorderWidth">
      </div>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Рамка:</p>
      <br>
      <color-picker :startColor="object.borderColor" @setColor="setBorderColor"></color-picker>
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
