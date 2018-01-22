<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <p class="text">X:</p>
        <el-input-number :value="Math.round(widget.left)" @change="setProp('x', $event)"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Y:</p>
        <el-input-number :value="Math.round(widget.top)" @change="setProp('y', $event)"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Ширина:</p>
        <el-input-number :value="Math.round(widget.width)" @change="setProp('width', $event)"></el-input-number>
      </el-col>
      <el-col :span="5">
        <p class="text">Высота:</p>
        <el-input-number :value="Math.round(widget.height)" @change="setProp('height', $event)"></el-input-number>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="5">
        <p class="text">Угол:</p>
        <el-input-number :value="angle" @change="setProp('angle', $event)"></el-input-number>
      </el-col>
      <el-col :span="15">
        <p class="text">Значение:</p>
        <el-select style="width: 100%;" v-model="widget.varible" @change="setProp('value', $event)" placeholder="Выберите переменную">
          <el-option
            v-for="(value, key) in varibles"
            :key="key"
            :label="key"
            :value="key">
          </el-option>
        </el-select>
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
      varibles() {
        return this.$store.state.varibles;
      },
      angle() {
        let deg = Math.abs(Math.round(360-360-this.widget.angle));
        if(deg > 360) return Math.abs(360-deg);
        else return deg;
      }
    },
    methods: {
      setProp(prop, v) {
        this.$store.commit('setWidgetProp')
      }
    }
  }
</script>
