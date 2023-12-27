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
        match: ['*://*/*'],
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
          'vant/lib/index.css': {
            resourceName: pkg => pkg.importName,
            resourceUrl: pkg => `https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
            loader: pkg => { // there are default loaders that support [css, json, the assets that vite support, ?url, ?raw] file/name suffix
              const css = GM_getResourceText(pkg.importName);
              setTimeout(() => {
                // shadow root 内不支持 @font-face
                const style = document.createElement('style');
                style.textContent = css.replace(/@font-face{[^}]*}/, '').replaceAll(':root', ':host');
                const style2 = document.createElement('style');
                style2.textContent = css.match(/@font-face{[^}]*}/)?.[0] || '';
                document.head.append(style2);
                const el = document.querySelector('#_monkey_app_').shadowRoot;
                el.append(style);
              }, 50)
            },
          },
        },
        cssSideEffects: () => {
          return (e) => {
            if (typeof GM_addStyle == 'function') {
              const style = document.createElement('style');
              style.textContent = e;
              setTimeout(() => {
                const el = document.querySelector('#_monkey_app_').shadowRoot;
                el.append(style);
              }, 50)
              return;
            }
            const o = document.createElement('style');
            o.textContent = e;
            document.head.append(o);
          };
        }
      },
    })
  ]
});
