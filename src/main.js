import "@/styles/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { installToast } from "@/composables/useToast";

const app = createApp(App);

installToast(app);
app.use(router);
app.mount("#app");
