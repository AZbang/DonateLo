const Vue = require('vue');

const AdminEditor = require('./components/AdminEditor.vue');
const GettingStarted = require('./components/GettingStarted.vue');

new Vue({
  el: '#app',
	data: {
		api: {}
	},
	methods: {
		getVKApiData() {
			let query = window.location.search.substring(1);
			let vars = query.split("&");
			let api = {};

			for(let i = 0; i < vars.length; i++) {
				let pair = vars[i].split("=");
				api[pair[0]] = pair[1];
			}
			api.api_result = JSON.parse(decodeURIComponent(api.api_result));
			this.api = api;
		}
	},
	computed: {
		viewComponent() {
			this.getVKApiData();

			if(+this.api.viewer_type > 2 && this.api.group_id != null) return AdminEditor;
			else return GettingStarted;
		}
	},
	render(h) { return h(this.viewComponent) }
});
