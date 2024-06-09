import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import directivesPlugins from "./plugins/directives";
import tooltipPlugins from "./plugins/tooltip";
import "./style.css";
import App from "./App.vue";
import Icon from "./components/common/Icon.vue";
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(directivesPlugins);
app.use(tooltipPlugins);

app.component("Icon", Icon);

app.mount("#app");
