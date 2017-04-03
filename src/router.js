import Vue from 'vue';
import VueRouter from 'vue-router';

import Payouts from './components/Payouts';
import Config from './components/Config';
import About from './components/About';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/', redirect: '/payouts' },
    { path: '/payouts', name: 'Payouts', component: Payouts },
    { path: '/config', name: 'Config', component: Config },
    { path: '/about', name: 'About', component: About }
  ]
});

export default router;
