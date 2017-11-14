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
          <p class="flow-text label" v-show="!currentObject">Выберите объект или сервис для изменения</p>
          <editors-control :currentObject="currentObject"></editors-control>
        </div>
      </div>
      <div id="settings">
        <div class="controls-section">
          <p class="flow-text label">Настройки</p>
        </div>
      </div>
    </div>
    <a id="uploadData" @click="uploadData" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></a>
  </div>
</template>

<script>
  const CoverControl = require('../controls/CoverControl.vue');
  const WidgetsControl = require('../controls/WidgetsControl.vue');
  const ServicesControl = require('../controls/ServicesControl.vue');
  const EditorsControl = require('../controls/EditorsControl.vue');
  const axios = require('axios');

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
        api: this.$parent.api,
        METHODS: {
          'text': 'addText',
          'linear-bar': 'addLinearBar',
          'radial-bar': 'addRadialBar',
          'image': 'addImage'
        }
      }
    },
    methods: {
      convertFileToDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      },

      // API METHODS
      createGroup(url) {
        this.convertFileToDataURL(url, (base64) => {
          axios.post('https://app-donatelo.herokuapp.com/create_group', {
            app_id: this.api.api_id,
            auth_token: this.api.auth_key,
            access_token: this.api.access_token,
            resources: {
              background: base64,
            },
            views: [],
            group_id: this.api.group_id,
            viewer_id: this.api.viewer_id
          }).then((response) => {
            this.$emit('isLoad', false);
          });
        });
      },
      getData() {
        axios.post('https://app-donatelo.herokuapp.com/get_cover', {
          app_id: this.api.api_id,
          auth_token: this.api.auth_key,
          group_id: this.api.group_id,
          viewer_id: this.api.viewer_id
        }).then((response) => {
          console.log(response);
        })
      },
      uploadData() {
        let resources = {};
        let views = [];

        canvas.getItemsByAttr('type', 'radial-bar').forEach((i) => {
          let data = this.getRadialBarJSON(i);
          resources = {...resources, ...data.images};
          views.push(data.data);
        });
        canvas.getItemsByAttr('type', 'linear-bar').forEach((i) => {
          let data = this.getLinearBarJSON(i);
          resources = {...resources, ...data.images};
          views.push(data.data);
        });
        canvas.getItemsByAttr('type', 'text').forEach((i) => {
          let data = this.getTextJSON(i);
          views.push(data);
        });
        canvas.getItemsByAttr('type', 'image').forEach((i) => {
          if(i.id == 'cover') return;
          let data = this.getImageJSON(i);
          views.push(data);
        });

        console.log(resources, views);

        axios.post('https://app-donatelo.herokuapp.com/update_cover', {
          app_id: this.api.api_id,
          auth_token: this.api.auth_key,
          group_id: this.api.group_id,
          viewer_id: this.api.viewer_id,
          resources, views
        }).then((response) => {
          console.log(response);
        });
      },
      getRadialBarJSON(obj) {
        return {
          images: {
            [obj.id + ':stand']: obj.stand,
            [obj.id + ':bar']: obj.progress,
          },
          data: {
            id: obj.id,
            type: "radial",
            value: '' + obj.value,
            max_value: obj.maxValue + 0.000001,
            x: obj.left,
            y: obj.top,
            w: obj.width,
            h: obj.width,
            angle: obj.angle+ 0.000001,
            // stand_color: obj.standColor,
            // bar_color: obj.progressColor,
            start_angle: obj.startAngle+ 0.000001,
            direction: +obj.direction,
            border: +obj.border
          }
        }
      },
      getLinearBarJSON(obj) {
        return {
          images: {
            [obj.id + ':stand']: obj.stand,
            [obj.id + ':bar']: obj.progress,
          },
          data: {
            id: obj.id,
            type: "linear",
            value: '' + obj.value,
            max_value: obj.maxValue + 0.000001,
            x: obj.left,
            y: obj.top,
            w: obj.width,
            h: obj.width,
            angle: obj.angle + 0.000001,
            // stand_color: obj.standColor,
            // bar_color: obj.progressColor,
            border: +obj.border
          }
        }
      },
      getTextJSON(obj) {
        return {
          id: obj.id,
          type: "text",
          value: obj.text,
          x: Math.floor(obj.left),
          y: Math.floor(obj.top),
          angle: obj.angle + 0.000001,
          font: obj.fontType,
          size: +obj.fontSize,
          color: obj.fill,
          // align: obj.textAlign
        }
      },
      getImageJSON(obj) {
        return {
          id: obj.id,
          type: "image",
          value: obj.value,
          x: obj.left,
          y: obj.top,
          w: obj.width,
          h: obj.height,
          angle: obj.angle + 0.000001,
          // border_color: obj.borderColor,
          // border_width: obj.borderWidth
        }
      },

      // Widgets methods
      addWidget(type) {
        this[this.METHODS[type]]();
      },
      addText(data = {}) {
        let font = data.font || 'BEBAS';
        let color = data.color || '#fff';
        let align = data.align || 'left';
        let size = data.size || 42;
        let x = data.x || 50;
        let y = data.y || 50;

        let text = new fabric.Text(data.text || 'Текст {varible}', {
          left: x*this.scale,
          top: y*this.scale,
          fill: color,
          fontFamily: 'Bebas Neue',
          fontSize: size,
          padding: 7
        });
        text.fontType = font;
        text.color = color;
        text.align = align;
        text.size = size;

        this.initObject(text, 'text');
      },
      addLinearBar(data = {}) {
        this.convertFileToDataURL(data.stand_src || 'assets/white_pixel.png', (stand_base64) => {
          this.convertFileToDataURL(data.progress_src || 'assets/white_pixel.png', (bar_base64) => {
            let src_stand = stand_base64;
            let src_progress = bar_base64;
            let angle = data.angle || 0;
            let value = data.value || 300;
            let w = data.w || 300;
            let h = data.h || 50;
            let x = data.x || 200;
            let y = data.y || 200;
            let br = data.border || 0;
            let progress_color = '#fff';
            let stand_color = '#fff'

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
                group.standColor = stand_color;
                group.progressColor = progress_color;

                this.initObject(group, 'linear-bar');
              });
            });
          })
        })
      },
      addRadialBar(data = {}) {
        this.convertFileToDataURL(data.stand_src || 'assets/white_pixel.png', (stand_base64) => {
          this.convertFileToDataURL(data.progress_src || 'assets/white_pixel.png', (bar_base64) => {
            let src_stand = stand_base64;
            let src_progress = bar_base64;
            let angle = data.angle || 0;
            let value = data.value || 300;
            let w = data.w || 300;
            let h = data.h || 50;
            let x = data.x || 200;
            let y = data.y || 200;
            let br = data.border || 0;
            let start_angle = data.start_angle || 0;
            let direction = data.direction || 0;
            let progress_color = '#fff';
            let stand_color = '#fff'

            fabric.Image.fromURL(src_stand, (stand) => {
              stand.setHeight(h);
              stand.setWidth(w);
              stand.set({
                clipTo: (ctx) => {
                  ctx.arc(0, 0, 100, 0, Math.PI*2, true);
                }
              });

              fabric.Image.fromURL(src_progress, (progress) => {
                progress.setHeight(h);
                progress.setWidth(w);
                progress.setOriginToCenter();
                progress.angle = -90;
                progress.set({
                  clipTo: (ctx) => {
                    ctx.moveTo(0, 0);
                    ctx.arc(0, 0, progress.width/2, 0, Math.PI*2, false);
                    ctx.lineTo(0, 0);
                    ctx.fill();
                  }
                });

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
                group.startAngle = start_angle;
                group.direction = direction;
                group.standColor = stand_color;
                group.progressColor = progress_color;

                this.initObject(group, 'radial-bar');
              });
            });
          });
        });
      },
      addImage(data = {}) {
        let angle = data.angle || 0;
        let value = data.value || 'assets/image.png';
        let w = data.w || 150;
        let h = data.h || 150;
        let x = data.x || 200;
        let y = data.y || 200;
        let br = data.border || 0;
        let borderWidth = 0;
        let borderColor = '#fff';

        fabric.Image.fromURL(value, (img) => {
          img.setHeight(h);
          img.setWidth(w);
          img.top = x;
          img.left = y;
          img.angle = angle;
          img.value = value;
          img.borderWidth = borderWidth;
          img.borderColor = borderColor;

          this.initObject(img, 'image');
        });
      },
      initObject(obj, type) {
        obj.objectCaching = false;
        obj.id = '' + Date.now();
        obj.selectable = true;
        obj.type = type;

        obj.scale(this.scale);
        canvas.add(obj);

        obj.on('mousedown', () => {
          this.currentObject = obj;
          $('#menu').tabs('select_tab', 'edit');
        });
        canvas.on('selection:cleared', () => {
          this.currentObject = null;
          $('#menu').tabs('select_tab', 'add');
        });
        obj.trigger('mousedown');
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
      if(covers.length) {
        this.$emit('isLoad', true);
        this.setCover(covers[covers.length-1].url);
        this.createGroup(covers[covers.length-1].url);
      }
    }
  }
</script>

<style scoped>
  .fixed-wrap {
    position: fixed;
    top: 0;
    z-index: 10000;
  }
  #uploadData {
    position: fixed;
    bottom: 20px;
    right: 20px;
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
