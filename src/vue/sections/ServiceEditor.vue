<template>
  <div class="service">
    <div class="card">
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
            <p>{{input.description}}</p>
            <input :name="id"  v-model="input.value" data-vv-delay="1000" v-validate="{required: true, regex: input.regexp}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>
