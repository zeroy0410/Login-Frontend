import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {installAxios} from "./api/axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { installCaptcha } from './components/VueRecaptcha';

const app = createApp(App)
app.use(ElementPlus)
installAxios(app)
installCaptcha(app)
app.use(router).mount('#app')
