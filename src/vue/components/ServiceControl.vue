<template>
  <div class="service">
    <div class="card-panel hoverable" :class="service.card_style.color">
      <div class="wrap-card-content">
        <i class="material-icons">{{service.card_style.icon}}</i>
        <h1>{{service.name}}</h1>
        <p class="flow-text">{{service.decrtiption}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['service']
  }
</script>

<style lang="css">
</style>
