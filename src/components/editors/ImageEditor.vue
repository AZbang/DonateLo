<template>
  <editor-forms>
    <div class="input-field col s10 m11">
      <p class="flow-text">Значение:</p>
      <div class="input-wrap">
        <input class="input" v-model="value" @change="setValue">
      </div>
    </div>
    <div class="input-field col s2 m1">
      <upload-image @uploadImage="setValue"></upload-image>
      <i class="material-icons btn-icon active" style="margin-top: 36px; height: 72px;">file_upload</i>
    </div>
    <div class="input-field col s6 m6">
      <p class="flow-text">Скругление:</p>
      <div class="input-wrap">
        <input class="input" v-model="rounded" @change="setRounded">
      </div>
    </div>
    <div class="input-field col s6 m6">
      <p class="flow-text">Рамка:</p>
      <div class="input-wrap">
        <input class="input" v-model="borderWidth" @change="setBorderWidth">
      </div>
    </div>
    <div class="input-field col s12">
      <p class="flow-text">Рамка:</p>
      <br>
      <color-picker :startColor="startBorderColor" @setColor="setBorderColor"></color-picker>
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
    data() {
      return {
        value: this.object.source,
        rounded: this.object.rounded,
        borderWidth: this.object.borderWidth,
        startBorderColor: this.object.borderColor
      }
    },
    watch: {
      object(val) {
        if(!val) return;
        this.value = val.value;
        this.rounded = val.rounded;
        this.borderWidth = val.borderWidth;
        this.startBorderColor = val.borderColor;
      }
    },
    methods: {
      setValue(src, obj) {
        var img = new Image();
        img.onload = () => {
          this.object.setElement(img);
        }
        this.value = obj.name;
        img.src = src;
      },
      setRounded() {

      },
      setBorderWidth() {
        this.object.strokeWidth = +this.borderWidth;
        canvas.renderAll();
      },
      setBorderColor(color) {
        this.object.stroke = color;
        canvas.renderAll();
      }
    }
  }
</script>
