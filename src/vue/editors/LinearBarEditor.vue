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
        <p class="text">Ширина:</p>
        <el-input-number :value="Math.round(widget.view.width)" @change="setW"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Высота:</p>
        <el-input-number :value="Math.round(widget.view.height)" @change="setH"></el-input-number>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="5">
        <p class="text">Угол:</p>
        <el-input-number :value="angle" @change="setAngle"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Рамка:</p>
        <el-input-number :value="widget.border" @change="setBorder"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Максимум:</p>
        <el-input-number :value="widget.maxValue" @change="setMaxValue"></el-input-number>
      </el-col>
      <el-col :span="6">
        <p class="text">Значение:</p>
        <el-select v-model="widget.varible" @change="setVarible" placeholder="Выберите переменную">
          <el-option
            v-for="(value, key) in varibles"
            :key="key"
            :label="key"
            :value="key">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <p class="text">Цвет:</p>
        <el-color-picker v-model="widget.progressColor" @active-change="setProgressColor"></el-color-picker>
      </el-col>
      <el-col :span="4">
        <p class="text">Задний цвет:</p>
        <el-color-picker v-model="widget.standColor" @active-change="setStandColor"></el-color-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      widget() {
         return this.$store.state.render.editableObject;
      },
      varibles() {
        return this.$store.state.db.varibles;
      },
      angle() {
        let deg = Math.abs(Math.round(360-360-this.widget.view.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setVarible(v) {
        this.widget.setVarible(v);
      },
      setValue(v) {
        this.widget.setValue(v);
      },
      setMaxValue(v) {
        this.widget.setMaxValue(v);
      },
      setProgressColor(v) {
        this.widget.setProgressColor(v);
      },
      setStandColor(v) {
        this.widget.setStandColor(v);
      },
      setBorder(v) {
        this.widget.setBorder(v);
      },
      setX(v) {
        this.widget.setX(v);
      },
      setY(v) {
        this.widget.setY(v);
      },
      setW(v) {
        this.widget.setWidth(v);
      },
      setH(v) {
        this.widget.setHeight(v);
      },
      setAngle(v) {
        this.widget.setAngle(v);
      }
    }
  }
</script>
