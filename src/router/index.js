import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/List"),
  },
  {
    path: "/master",
    name: "Master",
    component: () => import("@/views/Master"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/views/My"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/search/Search"),
    redirect: 'search/search_index',
    children: [
      {
        path: "search_index",
        name: "searchIndex",
        component: () => import("@/views/search/search-index"),
      },
      {
        path: "search_list",
        name: "searchList",
        component: () => import("@/views/search/search-list"),
      }
    ]
  },
  {
    path: "/detail",
    name: "Detail",
    meta: {
      keepAlive: true,
    },
    component: () => import("@/components/detail/index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/user_login",
    name: "userLogin",
    component: () => import("@/views/login/userLogin"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/login/Register"),
  },
  {
    path: "/retrieve",
    name: "Retrieve",
    component: () => import("@/views/login/retrieve/Retrieve"),
    redirect: 'retrieve/retrieve_index',
    children: [
      {
        path: "retrieve_index",
        name: "retrieveIndex",
        component: () => import("@/views/login/retrieve/retrieve-index"),
      },
      {
        path: "retrieve_next",
        name: "retrieveNext",
        component: () => import("@/views/login/retrieve/retrieve-next"),
      }
    ]
  },
  {
    path: "/address",
    name: "Address",
    component: () => import("@/views/address/Address"),
    redirect: 'address/address_index',
    children: [
      {
        path: "address_index",
        name: "addressIndex",
        component: () => import("@/views/address/address-index"),
      },
      {
        path: "address_list",
        name: "addressList",
        component: () => import("@/views/address/address-list"),
      }
    ]
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("@/views/order/Order"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("@/views/payment/index"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 设置权限
router.beforeEach((to, from, next) => {
  // 未登录状态下禁止进入的页面
  let nextRoute = ['Cart', 'Address', 'addressIndex', 'addressList', 'Order', 'Payment']

  // 判断是否是登录中
  let userInfo = localStorage.getItem('userInfo')

  // 当前进入的页面，是需要验证的页面？ 
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!userInfo) {
      router.push('/user_login')
    }
  }

  next()
})

//解决编程式路由往同一地址跳转时会报错的情况 Navigation cancelled from "/my" to "/address/address_index" with a new navigation
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};


export default router;
