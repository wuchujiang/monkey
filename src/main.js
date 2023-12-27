import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(vant)
app.mount(
  (() => {
    const app = document.createElement('div');
    app.id = '_monkey_app_';
    const shadowRoot = app.attachShadow({ mode: 'open' });
    document.body.append(app);
    return shadowRoot;
  })(),
);
