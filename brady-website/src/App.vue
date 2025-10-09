<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import logoUrl from './assets/brady_logo_trans.png'

// Navbar state
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Route handling
const route = useRoute()
const router = useRouter()

// Page-level navigation loading state
const isNavigating = ref(false)

// Update page title based on route meta
watch(() => route.meta.title, (newTitle) => {
  if (newTitle) {
    document.title = newTitle
  }
})

// Check scroll position for navbar styling
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Set initial title
  if (route.meta.title) {
    document.title = route.meta.title
  }

  // Navigation hooks for loading indicator
  router.beforeEach((to, from, next) => {
    isNavigating.value = true
    next()
  })
  router.afterEach(() => {
    // small delay to allow view to mount
    setTimeout(() => {
      isNavigating.value = false
    }, 150)
  })
})

// Handle scroll event for navbar styling
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <!-- Navbar -->
  <header :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6']">
    <div class="container mx-auto px-4 md:px-6">
      <nav class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img :src="logoUrl" alt="Brady Interiors" class="h-16 md:h-20 w-auto" />
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Home</router-link>
          <router-link to="/about" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">About</router-link>
          <router-link to="/engineering-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Engineering</router-link>
          <router-link to="/interior-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Interior</router-link>
          <router-link to="/portfolio" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Portfolio</router-link>
          <router-link to="/case-studies" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Case Studies</router-link>
          <router-link to="/contact" class="btn-primary">Contact Us</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-brady-charcoal focus:outline-none">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4 bg-brady-darker/95 text-white backdrop-blur border border-brady-gray-700 shadow-xl rounded-md px-4">
        <div class="flex flex-col space-y-4">
          <router-link @click="isMenuOpen = false" to="/" class="text-white hover:text-brady-gold font-medium transition-colors">Home</router-link>
          <router-link @click="isMenuOpen = false" to="/about" class="text-white hover:text-brady-gold font-medium transition-colors">About</router-link>
          <router-link @click="isMenuOpen = false" to="/engineering-services" class="text-white hover:text-brady-gold font-medium transition-colors">Engineering</router-link>
          <router-link @click="isMenuOpen = false" to="/interior-services" class="text-white hover:text-brady-gold font-medium transition-colors">Interior</router-link>
          <router-link @click="isMenuOpen = false" to="/portfolio" class="text-white hover:text-brady-gold font-medium transition-colors">Portfolio</router-link>
          <router-link @click="isMenuOpen = false" to="/case-studies" class="text-white hover:text-brady-gold font-medium transition-colors">Case Studies</router-link>
          <router-link @click="isMenuOpen = false" to="/contact" class="btn-primary inline-block text-center">Contact Us</router-link>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="relative">
    <!-- Page loading overlay -->
    <div v-if="isNavigating" class="fixed inset-0 z-40">
      <div class="absolute inset-0 bg-brady-darker/70 backdrop-blur-[2px]"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 border-2 border-brady-gold border-t-transparent rounded-full animate-spin"></div>
          <div class="mt-3 text-sm text-white tracking-wider">Loading...</div>
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>

  <!-- Footer -->
  <footer class="bg-brady-darker text-white">
    <!-- Decorative top divider -->
    <div class="w-full h-1 bg-gradient-to-r from-brady-gold via-brady-gold-light to-brady-gold/70 opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 py-14">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand / About -->
        <div>
          <div class="flex items-center mb-4">
            <img :src="logoUrl" alt="Brady Interiors" class="h-12 w-auto" />
          </div>
          <p class="text-gray-300 mb-6">Engineering, interior design, and builder software engineering—delivered with excellence and integrity.</p>
          <div class="flex items-center gap-3">
            <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center bg-brady-gray-900 border border-brady-gray-700 text-white hover:bg-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center bg-brady-gray-900 border border-brady-gray-700 text-white hover:bg-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center bg-brady-gray-900 border border-brady-gray-700 text-white hover:bg-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center bg-brady-gray-900 border border-brady-gray-700 text-white hover:bg-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/></svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-brady-gold">Services</h3>
          <ul class="space-y-2">
            <li><router-link to="/engineering-services" class="text-gray-300 hover:text-white transition-colors">Engineering Services</router-link></li>
            <li><router-link to="/interior-services" class="text-gray-300 hover:text-white transition-colors">Interior Services</router-link></li>
            <li><router-link to="/portfolio" class="text-gray-300 hover:text-white transition-colors">Portfolio</router-link></li>
            <li><router-link to="/case-studies" class="text-gray-300 hover:text-white transition-colors">Case Studies</router-link></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-brady-gold">Company</h3>
          <ul class="space-y-2">
            <li><router-link to="/about" class="text-gray-300 hover:text-white transition-colors">About Us</router-link></li>
            <li><router-link to="/clients" class="text-gray-300 hover:text-white transition-colors">Clients</router-link></li>
            <li><router-link to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</router-link></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-brady-gold">Stay Updated</h3>
          <p class="text-gray-300 mb-4">Get insights, project highlights, and updates straight to your inbox.</p>
          <form @submit.prevent class="flex gap-2">
            <input type="email" placeholder="Your email address" class="w-full px-4 py-3 rounded-md bg-brady-gray-900 text-white placeholder-gray-400 border border-brady-gray-700 focus:outline-none focus:ring-1 focus:ring-brady-gold" />
            <button class="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
          <p class="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-brady-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Brady Construction. All rights reserved.</p>
        <div class="flex items-center gap-4 mt-3 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <span class="opacity-40">|</span>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          <span class="opacity-40">|</span>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Active link styles */
.router-link-active:not(.btn-primary) {
  color: var(--color-gold);
  font-weight: 600;
}

/* Add padding to account for fixed header */
main {
  padding-top: 120px;
}
</style>
