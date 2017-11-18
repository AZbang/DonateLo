<template>
  <editor-forms>
    <div class="input-field col s6 m4">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <span class="input-prefix">%</span>
        <input class="input browser-default" type="number" :value="object.value" @change="setValue">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text">Максимум:</p>
      <div class="input-wrap">
        <span class="input-prefix">%</span>
        <input class="input browser-default" type="number" :value="object.maxValue" @change="setValue">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text">Стартовый угол:</p>
      <div class="input-wrap">
        <span class="input-prefix">°</span>
        <input class="input browser-default" type="number" :value="object.startAngle" @change="setStartAngle">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="object.border" @change="setBorder">
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
      setStartAngle(e) {
        this.object.setStartAngle(e.target.value);
      },
      setValue(e) {
        this.object.setValue(e.target.value);
      },
      setMaxValue(e) {
        this.object.setMaxValue(e.target.value);
      },
      setBorder(e) {
        this.object.setBorder(e.target.value);
      },
      setProgressColor(c) {
        this.object.setProgressColor(c);
      },
      setStandColor(c) {
        this.object.setStandColor(c);
      }
    }
  }
</script>
