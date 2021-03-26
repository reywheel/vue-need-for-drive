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
        path: "location",
        name: "orderLocation",
        component: () => import("@/components/order/OrderLocation")
      },
      {
        path: "model",
        name: "orderModel",
        component: () => import("@/components/order/OrderModel")
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
