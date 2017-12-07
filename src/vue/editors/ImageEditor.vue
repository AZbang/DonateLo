<template>
  <div>
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
      <el-col :span="15">
        <p class="text">Значение:</p>
        <el-select style="width: 100%;" v-model="widget.varible" @change="setVarible" placeholder="Выберите переменную">
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
