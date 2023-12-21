

<template>
  <div>
    <van-floating-bubble
      class="bubble"
      v-if="showBubble"
      :gap="0"
      axis="xy"
      icon="setting-o"
      @click="showShare = true"
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
import { onMounted, ref } from "vue";

const showShare = ref(false);
const showBubble = ref(true);
const options = [
  { name: "打印链接参数", icon: "flower-o", key: "search" },
  { name: "清除缓存", icon: "flower-o", key: "clear" },
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
    default:
    //
  }
};

const insertScript = () => {
  const scripts = [
    "https://unpkg.com/dayjs@1.8.21/dayjs.min.js",
    "https://cdn.bootcdn.net/ajax/libs/qs/6.11.1/qs.min.js",
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

onMounted(() => {
  insertScript();
});
</script>

<style lang="less">
.bubble {
  width: 30px;
  height: 30px;
  .van-floating-bubble__icon {
    font-size: 16px;
  }
}
</style>
