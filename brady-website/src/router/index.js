// Define routes for the application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Brady - Home' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: 'Brady - About Us' }
  },
  {
    path: '/engineering-services',
    name: 'EngineeringServices',
    component: () => import('../views/EngineeringServices.vue'),
    meta: { title: 'Brady - Engineering Services' }
  },
  {
    path: '/interior-services',
    name: 'InteriorServices',
    component: () => import('../views/InteriorServices.vue'),
    meta: { title: 'Brady - Interior Services' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio.vue'),
    meta: { title: 'Brady - Portfolio' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { title: 'Admin - Portfolio', requiresAuth: true }
  },
  {
    path: '/case-studies',
    name: 'CaseStudies',
    component: () => import('../views/CaseStudies.vue'),
    meta: { title: 'Brady - Blog' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Brady - Contact Us' }
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Brady - Page Not Found' }
  }
]

export default routes
