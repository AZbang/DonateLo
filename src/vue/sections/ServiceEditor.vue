<template>
  <div class="service">
    <el-card>
      <div slot="header" class="clearfix">
        <a target="_blank" :href="service.docs" v-show="service.docs">
          <el-button class="service__doc" type="primary">Документация</el-button>
        </a>
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
      <el-button class="service__close" type="primary" @click="closeService">Закрыть</el-button>
    </el-card>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      service() {
        return this.$store.state.db.currentService;
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
