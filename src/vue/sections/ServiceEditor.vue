<template>
  <div class="service container">
    <el-button class="service__main-btn" type="primary" @click="closeService">Вернуться назад</el-button>

    <i class="material-icons service__icon">{{service.card_style.icon}}</i>
    <h1 class="service__title">{{service.name}}</h1>

    <p class="service__description">{{service.decrtiption}}
      <a class="service__doc" v-show="service.docs" target="_blank" :href="service.docs">Подробнее...</a>
    </p>

    <div class="service__input" v-for="(input, id) in service.inputs">
      <p class="text">{{input.description}}</p>
      <el-input :name="id"  v-model="input.value" data-vv-delay="1000" v-validate="{required: true, regex: input.regexp}"></el-input>
    </div>

    <!-- <el-button class="service__delete" type="primary" @click="deleteService">Удалить</el-button> -->
    <el-button class="service__save" type="primary" @click="saveService">Сохранить</el-button>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      service() {
        return this.$store.state.currentService;
      }
    },
    methods: {
      saveService() {
        this.$validator.validateAll().then((result) => {
          if(result) {
            let form = {};
            for(let input in this.service.inputs) {
               form[input] = this.service.inputs[input].value;
            }
            this.$emit('updateService', this.service.id, form);
          } else Materialize.toast('Неверно указаны данные!', 1000);
        });
      },
      closeService() {
        this.$emit('toggleService', this.service.id, false);
      }
    }
  }
</script>
