<template>
  <div id="admin">
    <div id="edit_bg" style="{backgroundImage: 'url(' + originBg + ');'}">
      <i class="material-icons add-photo-icon">add_a_photo</i><br>
      <p class="flow-text">Загрузите обложку группы</p>
    </div>

    <div id="menu">
      <p class="flow-text">Добавить виджеты:</p>
      <div class="row">
        <div class="col s3">
          <div class="card-panel hoverable">
            <div class="wrap-card-content">
              <i class="material-icons">text_format</i>
              <p>Добавить текст</p>
            </div>
          </div>
        </div>
        <div class="col s3">
          <div class="card-panel hoverable">
            <div class="wrap-card-content">
              <i class="material-icons">format_align_left</i>
              <p>Линейный бар</p>
            </div>
          </div>
        </div>
        <div class="col s3">
          <div class="card-panel hoverable">
            <div class="wrap-card-content">
              <i class="material-icons">extension</i>
              <p>Радиальный бар</p>
            </div>
          </div>
        </div>
        <div class="col s3">
          <div class="card-panel hoverable">
            <div class="wrap-card-content">
              <i class="material-icons">extension</i>
              <p>Картинка</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['api'],
    data() {
      return {
        originBg: ''
      }
    },
    mounted() {
      let covers = this.api.api_result.response[0].cover.images;
      if(covers.length) this.originBg = covers[covers.length-1].url;
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

  #menu {
    padding: 50px;
  }
  #menu > p {
    margin: 5px;
    color: #6e7bab;
  }
  .col {
    padding: 0 5px;
    border-radius: 10px;
  }
  .card-panel {
    position: relative;
  }
  .wrap-card-content {
    background: -webkit-linear-gradient(#5e81a8, #b660bb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .card-panel {
    border-radius: 7px;
    cursor: pointer;
    height: 150px;
    text-align: center;
    background: #fff;
  }
  .card-panel i {
    background: -webkit-linear-gradient(#5e81a8, #b660bb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3em;
  }
</style>
