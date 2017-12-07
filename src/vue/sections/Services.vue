<template>
  <div class="services">
    <p class="text">Каталог сервисов:</p>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(service, id) in services">
        <el-card class="service-card" :id="id">
          <i class="material-icons service-card__icon">{{service.card_style.icon}}</i>
          <h3 class="service-card__title">{{service.name}}</h3>
          <p class="service-card__text">{{service.decrtiption | roundText}}</p>
          <a class="service-card__buttom" @click="selectService(id)">Подключить</a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    filters: {
      roundText(str) {
        if(str.length > 50) return str.slice(0, 50) + '...';
        return str;
      }
    },
    computed: {
      services() {
        return this.$store.state.db.services;
      },
    },
    methods: {
      selectService(id) {
        this.$store.commit('setService', id);
        this.$store.commit('setSection', 'SERVICE_EDITOR');
      },
      updateGroup() {
        this.$store.dispatch('callApi', {method: 'updateGroup'});
      }
    }
  }
</script>
