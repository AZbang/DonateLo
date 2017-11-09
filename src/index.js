require('./fabricExtensions');

const Vue = require('vue');
const App = require('./components/App.vue');

new Vue({
  el: '#app',
	render: (h) => h(App)
});
