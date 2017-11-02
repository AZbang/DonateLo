<template >
  <div id="widgets">
    <div class="row">
      <div class="col s6 m3">
        <div class="card-panel hoverable">
          <div class="wrap-card-content">
            <i class="material-icons">text_format</i>
            <p>Добавить текст</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable">
          <div class="wrap-card-content">
            <i class="material-icons">format_align_left</i>
            <p>Линейный бар</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable">
          <div class="wrap-card-content">
            <i class="material-icons">extension</i>
            <p>Радиальный бар</p>
          </div>
        </div>
      </div>
      <div class="col s6 m3">
        <div class="card-panel hoverable">
          <div class="wrap-card-content">
            <i class="material-icons">extension</i>
            <p>Картинка</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
