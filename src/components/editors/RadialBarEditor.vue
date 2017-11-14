<template>
  <editor-forms>
    <div class="input-field col s6 m4">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" v-model="value" @change="setValue">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text">Максимум:</p>
      <div class="input-wrap">
        <input class="input" v-model="maxValue" @change="setValue">
      </div>
    </div>
    <div class="input-field col s6 m4">
      <p class="flow-text">Стартовый угол:</p>
      <div class="input-wrap">
        <input class="input" v-model="startAngle" @change="setStartAngle">
      </div>
    </div>
    <div class="input-field col s6 m3">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" v-model="border" @change="setBorderWidth">
      </div>
    </div>
    <div class="input-field col s9">
      <p class="flow-text">Цвет:</p>
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
        startAngle: this.object.startAngle,
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
        this.startAngle = val.startAngle;
        this.maxValue = val.maxValue;
        this.rounded = val.rounded;
      }
    },
    methods: {
      setProgressColor(color) {
        this.object.progressColor = color;
        this.object.item(1).filters[0] = new fabric.Image.filters.Tint({color});
        this.object.item(1).applyFilters(canvas.renderAll.bind(canvas));
      },
      setStartAngle() {
        this.object.startAngle = +this.startAngle;
        this.object.item(1).angle = -90+this.startAngle;
        canvas.renderAll();
      },
      setStandColor(color) {
        this.object.standColor = color;
        this.object.item(0).filters[0] = new fabric.Image.filters.Tint({color});
        this.object.item(0).applyFilters(canvas.renderAll.bind(canvas));
      },
      setValue() {
        this.object.value = +this.value;
        this.object.item(1).set({
          clipTo: (ctx) => {
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, this.object.width/2, 0, Math.PI*2/this.maxValue*this.value, false);
            ctx.lineTo(0, 0);
            ctx.fill();
          }
        });
        canvas.renderAll();
      },
      setBorderWidth() {
        this.object.border = +this.border;
        this.object.item(0).setHeight(this.object.height+this.border*2);
        this.object.item(0).setWidth(this.object.width+this.border*2);
        this.object.item(0).left -= this._saveLastBorder+this.border;
        this.object.item(0).top -= this._saveLastBorder+this.border;
        this.object.item(0).set({
          clipTo: (ctx) => {
            ctx.arc(0, 0, this.object.item(0).width/2, 0, Math.PI*2, true);
          }
        });
        this._saveLastBorder = this.border;

        canvas.renderAll();
      }
    }
  }
</script>
