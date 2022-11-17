import { createApp } from 'vue'
import App from './App.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app.component('DatepickerComponent', Datepicker);
app.mount('#app');
