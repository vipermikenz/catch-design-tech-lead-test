import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LeadForm from '../components/LeadForm.vue';
import AboutPage from '../views/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/lead-form',
    name: 'LeadForm',
    component: LeadForm
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
