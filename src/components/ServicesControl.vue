<template>
  <div id="services">
    <div class="row">
      <div class="col s6 m4">
        <div class="card-panel hoverable red lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">favorite</i>
            <p>Донаты</p>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card-panel hoverable indigo lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">person</i>
            <p>ВК Комьюнити</p>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card-panel hoverable green lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">photo_camera</i>
            <p>Google фото</p>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card-panel hoverable orange lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">wb_cloudy</i>
            <p>Погода, дата, время</p>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card-panel hoverable blue lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">subject</i>
            <p>Новости</p>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card-panel hoverable teal lighten-1">
          <div class="wrap-card-content">
            <i class="material-icons">thumbs_up_down</i>
            <p>Голосования</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .col {
    padding: 0 5px;
    border-radius: 10px;
  }
  .card-panel {
    border-radius: 7px;
    cursor: pointer;
    height: 240px;
    text-align: center;
    color: #fff;
    margin-bottom: 3px;
  }
  .wrap-card-content {
    margin-top: 35px;
  }
  .card-panel i {
    font-size: 6em;
  }
</style>
