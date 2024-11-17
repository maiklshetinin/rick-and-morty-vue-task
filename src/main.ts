import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "src/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(ElementPlus).mount("#app");
