<template>
  <div class="service container">
    <el-button class="service__main-btn" type="primary" @click="closeService">Вернуться назад</el-button>

    <el-card>
      <div slot="header" class="clearfix">
        <el-button class="service__doc" type="primary" v-show="service.docs" target="_blank" :href="service.docs">Документация</el-button>
        <i class="material-icons service__icon">{{service.card_style.icon}}</i>
        <span class="service__title">{{service.name}}</span>
      </div>
      <p class="service__description">{{service.decrtiption}}</p>
      <br>
      <div class="service__input" v-for="(input, id) in service.inputs">
        <p class="text">{{input.description}}</p>
        <el-input :name="id" clearable prefix-icon="el-icon-edit" v-model="input.value" placeholder="Введите данные" data-vv-delay="1000" v-validate="{required: true, regex: input.regexp}"></el-input>
      </div>
      <el-button class="service__save" type="primary" @click="saveService">Сохранить</el-button>
    </el-card>
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
            console.log(this.service);
            this.$store.dispatch('callApi', {
              method: 'updateService',
              id: this.service.id, form
            });
          } else this.$store.dispatch('showLog', 'NOT_VALID_INPUT');
        });
      },
      closeService() {
        this.$store.commit('setSection', 'SERVICES');
      }
    }
  }
</script>
