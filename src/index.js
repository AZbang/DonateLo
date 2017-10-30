const Vue = require('vue');
const VueRouter = require('vue-router');

const App = require('./components/App.vue');
const AdminEditor = require('./components/AdminEditor.vue');
const GettingStarted = require('./components/GettingStarted.vue');

Vue.use(VueRouter);
var router = new VueRouter({
	routes: [
		{path: '/admin', component: AdminEditor},
		{path: '/getting_started', component: GettingStarted}
	]
});

new Vue({
  el: '#app',
	render: (h) => h(App),
	router
});
