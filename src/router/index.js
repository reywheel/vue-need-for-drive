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
    redirect: { name: "orderLocation" },
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
      },
      {
        path: "additionally",
        name: "orderAdditionally",
        component: () => import("@/components/order/OrderAdditionally")
      },
      {
        path: "total",
        name: "orderTotal",
        component: () => import("@/components/order/OrderTotal")
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
