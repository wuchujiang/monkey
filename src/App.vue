

<template>
  <div>
    <van-floating-bubble
      class="bubble"
      v-if="showBubble"
      :gap="0"
      :teleport="el"
      axis="xy"
      v-model:offset="offset"
      icon="setting-o"
      @click="showShare = !showShare"
    />
    <van-share-sheet
      style="font-size: 24px"
      v-model:show="showShare"
      title="工具"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
const offset = ref({
  x: window.innerWidth - 50,
  y: window.innerHeight - 50,
});
onMounted(() => {
  if (window.innerWidth > 500) {
    showBubble.value = false;
  }
});
const app = getCurrentInstance();

const el = (window.$appEl = app.appContext.app._container);
const showShare = ref(false);
const showBubble = ref(true);
const options = [
  { name: "打印链接参数", icon: "flower-o", key: "search" },
  { name: "清除缓存", icon: "flower-o", key: "clear" },
  { name: "显示Vue Devtool", icon: "flower-o", key: "devtool" },
  { name: "隐藏工具按钮", icon: "flower-o", key: "hide" },
];

const onSelect = (option) => {
  showShare.value = false;
  switch (option.key) {
    case "search":
      searchHandle();
      break;
    case "clear":
      clearHandle();
      break;
    case "hide":
      hideHandle();
      break;
    case "devtool":
      showVueDevtool();
      break;
    default:
    //
  }
};

const insertScript = () => {
  const scripts = [
    "https://fastly.jsdelivr.net/npm/qs@6.11.1/dist/qs.js",
    "https://fastly.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js",
  ];
  scripts.forEach((item) => {
    const script = document.createElement("script");
    script.src = item;
    document.body.append(script);
  });
};

const searchHandle = () => {
  const params = new URLSearchParams(window.location.search);
  console.log(
    Array.from(params.entries()).reduce((pre, cur) => {
      pre[cur[0]] = cur[1];
      return pre;
    }, {})
  );
  const search = (location.hash || "").split("?")[1] || "";
  // params2 转成对象
  const params2 = search
    .split("&")
    .filter(Boolean)
    .reduce((pre, cur) => {
      const [key, value] = cur.split("=");
      pre[key] = value;
      return pre;
    }, {});
  console.log(params2);
};

const clearHandle = () => {
  localStorage.clear();
  sessionStorage.clear();
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};
const hideHandle = () => {
  showBubble.value = false;
};

const showVueDevtool = () => {
  var app, walker, node;
  walker = document.createTreeWalker(document.body, 1);
  while ((node = walker.nextNode())) {
    if (node.__vue_app__ || node.__vue__) {
      app = node;
      break;
    }
  }
  // vue 3
  if (app.__vue_app__) {
    const hook = unsafeWindow["__VUE_DEVTOOLS_GLOBAL_HOOK__"];
    hook.emit("app:init", app.__vue_app__, app.__vue_app__.version, {
      Fragment: "Fragment",
      Text: "Text",
      Comment: "Comment",
      Static: "Static",
    });
  } else if (app.__vue__) {
    // vue 2
    __VUE_DEVTOOLS_GLOBAL_HOOK__.emit(
      "init",
      (app.__vue__.__proto__.__proto__.constructor.config.devtools = true) &&
        app.__vue__.__proto__.__proto__.constructor
    );
  }
};

onMounted(() => {
  insertScript();
});
</script>

<style lang="less">
.van-floating-bubble {
  &.bubble {
    width: 30px;
    height: 30px;
    z-index: 11111111111;
    .van-floating-bubble__icon {
      font-size: 16px;
    }
  }
}
</style>
