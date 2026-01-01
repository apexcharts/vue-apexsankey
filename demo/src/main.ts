import "apexsankey";

import { createApp } from "vue";

import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// import example views
import BasicExample from "./views/BasicExample.vue";
import CustomFonts from "./views/CustomFonts.vue";
import EdgeOptions from "./views/EdgeOptions.vue";
import NodeCustomization from "./views/NodeCustomization.vue";
import NodeOrdering from "./views/NodeOrdering.vue";
import TooltipExample from "./views/TooltipExample.vue";
import ReactiveData from "./views/ReactiveData.vue";
import RefExample from "./views/RefExample.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "basic", component: BasicExample },
    { path: "/custom-fonts", name: "custom-fonts", component: CustomFonts },
    { path: "/edge-options", name: "edge-options", component: EdgeOptions },
    {
      path: "/node-customization",
      name: "node-customization",
      component: NodeCustomization,
    },
    { path: "/node-ordering", name: "node-ordering", component: NodeOrdering },
    { path: "/tooltip", name: "tooltip", component: TooltipExample },
    { path: "/reactive", name: "reactive", component: ReactiveData },
    { path: "/ref", name: "ref", component: RefExample },
  ],
});

createApp(App).use(router).mount("#app");
