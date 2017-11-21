<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<style scoped>
  .row {
    margin-bottom: 100px;
  }
  .input-field {
    margin-bottom: 1em;
  }
  p {
    text-align: center;
  }
  .input-wrap {
    background-color: #f9f9f9;
    border-radius: 60px;
    padding: 6px 17px;
    height: 54px;
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
    top: 46px;
    font-size: 1.6em;
    font-weight: 300;
    color: #b5b5b5;
  }
  .input {
    margin: 0;
    font-size: 2em;
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
  }
  .input:focus {
    border-bottom: none !important;
    box-shadow: none !important;
    outline: none;
  }
  p {
    font-size: 1.5em;
    margin: 0 0 5px;
    color: #6e7bbe;
    font-family: Roboto;
  }
  .btn-icon {
    font-size: 2rem;
    background-color: #f9f9f9;
    padding: 13px 14px;
    cursor: pointer;
    color: #6e7bbe;
    margin: 0 5px;    
    border-radius: 50%;
    height: 54px;
    width: 54px;
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
