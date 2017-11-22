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
      <p class="flow-text">Угол:</p>
      <div class="input-wrap">
        <span class="input-prefix">°</span>
        <input class="input browser-default" type="number" :value="angle" @change="setAngle">
      </div>
    </div>
    <div class="input-field col s12">
      <p class="flow-text" style="text-align: left;">Значение:</p>
      <div class="input-wrap" style="border-radius: 10px; height: initial;">
        <textarea class="input" :value="object.value" @change="setValue"></textarea>
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Шрифт:</p>
      <div class="input-wrap">
        <select class="input browser-default" v-model="object.fontType" @change="setFontType">
          <option :style="{fontFamily: font}" v-for="(font, key) in object.FONTS" :value="key">{{font}}</option>
        </select>
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Размер:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="object.size" @change="setSize">
      </div>
    </div>
    <div class="input-field col s12 m4" style="text-align: center;">
      <p class="flow-text">Выравнивание:</p>
      <i class="material-icons btn-icon" :class="object.textAlign === 'right' ? 'active' : ''" @click="setTextAlign('right')">format_align_right</i>
      <i class="material-icons btn-icon" :class="object.textAlign === 'center' ? 'active' : ''" @click="setTextAlign('center')">format_align_center</i>
      <i class="material-icons btn-icon" :class="object.textAlign === 'left' ? 'active' : ''" @click="setTextAlign('left')">format_align_left</i>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Цвет:</p>
      <color-picker :initial="object.color" :change="setColor">
        <div class="input-wrap">
          <div class="input-color" :style="{background: object.color}"></div>
          <input class="input" :value="object.color">
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
    computed: {
      angle() {
        let deg = Math.abs(Math.round(360-360-this.object.view.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setFontType(e) {
        this.object.setFontType(e.target.value);
      },
      setValue(e) {
        this.object.setValue(e.target.value);
      },
      setSize(e) {
        this.object.setSize(e.target.value);
      },
      setColor(c) {
        this.object.setColor(c);
      },
      setX(e) {
        this.object.setX(+e.target.value);
      },
      setY(e) {
        this.object.setY(+e.target.value);
      },
      setAngle(e) {
        this.object.setAngle(+e.target.value);
      }
    },
    mounted() {
      $('select').material_select();
    }
  }
</script>
