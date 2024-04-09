import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DetailModal from '../components/DetailModal.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'detail/:id',
        name: 'DetailModal',
        component: DetailModal,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;