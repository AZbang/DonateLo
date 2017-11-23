<template>
  <div id="services">
    <div class="service" v-if="isOpenEditor">
      <div class="card" :class="service.card_style.color">
        <i class="close-service material-icons" style="font-size: 1.4em; font-weight: bold; cursor: pointer; color: #fff;" @click="closeService">close</i>
        <div class="card-content white-text">
          <span class="card-title flow-text" style="font-weight: bold">
            <i class="material-icons left" style="font-size: 1.4em; font-weight: bold;">{{service.card_style.icon}}</i>
            {{service.name}}
          </span>
          <p class="flow-text">{{service.decrtiption}}
            <a class="docs" v-show="service.docs" target="_blank" :href="service.docs">Подробнее...</a>
          </p>
          <br>
          <div class="row inputs">
            <div class="input-field col s12" v-for="(input, id) in service.inputs">
              <input :name="id" v-model="input.value" data-vv-delay="1000" v-validate="{required: true, regex: input.regexp}">
              <label class="active" :for="id">
                <span>{{input.description}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="card-action" style="border: none; overflow: hidden;">
          <a href="#" class="right" style="color: #fff; margin-right: 0" @click="saveService">Сохранить</a>
        </div>
      </div>
    </div>

    <div v-show="!isOpenEditor">
      <p class="flow-text label" v-show="isActivationServices">Установленные сервисы:</p>
      <div class="row">
        <div class="col s6 m4" v-for="(service, id) in services" v-if="service.is_register" @click="openService(id)">
          <div class="mini card-panel hoverable" :id="id" :class="service.card_style.color">
            <div class="wrap-card-content">
              <i class="material-icons">{{service.card_style.icon}}</i>
              <p>{{service.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="flow-text label" v-show="!isActivationServices">Каталог сервисов:</p>
      <div class="row">
        <div class="col s6 m4" v-for="(service, id) in services" v-if="!service.is_register" @click="openService(id)">
          <div class="mini card-panel hoverable" :id="id" :class="service.card_style.color">
            <div class="wrap-card-content">
              <i class="material-icons">{{service.card_style.icon}}</i>
              <p>{{service.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['services'],
    data() {
      return {
        service: {},
        isOpenEditor: false
      }
    },
    computed: {
      isActivationServices() {
        for(let key in this.services) {
          if(this.services[key].is_active) return true;
        }
        return false;
      }
    },
    methods: {
      closeService() {
        $('.btn-upload-data').show();
        this.isOpenEditor = false;
        this.service = null;
      },
      openService(id) {
        $('.btn-upload-data').hide();
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
  .docs {
    color: #fff;
    border-bottom: 1px dotted #fff;
    font-size: 0.9em;
  }
  .input-field.col label {
      left: 5px;
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

   .input-field label {
     color: #fff;
   }
   input {
     margin-top: 15px;
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
    height: 240px;
    text-align: center;
  }
  .wrap-card-content {
    margin-top: 35px;
  }
  .card-panel i {
    font-size: 6em;
  }
</style>
