<template>
  <editor-forms>
    <div class="input-field col s12">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <textarea class="input" v-model="value" @change="setText"></textarea>
      </div>
    </div>
    <div class="input-field col s12 m5">
      <p class="flow-text">Шрифт:</p>
      <div class="input-wrap">
        <input class="input" value="Bebas Neue">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Размер:</p>
      <div class="input-wrap">
        <input class="input" v-model="fontSize" @change="setFontSize">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text" style="text-align: right;">Выравнивание:</p>
      <i class="material-icons btn-icon" :class="textAlign === 'right' ? 'active' : ''" @click="setTextAlign('right')">format_align_right</i>
      <i class="material-icons btn-icon" :class="textAlign === 'center' ? 'active' : ''" @click="setTextAlign('center')">format_align_center</i>
      <i class="material-icons btn-icon" :class="textAlign === 'left' ? 'active' : ''" @click="setTextAlign('left')">format_align_left</i>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Цвет текста:</p>
      <br>
      <color-picker @setColor="setColor" :startColor="fill"></color-picker>
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
    data() {
      return {
        value: this.object.text,
        fontSize: this.object.fontSize,
        textAlign: this.object.textAlign,
        fill: this.object.fill,
        fontType: this.object.fontType
      }
    },
    watch: {
      object(val) {
        if(!val) return;
        this.value = val.text;
        this.fontSize = val.fontSize;
        this.textAlign = val.textAlign;
        this.fill = val.fill;
      }
    },
    methods: {
      setText() {
        this.object.text = this.value;
        canvas.renderAll();
      },
      setFontSize() {
        this.object.fontSize = this.fontSize;
        canvas.renderAll();
      },
      setTextAlign(type) {
        this.textAlign = type;
        this.object.textAlign = type;
        canvas.renderAll();
      },
      setColor(color) {
        this.object.fill = color;
        canvas.renderAll();
      }
    }
  }
</script>
