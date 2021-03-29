import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import store from "@/store/index";
import { getterTypes } from "@/store/order";

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
    name: "orderStart",
    component: () => import("@/views/OrderPage"),
    props: route => ({ id: +route.params.id }),
    children: [
      {
        path: "location",
        name: "orderLocation",
        component: () => import("@/components/order/OrderLocation")
      },
      {
        path: "model",
        name: "orderModel",
        component: () => import("@/components/order/OrderModel"),
        beforeEnter: (to, from, next) => {
          store.getters[getterTypes.isLocationFilled]
            ? next()
            : next({ name: "orderLocation" });
        }
      },
      {
        path: "additionally",
        name: "orderAdditionally",
        component: () => import("@/components/order/OrderAdditionally"),
        beforeEnter: (to, from, next) => {
          store.getters[getterTypes.isModelFilled]
            ? next()
            : next({ name: "orderLocation" });
        }
      },
      {
        path: "total",
        name: "orderTotal",
        component: () => import("@/components/order/OrderTotal"),
        beforeEnter: (to, from, next) => {
          store.getters[getterTypes.isAdditionallyFilled]
            ? next()
            : next({ name: "orderLocation" });
        }
      },
      {
        path: ":id",
        name: "order",
        component: () => import("@/components/order/OrderTotal"),
        props: route => ({ id: +route.params.id })
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
