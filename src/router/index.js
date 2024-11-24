import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Counter from '@/views/Counter.vue';
import HttpDemo from '@/views/HttpDemo.vue';
import BindView from '@/views/BindView.vue';
import RouteReCreate from '@/views/RouteReCreate.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/count',
      name: 'count',
      component: Counter
    },
    {
      path: '/http',
      name: 'http',
      component: HttpDemo
    },
    {
      path: '/bind',
      name: 'bind',
      component: BindView
    },
    {
      path: '/routeReCreate',
      name: 'routeReCreate',
      component: RouteReCreate
    }
  ]
});

export default router;
