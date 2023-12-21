import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(vant)
app.mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
