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
    computed: {
      angle() {
        let deg = Math.abs(Math.round(360-360-this.object.view.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setValue(e) {
        this.object.setValue(e.target.value);
      },
      setBorderWidth(c) {
        this.object.setBorderWidth(c);
      },
      setBorderColor(c) {
        this.object.setBorderColor(c);
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
