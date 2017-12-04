<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
        <p class="text">X:</p>
        <el-input-number :value="Math.round(widget.view.left)" @change="setX"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Y:</p>
        <el-input-number :value="Math.round(widget.view.top)" @change="setY"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Размер:</p>
        <el-input-number :value="widget.view.fontSize" @change="setSize"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Угол:</p>
        <el-input-number :value="angle" @change="setAngle"></el-input-number>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="10">
        <p class="text">Введите текст:</p>
        <el-input
          clearable
          :value="widget.value"
          @change="setValue">
        </el-input>
      </el-col>
      <el-col :span="6">
        <p class="text">Шрифт</p>
        <el-select v-model="widget.fontType" @change="setFontType">
          <el-option
            :style="{fontFamily: font}"
            v-for="(font, key) in widget.FONTS"
            :key="key"
            :label="font"
            :value="key">
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="6">
        <p class="text">Выравнивание</p>
        <el-radio-group>
          <el-radio-button label="Left"></el-radio-button>
          <el-radio-button label="Center"></el-radio-button>
          <el-radio-button label="Right"></el-radio-button>
        </el-radio-group>
      </el-col> -->
      <el-col :span="2">
        <p class="text">Цвет</p>
        <el-color-picker v-model="widget.color" @active-change="setColor"></el-color-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      widget() {
         return this.$store.state.editableObject;
      },
      angle() {
        let deg = Math.abs(Math.round(360-360-this.widget.view.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setFontType(v) {
        this.widget.setFontType(v);
      },
      setValue(v) {
        this.widget.setValue(v);
      },
      setSize(v) {
        this.widget.setSize(v);
      },
      setColor(v) {
        this.widget.setColor(v);
      },
      setX(v) {
        this.widget.setX(v);
      },
      setY(v) {
        this.widget.setY(v);
      },
      setAngle(v) {
        this.widget.setAngle(v);
      }
    }
  }
</script>
