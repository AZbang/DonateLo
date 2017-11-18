<template>
  <div class="color-picker">
    <div class="color-picker__overlay" v-show="isVisible" @click="hide"></div>
    <transition name="pop">
      <div class="color-picker__flyout" v-show="isVisible">
        <div class="color-chip" v-bind:style="{'background': color}">
          <div class="color-chip__inner">
            <h1 class="color-chip__title">{{ hex }}</h1>
          </div>
        </div>
        <div class="color-picker__inner">
          <div class="control" v-bind:style="gradientH">
            <input type="range" min="0" max="360" v-model="h" />
            <div class="thumb"></div>
          </div>
          <div class="control" v-bind:style="gradientS">
            <input type="range" min="0" max="100" v-model="s" />
            <div class="thumb"></div>
          </div>
          <div class="control" v-bind:style="gradientL">
            <input type="range" min="0" max="100" v-model="l" />
            <div class="thumb"></div>
          </div>
        </div>
      </div>
    </transition>
    <div @click="toggle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  const toHex = require('hsl-to-hex');
  const toHsl = require('hex-to-hsl');

  function hsb2hsl(h, s, b) {
    var hsl = {
      h: h
    };
    hsl.l = (2 - s) * b;
    hsl.s = s * b;

    if (hsl.l <= 1 && hsl.l > 0) {
      hsl.s /= hsl.l;
    } else {
      hsl.s /= 2 - hsl.l;
    }

    hsl.l /= 2;

    if (hsl.s > 1) {
      hsl.s = 1;
    }

    if (!hsl.s > 0) hsl.s = 0


    hsl.h *= 360;
    hsl.s *= 100;
    hsl.l *= 100;

    return hsl;
  }

  module.exports = {
    props: ["change", "initial"],
    data() {
      return {
        isVisible: false,
        h: toHsl(this.initial)[0],
        s: toHsl(this.initial)[1],
        l: toHsl(this.initial)[2],
        isFirst: true,
        hex: this.initial
      }
    },
    computed: {
      color() {
        var hsl = hsb2hsl(parseFloat(this.h) / 360, parseFloat(this.s) / 100, parseFloat(this.l) / 100);
        this.hex = toHex(hsl.h, hsl.s, hsl.l);
        if(!this.isFirst) this.change(this.hex);
        this.isFirst = false;
        return this.hex;
      },
      gradientH() {
        var stops = [];
        for (var i = 0; i < 7; i++) {
          var h = i * 60;

          var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.s) / 100, parseFloat(this.l / 100))

          var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
          stops.push("hsl(" + c + ")")
        }

        return {
          backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
        }
      },
      gradientS() {
        var stops = [];
        var c;
        var hsl = hsb2hsl(parseFloat(this.h / 360), 0, parseFloat(this.l / 100))
        c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")

        var hsl = hsb2hsl(parseFloat(this.h / 360), 1, parseFloat(this.l / 100))
        c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")

        return {
          backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
        }
      },
      gradientL() {
        var stops = [];
        var c;

        var hsl = hsb2hsl(parseFloat(this.h / 360), 0, 0)
        c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")

        var hsl = hsb2hsl(parseFloat(this.h / 360), parseFloat(this.s / 100), 1)

        c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")

        return {
          backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
        }
      }
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      },
      toggle() {
        this.isVisible = !this.isVisible;
      }
    }
  }
</script>

<style scoped>
  .input-wrap {
    background-color: #f9f9f9;
    border-radius: 60px;
    padding: 6px 0 6px 60px;
    box-shadow: 0 0 3px #ded2f7;
  }
  .input-color {
    position: absolute;
    width: 40px;
    left: 10px;
    height: 40px;
    border-radius: 50%;
  }
  .input {
    margin: 0;
    border: none;
    font-size: 2em;
    font-weight: 200;
  }
  .input:focus {
    border-bottom: none !important;
    box-shadow: none !important;
    outline: none;
  }

  .color-picker {
    position: relative;
  }

  .color-picker__overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0;
    background: black;
    z-index: 0;
    opacity: 0;
  }

  .color-picker__flyout {
    width: 240px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: white;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.12);
    font-family: "Roboto", "Helvetica Neue", sans-serif;
    position: absolute;
    bottom: -75px;
    left: 0;
    z-index: 2;
  }

  .color-picker__inner {
    padding: 1.5rem 1rem;
  }

  .color-chip {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 4px 4px 0 0;
  }

  .color-chip__inner {
    text-align: center;
  }

  .color-chip__title {
    opacity: 0.7;
    font-weight: normal;
    font-size: 25px;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .control {
    position: relative;
    width: 100%;
    height: 12px;
    border-radius: 12px;
    border: 1px solid #ddd;
  }

  .control + .control {
    margin-top: 1rem;
  }

  .control input {
    width: 100%;
    margin: 0;
  }

  .control .thumb {
    display: none !important;
  }

  .control input[type=range] {
    -webkit-appearance: none !important;
    width: 100% !important;
    background-color: transparent !important;
    color: transparent !important;
    position: absolute !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }

  .control input[type=range]:focus {
    outline: none;
  }

  .control input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  .control input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #ddd;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
    margin-top: -4px;
  }

  .swatch {
    width: 24px;
    height: 24px;
    margin: 1rem auto 0 auto;
    border: 4px solid white;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .swatch:hover {
    border: 4px solid white;
    opacity: 0.8;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
  }

  .pop-enter-active,
  .pop-leave-active {
    transition: transform .5s, opacity .5s;
    transition-timing-function: cubic-bezier(.8, .3, 0.25, 1.75);
    transform: scale(1);
  }

  .pop-enter,
  .pop-leave-active {
    opacity: 0;
    transform: scale(0);
  }
</style>
