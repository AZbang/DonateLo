<template>
  <editor-forms>
    <div class="input-field col s12">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap" style="border-radius: 10px;">
        <textarea class="input" :value="object.value" @change="setValue"></textarea>
      </div>
    </div>
    <div class="input-field col s12 m5">
      <p class="flow-text">Шрифт:</p>
      <div class="input-wrap">
        <input class="input" :value="object.fontType">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Размер:</p>
      <div class="input-wrap">
        <input class="input" :value="object.size" @keyup.enter="setSize">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text">Выравнивание:</p>
      <i class="material-icons btn-icon" :class="object.textAlign === 'right' ? 'active' : ''" @click="setTextAlign('right')">format_align_right</i>
      <i class="material-icons btn-icon" :class="object.textAlign === 'center' ? 'active' : ''" @click="setTextAlign('center')">format_align_center</i>
      <i class="material-icons btn-icon" :class="object.textAlign === 'left' ? 'active' : ''" @click="setTextAlign('left')">format_align_left</i>
    </div>
    <div class="input-field col m4">
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
    }
  }
</script>
