import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import directivesPlugins from "./plugins/directives";
import "./style.css";
import App from "./App.vue";
import Icon from "./components/common/Icon.vue";
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(directivesPlugins);

app.component("Icon", Icon);

app.mount("#app");
