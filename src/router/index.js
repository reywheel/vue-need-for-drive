import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/OrderPage"),
    children: [
      {
        path: "1",
        name: "orderStepOne",
        component: () => import("@/components/orderSteps/StepOne")
      },
      {
        path: "2",
        name: "orderStepTwo",
        component: () => import("@/components/orderSteps/StepTwo")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
