import vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import "./assets/styles/main.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { ValidationProvider } from "vee-validate";


vue.component("ValidationProvider", ValidationProvider);

vue.use(ElementUI);

vue.config.productionTip = false

new vue({
	router,
	store,
	render: (h) => h(app),
}).$mount("#app");
