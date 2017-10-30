const Vue = require('vue');
const VueRouter = require('vue-router');

const App = require('./components/App.vue');
const AdminEditor = require('./components/AdminEditor.vue');

Vue.use(VueRouter);
var router = new VueRouter({
	routes: [
		{path: '/admin', component: AdminEditor}
	]
});

new Vue({
  el: '#app',
	render: (h) => h(App),
	router
});
