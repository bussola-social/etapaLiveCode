import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {createBussolaUI} from "@bussola-social/ui";
import router from './router';
import App from './App.vue';


import '@bussola-social/ui/libs.css'; //libs globais
import '@bussola-social/ui/base.css'; //estilos base (vuetify)
import '@bussola-social/ui/themes/executor.css';
import './styles/index.scss';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
app.use(createPinia())
app.use(createBussolaUI({
    theme: 'executor'
}))
app.use(router)

app.mount('#app')
