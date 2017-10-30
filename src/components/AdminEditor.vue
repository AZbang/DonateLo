<template>
  <div id="admin">
    <div id="edit_bg" style="{backgroundImage: 'url(' + originBg + ');'}">
      <i class="material-icons add-photo-icon">add_a_photo</i>
      <br>
      <p class="flow-text">Загрузите обложку группы</p>
    </div>
    <div class="container">
      <p class="label">Donatelo | Динамические обложки</p>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        originBg: ''
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .label {
    font-size: 3rem;
    margin-top: 20px;
  }
  #edit_bg {
    height: 300px;
    border: 5px dashed #7a9ee0;
    width: 100%;
    text-align: center;
    padding-top: 110px;
    position: relative;
    box-sizing: border-box;
  }
  #edit_bg i, #edit_bg p {
    color: #7a9ee0;
    margin-top: 0;
    text-align: center;
  }
  .add-photo-icon {
    font-size: 3em;
  }
</style>
