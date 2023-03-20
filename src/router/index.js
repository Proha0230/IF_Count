import { createRouter, createWebHistory } from 'vue-router'
import AppPlayer from '../components/AppPlayer'
import AppRaitingGameList from '../components/AppRaitingGameList'
import AppPageCount from '../components/AppPageCount'
import Auth from '../components/Auth'
import Registration from '../components/Registration'
import AppHelpGame from '../components/AppHelpGame'
import AppChatPlayerList from '../components/AppChatPlayerList'


const routes = [
  {path: '/auth', name: 'auth', component: Auth, alias: '/'},
  {path: '/player/:id?', component: AppPlayer},
  {path: '/playerRait', name:'playerRait', component: AppRaitingGameList},
  {path: '/home', name: 'home' , component: AppPageCount},
  {path: '/reg', name: 'reg' , component: Registration},
  {path: '/help', name: 'help', component: AppHelpGame},
  {path: '/chat', name: 'chat', component: AppChatPlayerList},
]

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes,
linkActiveClass: 'active',
linkExactActiveClass: 'active',
})

export default router