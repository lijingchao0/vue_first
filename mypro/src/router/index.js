import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login
  },
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/home', component: Home, redirect: '/welcome',
    children: [
    	{
        	path: '/welcome', component: Welcome
		},
		{
			path: '/users', component: Users
		},
    ]
  },
  
 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  //from 代表从那个路径跳转过来的
  //next 是一个函数，表示放行
  if (to.path == '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
