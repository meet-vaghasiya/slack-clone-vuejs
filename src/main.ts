import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import directivesPlugins from "./plugins/directives";
import "./style.css";
import App from "./App.vue";
import SvgContainer from "./components/common/SvgContainer.vue";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(directivesPlugins);
app.component("SvgContainer", SvgContainer);

app.mount("#app");
