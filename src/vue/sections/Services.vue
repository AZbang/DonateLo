<template>
  <div class="services container">
    <el-button class="services__main-btn" type="primary" @click="updateGroup">Сохранить обложку</el-button>

    <p class="text">Каталог сервисов:</p>

    <el-row :gutter="20">
      <el-col :span="6" v-for="(service, id) in services">
        <el-card class="service-card" :id="id">
          <i class="material-icons service-card__icon">{{service.card_style.icon}}</i>
          <h3 class="service-card__title">{{service.name}}</h3>
          <p class="service-card__text">{{service.decrtiption | roundText}}</p>
          <a class="service-card__buttom" @click="openService(id)">Подключить</a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        service: {},
        futureServices: {
          timer: {
            name: "Таймер",
            description: "Это лучший сервис на районе, юзай пока горячий, детка",
            icon: "timer"
          },
          votes: {
            name: "Голосования",
            description: "Это лучший сервис на районе, юзай пока горячий, детка",
            icon: "thumbs_up_down"
          },
          qiwi: {
            name: "QIWI Кошелек",
            description: "Это лучший сервис на районе, юзай пока горячий, детка",
            icon: "account_balance_wallet"
          }
        },
      }
    },
    filters: {
      roundText(str) {
        if(str.length > 50) return str.slice(0, 50) + '...';
        return str;
      }
    },
    computed: {
      services() {
        return this.$store.state.services;
      },
    },
    methods: {
      updateGroup() {
        this.$store.dispatch('callApi', {method: 'updateGroup'});
      },
      openService(id) {
        this.service = this.services[id];
        this.service.id = id;
        this.isOpenEditor = true;
      },
      async saveService() {
        this.$validator.validateAll().then(async (result) => {
          if(result) {
            let form = {};
            for(let input in this.service.inputs) {
               form[input] = this.service.inputs[input].value;
            }
            this.$emit('updateService', this.service.id, form);
            this.isOpenEditor = false;
            $('.btn-upload-data').show();
          } else Materialize.toast('Неверно указаны данные!', 1000);
        });
      },
      async deleteService() {
        await this.$emit('toggleService', this.service.id, false);
        this.isOpenEditor = false;
      }
    }
  }
</script>

<style scoped>
  .enter { transform: translateX(100%) }
  .enter-to { transform: translateX(0) }
  .slide-enter-active { position: absolute }

  .leave { transform: translateX(0) }
  .leave-to { transform: translateX(-100%) }

  .slide-enter-active,
  .slide-leave-active { transition: all 750ms ease-in-out }


  .docs {
    color: #fff;
    border-bottom: 1px dotted #fff;
    font-size: 0.9em;
  }
  input:not([type]):focus:not([readonly])+label {
    color: #fff !important;
  }
  .close-service {
    position: absolute;
    right: 30px;
    top: 30px;
  }
  .card-content {
    padding: 24px 24px 0px;
  }
  .service .card {
    background: #7091ff;
  }

   .input-field label {
     color: #fff;
   }
   input {
     border-bottom: 2px solid #fff !important;
   }
   .input-field input[type=text]:focus + label {
     color: #fff;
   }
   .input-field input[type=text]:focus {
     border-bottom: 1px solid #fff;
     box-shadow: 0 1px 0 0 #fff;
   }
   .input-field .prefix.active {
     color: #fff;
   }

  .title {
    margin-top: 5px;
    font-size: 3em;
    font-weight: 200;
    line-height: 78px;
  }
  .label {
    margin: 5px;
    color: #6e7bab;
  }
  .col {
    padding: 0 5px;
    border-radius: 10px;
  }
  .card-panel {
    border-radius: 7px;
    color: #fff;
    margin-bottom: 3px;
  }

  .mini.card-panel {
    cursor: pointer;
    height: 270px;
    background: -webkit-linear-gradient(#7091ff, #a173ff);
    text-align: center;
    padding: 0;
  }
  .mini.card-panel p {
    padding: 0 30px;
    font-size: 24px;
    line-height: 23px;
    font-weight: bold;
  }
  .mini.card-panel i {
    font-size: 6em;
  }
  .wrap-card-content {
    padding-top: 56px;
  }
</style>
