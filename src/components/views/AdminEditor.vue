<template>
  <div id="admin">
    <div class="fixed-wrap">
      <cover-control @toggleSize="toggleSize" @uploadImage="uploadImage" :isCoverEmpty="!coverImage"></cover-control>

      <div v-show="coverImage">
        <canvas id="playground"></canvas>
      </div>

      <ul id="menu" class="tabs">
        <li class="tab col s4"><a href="#add" class="active">Добавить</a></li>
        <li class="tab col s4"><a href="#edit">Изменить</a></li>
        <li class="tab col s4"><a href="#settings">Настройки</a></li>
        <div class="indicator"></div>
      </ul>
    </div>
    <div class="views-wrap">
      <div id="add">
        <div class="controls-section">
          <p class="flow-text label">Добавить виджет:</p>
          <widgets-control @addWidget="addWidget"></widgets-control>
        </div>

        <div class="controls-section">
          <p class="flow-text label">Добавить сервис:</p>
          <services-control></services-control>
        </div>
      </div>
      <div id="edit">
        <div class="controls-section">
          <editors-control :currentObject="currentObject"></editors-control>
        </div>
      </div>
      <div id="settings">
        <div class="controls-section">
          <p class="flow-text label">Настройки</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const CoverControl = require('../controls/CoverControl.vue');
  const WidgetsControl = require('../controls/WidgetsControl.vue');
  const ServicesControl = require('../controls/ServicesControl.vue');
  const EditorsControl = require('../controls/EditorsControl.vue');

  module.exports = {
    components: {
      CoverControl,
      WidgetsControl,
      ServicesControl,
      EditorsControl
    },
    data() {
      return {
        coverImage: null,
        currentObject: null,
        api: this.$parent.api
      }
    },
    methods: {
      // Widgets methods
      addWidget(type) {
        let obj = type === 'text' ? this.addText() : this.addLinearBar();


      },
      addText() {
        let text = new fabric.Text('Текст {varible}', {
          left: 20*this.scale,
          top: 20*this.scale,
          fill: '#fff',
          fontFamily: 'Bebas Neue',
          fontSize: 42,
          padding: 7
        });

        text.objectCaching = false;
        text.id = '' + Date.now();
        text.selectable = true;
        text.type = 'text';

        text.scale(this.scale);
        canvas.add(text);

        text.on('mousedown', () => {
          this.currentObject = text;
          $('#menu').tabs('select_tab', 'edit');
        });
        text.trigger('mousedown');
      },
      addLinearBar() {
        let src_stand = 'assets/white_pixel.png';
        let src_progress = 'assets/white_pixel.png';
        let angle = 0;
        let rounded = 0;
        let value = 300;
        let w = 300;
        let h = 50;
        let x = 200;
        let y = 200;
        let br = 0;
        let progress_color = '#ffff';
        let stand_color = '#ccc'



        fabric.Image.fromURL(src_stand, (stand) => {
          stand.setHeight(h);
          stand.setWidth(w);

          fabric.Image.fromURL(src_progress, (progress) => {
            progress.setHeight(h);
            progress.setWidth(w);

            let group = new fabric.Group([stand, progress]);
            group.left = x*this.scale-w*this.scale/2;
            group.top = y*this.scale-h*this.scale/2;
            group.setOriginToCenter();

            group.value = value;
            group.maxValue = value;
            group.progress = src_progress;
            group.stand = src_stand;
            group.angle = angle;
            group.border = br;
            group.rounded = rounded;
            group.standColor = stand_color;
            group.progressColor = progress_color;

            group.objectCaching = false;
            group.id = '' + Date.now();
            group.selectable = true;
            group.type = 'linear-bar';

            group.scale(this.scale);
            canvas.add(group);

            group.on('mousedown', () => {
              this.currentObject = group;
              $('#menu').tabs('select_tab', 'edit');
            });
            group.trigger('mousedown');
          });
        });
      },

      // Cover methods
      resizeCoverToHeight() {
        this.scale = 300/this.originCoverHeight;
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, this.animateParams);
        this.coverImage.animate('left', window.innerWidth/2-this.originCoverWidth*this.scale/2, this.animateParams);
        $('.canvas-container').css('height', '300px');
        $('.views-wrap').css('margin-top', '348px');

        canvas.setHeight(300);
      },
      resizeCoverToWidth() {
        this.scale = window.innerWidth/this.originCoverWidth;
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, {
          ...this.animateParams,
          onComplete: () => {
            canvas.setHeight(this.originCoverHeight*this.scale);
          }
        });

        this.coverImage.animate('left', 0, this.animateParams);
        $('.canvas-container').css('height', this.originCoverHeight*this.scale + 'px');
        $('.views-wrap').css('margin-top', this.originCoverHeight*this.scale+48 + 'px');

      },
      toggleSize(isFull) {
        if(isFull) this.resizeCoverToWidth();
        else this.resizeCoverToHeight();
      },
      uploadImage(base64) {
        fabric.Image.fromURL(base64, (texture) => {
          let scale = 1590/texture.getWidth();
          let w = 1590/scale;
          let h = 400/scale;

          let coverSrc = texture.toDataURL({
            left: texture.getWidth()/2-w/2,
            top:  texture.getHeight()/2-h/2,
            width: w,
            height: h
          });

          this.setCover(coverSrc);
        });
      },
      setCover(src) {
        this.coverImage && this.coverImage.remove();

        fabric.Image.fromURL(src, (cover) => {
          this.coverImage = cover;
          this.coverImage.id = 'cover';
          this.coverImage.set('selectable', false);

          this.originCoverWidth = cover.getWidth();
          this.originCoverHeight = cover.getHeight();
          this.resizeCoverToHeight();

          canvas.add(this.coverImage);
        });
      }
    },
    mounted() {
      window.canvas = new fabric.Canvas('playground');
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(300);

      $('ul.tabs').tabs();

      $('.canvas-container').css('transition', 'all 1s');
      this.animateParams = {
        duration: 500,
        easing: fabric.util.ease['easeInQuad'],
        onChange: canvas.renderAll.bind(canvas)
      }
      // Get cover
      let covers = this.api.api_result.response[0].cover.images;
      if(covers.length) this.setCover(covers[covers.length-1].url);
    }
  }
</script>

<style scoped>
  .fixed-wrap {
    position: fixed;
    top: 0;
    z-index: 10000;
  }
  .views-wrap {
    margin-top: 348px;
  }
  .controls-section {
    padding: 2em 1em 0;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
  }
  .tabs {
    overflow: hidden;
    z-index: 100000;
  }
  .tab a {
    color: #6e7bab !important;
  }
  .tab a.active {
    color: #6e7bab !important;
  }
  .tabs .indicator {
    background-color: #6e7bab !important;
  }
</style>
