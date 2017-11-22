<template>
  <editor-forms>
    <div class="input-field col s12 m4">
      <p class="flow-text">X:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="Math.round(object.view.left)" @change="setX">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Y:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="Math.round(object.view.top)" @change="setY">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Высота:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="Math.round(object.view.width)" @change="setW">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Ширина:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="Math.round(object.view.height)" @change="setH">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Угол:</p>
      <div class="input-wrap">
        <span class="input-prefix">°</span>
        <input class="input browser-default" type="number" :value="angle" @change="setAngle">
      </div>
    </div>
    <div class="input-field col s12 m8">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <select class="input browser-default" v-model="object.varible" @change="setVarible">
          <option v-for="(value, key) in varibles" :value="key">{{key}}: {{value}}</option>
        </select>
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Максимум:</p>
      <div class="input-wrap">
        <span class="input-prefix">%</span>
        <input class="input browser-default" type="number" :value="object.maxValue" @change="setMaxValue">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="object.border" @change="setBorder">
      </div>
    <!-- </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Файл:</p>
      <div class="input-wrap">
        <input class="input" :value="object." @keyup.enter="setProgressImage">
      </div> -->
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
    props: ['object', 'varibles'],
    computed: {
      angle() {
        let deg = Math.abs(Math.round(360-360-this.object.view.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setVarible(e) {
        this.object.setVarible(e.target.value);
      },
      setProgressImage(img, data) {
        this.object.sourceProgressFilename = data.name;
        this.object.setProgressImage(img);
      },
      setStandImage(img, data) {
        this.object.sourceStandFilename = data.name;
        this.object.setStandImage(img);
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
      },
      setX(e) {
        this.object.setX(+e.target.value);
      },
      setY(e) {
        this.object.setY(+e.target.value);
      },
      setW(e) {
        this.object.setWidth(+e.target.value);
      },
      setH(e) {
        this.object.setHeight(+e.target.value);
      },
      setAngle(e) {
        this.object.setAngle(+e.target.value);
      }
    }
  }
</script>
