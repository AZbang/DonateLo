<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<style scoped>
  .input-field {
    margin-bottom: 1em;
  }
  p {
    font-size: 1.1em;
    margin: 0 16px 5px;
    color: #6e7bbe;
    font-family: Roboto;
  }
  .input-wrap {
    background-color: #f9f9f9;
    border-radius: 60px;
    padding: 2px 19px;
    height: 45px;
    box-shadow: 0 0 3px #ded2f7;
  }
  .input-color {
    position: absolute;
    width: 40px;
    left: 18px;
    height: 40px;
    border-radius: 50%;
    background: #ccc;
  }
  .input-prefix {
    position: absolute;
    right: 32px;
    top: 35px;
    font-size: 1.4em;
    font-weight: 300;
    color: #b5b5b5;
  }
  .input {
    margin: 0;
    font-size: 1.6em;
    border: none;
    background: transparent;
    font-weight: 200;
  }
  .input[type="number"] {
    width: 82%;
    height: 41px;
  }
  textarea.input {
    resize: vertical;
    min-height: 100px;
    padding-top: 10px;
  }
  .input:focus {
    border-bottom: none !important;
    box-shadow: none !important;
    outline: none;
  }
  .btn-icon {
    font-size: 26px;
    background-color: #f9f9f9;
    padding: 10px 10px;
    cursor: pointer;
    color: #6e7bbe;
    margin: 0 5px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    box-shadow: 0 0 3px #ded2f7;
  }
  .btn-icon.active {
    color: #9d7bc4;
  }
  .btn-icon:hover {
    color: #9d7bc4;
  }
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px 0;
    background-color: #fff;
    z-index: 1000;
  }
  .fixed-bottom .input-field {
    margin: 0;
  }
  .btn {
    color: #fff;
    height: 100%;
    width: 100%;
  }
</style>
