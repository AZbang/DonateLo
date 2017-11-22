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
      <p class="flow-text">Размер:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="Math.round(object.view.width/2)" @change="setSize">
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
    <!-- <div class="input-field col s12 m4">
      <p class="flow-text">Стартовый угол:</p>
      <div class="input-wrap">
        <span class="input-prefix">°</span>
        <input class="input browser-default" type="number" :value="object.startAngle" @change="setStartAngle">
      </div>
    </div> -->
    <div class="input-field col s12 m4">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <span class="input-prefix">px</span>
        <input class="input browser-default" type="number" :value="object.border" @change="setBorder">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Цвет:</p>
      <color-picker :initial="object.progressColor" :change="setProgressColor">
        <div class="input-wrap">
          <div class="input-color" :style="{background: object.progressColor}"></div>
          <input class="input" :value="object.progressColor">
        </div>
      </color-picker>
    </div>
    <div class="input-field col s12 m4">
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
      setProgressImage(e) {
        this.object.setProgressImage(e.target.value);
      },
      setStandImage(e) {
        this.object.setStandImage(e.target.value);
      },
      setStartAngle(e) {
        this.object.setStartAngle(e.target.value);
      },
      setVarible(e) {
        this.object.setVarible(e.target.value);
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
      },
      setX(e) {
        this.object.setX(+e.target.value);
      },
      setY(e) {
        this.object.setY(+e.target.value);
      },
      setAngle(e) {
        this.object.setAngle(+e.target.value);
      },
      setSize(e) {
        this.object.setSize(+e.target.value*2);
      }
    }
  }
</script>
