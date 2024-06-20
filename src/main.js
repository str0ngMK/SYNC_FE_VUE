import { createApp } from "vue";
import App from "./App.vue";
// import index from "./views/index.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
// import { loadFonts } from "./plugins/webfontloader";

// loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");
// createApp(index).use(vuetify).use(router).mount("#app");
// vue.use(vuetify).use(router).mount("#app");
