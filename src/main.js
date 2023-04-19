// import { createApp } from 'vue';
// import Antd from 'ant-design-vue';
// import App from './App.vue';
// import 'ant-design-vue/dist/antd.css';

// const app = createApp();
// app.config.productionTip = false;

// app.use(Antd);

import { createApp } from 'vue';
import Antd from 'ant-design-vue'; //
import App from './App.vue';
import 'ant-design-vue/dist/antd.css'; //
import router from '@/router';

// import './assets/main.css'

const app = createApp(App);
app.config.productionTip = false;
app.use(Antd);
app.use(router).mount('#app');
