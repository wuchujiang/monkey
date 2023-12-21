import { createApp } from 'vue';
import App from './App.vue';
import 'vant/es/dialog/style';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
