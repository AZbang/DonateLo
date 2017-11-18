<template>
  <div id="services">
    <div class="service" v-show="isOpenEditor">
      <div class="switch">
       <label>
         <input type="checkbox">
          <span class="lever"></span>
        </label>
      </div>
      <div class="card-panel hoverable" :class="services.bitcoin.card_style.color">
        <i class="material-icons left">{{services.bitcoin.card_style.icon}}</i>
        <h1 class="title">{{services.bitcoin.name}}</h1>
        <p class="flow-text">{{services.bitcoin.decrtiption}}</p>

        <div class="row">
          <div class="input-field col s12" v-for="(input, id) in services.bitcoin.inputs">
            <input :id="id" type="text">
            <label class="active" :for="id">{{input.description}}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="!isOpenEditor">
      <div class="col s6 m4" v-for="(service, id) in services" @click="openService(id)">
        <div class="switch">
         <label>
            <input type="checkbox">
            <span class="lever"></span>
          </label>
        </div>
        <div class="mini card-panel hoverable" :id="id" :class="service.card_style.color">
          <div class="wrap-card-content">
            <i class="material-icons">{{service.card_style.icon}}</i>
            <p>{{service.name}}</p>
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
    methods: {
      openService(id) {
        this.service = this.services[id];
        this.isOpenEditor = true;
      }
    }
  }
</script>

<style scoped>
/* label color */
   .input-field label {
     color: #fff;
   }
   input {
     border-bottom: 2px solid #fff !important;
   }
   /* label focus color */
   .input-field input[type=text]:focus + label {
     color: #fff;
   }
   /* label underline focus color */
   .input-field input[type=text]:focus {
     border-bottom: 1px solid #fff;
     box-shadow: 0 1px 0 0 #fff;
   }
   /* valid color */
   /*.input-field input[type=text].valid {
     border-bottom: 1px solid #000;
     box-shadow: 0 1px 0 0 #000;
   }*/
   /* invalid color */
   /*.input-field input[type=text].invalid {
     border-bottom: 1px solid #000;
     box-shadow: 0 1px 0 0 #000;
   }*/
   /* icon prefix focus color */
   .input-field .prefix.active {
     color: #fff;
   }

  .title {
    margin-top: 5px;
    font-size: 3em;
    font-weight: 200;
    line-height: 78px;
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
