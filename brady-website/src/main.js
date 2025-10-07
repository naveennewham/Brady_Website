import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import 'animate.css'
import App from './App.vue'
import routes from './router'
import { auth } from './firebase'

// Helper to wait for initial auth state
function waitForAuthInit() {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(() => {
      unsub()
      resolve()
    })
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  // Set document title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  // Guard protected routes
  if (to.matched.some(r => r.meta && r.meta.requiresAuth)) {
    await waitForAuthInit()
    const user = auth.currentUser
    if (!user) {
      // Allow /admin to render its built-in login UI
      if (to.name === 'Admin') {
        return next()
      }
      // Otherwise redirect unauthenticated users
      return next({ path: '/', query: { redirect: to.fullPath } })
    }
  }
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
