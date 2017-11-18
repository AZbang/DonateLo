<template>
  <editor-forms>
    <div class="input-field col s12 m4">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <span class="input-prefix">%</span>
        <input class="input" :value="object.value" @keyup.enter="setValue">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Максимум:</p>
      <div class="input-wrap">
        <span class="input-prefix">%</span>
        <input class="input" :value="object.maxValue" @keyup.enter="setMaxValue">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input" :value="object.border" @keyup.enter="setBorder">
      </div>
    </div>
    <div class="input-field col m4">
      <p class="flow-text">Цвет:</p>
      <color-picker :initial="object.progressColor" :change="setProgressColor">
        <div class="input-wrap">
          <div class="input-color" :style="{background: object.progressColor}"></div>
          <input class="input" :value="object.progressColor">
        </div>
      </color-picker>
    </div>
    <div class="input-field col m4">
      <p class="flow-text">Задний фон:</p>
      <color-picker :initial="object.standColor" :change="setStandColor">
        <div class="input-wrap">
          <div class="input-color" :style="{background: object.standColor}"></div>
          <input class="input" :value="object.standColor">
        </div>
      </color-picker>
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
    props: ['object'],
    methods: {
      setProgressImage(e) {
        this.object.setProgressImage(e.target.value);
      },
      setStandImage(e) {
        this.object.setStandImage(e.target.value);
      },
      setValue(e) {
        this.object.setValue(e.target.value);
      },
      setMaxValue(e) {
        this.object.setMaxValue(e.target.value);
      },
      setProgressColor(c) {
        this.object.setProgressColor(c);
      },
      setStandColor(c) {
        this.object.setStandColor(c);
      },
      setBorder(e) {
        this.object.setBorder(e.target.value);
      }
    }
  }
</script>
