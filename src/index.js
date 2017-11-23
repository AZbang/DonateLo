require('./fabricExtensions');

const Vue = require('vue');
const VeeValidate = require('vee-validate');
const App = require('./components/App.vue');

Vue.use(VeeValidate);


VK.init(() => {
  new Vue({
    el: '#app',
  	render: (h) => h(App)
  });
}, () => {
  Materialize.toast('Произошла ошибка, попробуйте позже. :(')
}, '5.69');
