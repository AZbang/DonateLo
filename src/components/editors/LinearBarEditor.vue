<template>
  <editor-forms>
    <div class="input-field col s12 m4">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" v-model="value" @change="setValue">
      </div>
    </div>
    <div class="input-field col s12 m4">
      <p class="flow-text">Максимум:</p>
      <div class="input-wrap">
        <input class="input" v-model="maxValue" @change="setValue">
      </div>
    </div>
    <!-- <div class="input-field col s6 m3">
      <p class="flow-text">Скругление:</p>
      <div class="input-wrap">
        <input class="input" v-model="rounded" @change="setRounded">
      </div>
    </div> -->
    <div class="input-field col s12 m4">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" v-model="border" @change="setStrokeWidth">
      </div>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Цвет прогресс линии:</p>
      <br>
      <color-picker :startColor="startProgressColor" @setColor="setProgressColor"></color-picker>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Задний фон:</p>
      <br>
      <color-picker :startColor="startStandColor" @setColor="setStandColor"></color-picker>
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
        value: this.object.value,
        rounded: this.object.rounded,
        maxValue: this.object.maxValue,
        border: this.object.border,
        startStandColor: this.object.standColor,
        startProgressColor: this.object.progressColor,
        _saveLastStrokeWidth: 0
      }
    },
    watch: {
      object(val) {
        if(!val) return;
        this.startProgressColor = val.progressColor;
        this.startStandColor = val.standColor;
        this.border = val.border;
        this.value = val.value;
        this.maxValue = val.maxValue;
        this.rounded = val.rounded;
      }
    },
    methods: {
      setProgressColor(color) {
        this.object.item(1).filters[0] = new fabric.Image.filters.Tint({color});
        this.object.item(1).applyFilters(canvas.renderAll.bind(canvas));
      },
      setStandColor(color) {
        this.object.item(0).filters[0] = new fabric.Image.filters.Tint({color});
        this.object.item(0).applyFilters(canvas.renderAll.bind(canvas));
      },
      setValue() {
        this.object.item(1).width = this.object.width/this.maxValue*this.value;
        canvas.renderAll();
      },
      setRounded() {

      },
      setStrokeWidth() {
        this.object.item(0).setHeight(this.object.height+this.border*2);
        this.object.item(0).setWidth(this.object.width+this.border*2);
        this.object.item(0).left -= this._saveLastBorder+this.border;
        this.object.item(0).top -= this._saveLastBorder+this.border;
        this._saveLastBorder = this.border;
        canvas.renderAll();
      }
    }
  }
</script>
