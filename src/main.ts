import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {installAxios} from "@/api/axios";

const app = createApp(App)
installAxios(app)
app.use(router).mount('#app')
