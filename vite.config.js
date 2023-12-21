import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import { VantResolver } from '@vant/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // resolvers: [VantResolver()],
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*.xiangshuheika.com'],
      },
      build: {
        externalGlobals: [
          [
            'vue',
            cdn
              .jsdelivr('Vue', 'dist/vue.global.prod.js')
              .concat(
                await util.fn2dataUrl(() => {
                  window.Vue = Vue;
                }),
              )
              .concat('https://fastly.jsdelivr.net/npm/vant@4/lib/vant.min.js')

          ],
        ],
        externalResource: {
          'vant/lib/index.css': cdn.jsdelivr(),
        },

      },
    }),
  ],
});
