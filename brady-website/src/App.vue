<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// Navbar state
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Route handling
const route = useRoute()

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
  <header :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4']">
    <div class="container mx-auto px-4 md:px-6">
      <nav class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <span class="text-2xl font-bold text-brady-charcoal">BRADY</span>
          <span class="text-brady-gold font-medium ml-1">Construction</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Home</router-link>
          <router-link to="/about" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">About</router-link>
          <router-link to="/engineering-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Engineering</router-link>
          <router-link to="/interior-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Interior</router-link>
          <router-link to="/portfolio" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Portfolio</router-link>
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
      <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4">
        <div class="flex flex-col space-y-4">
          <router-link @click="isMenuOpen = false" to="/" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Home</router-link>
          <router-link @click="isMenuOpen = false" to="/about" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">About</router-link>
          <router-link @click="isMenuOpen = false" to="/engineering-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Engineering</router-link>
          <router-link @click="isMenuOpen = false" to="/interior-services" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Interior</router-link>
          <router-link @click="isMenuOpen = false" to="/portfolio" class="text-brady-charcoal hover:text-brady-gold font-medium transition-colors">Portfolio</router-link>
          <router-link @click="isMenuOpen = false" to="/contact" class="btn-primary inline-block text-center">Contact Us</router-link>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <!-- Footer -->
  <footer class="bg-brady-charcoal text-white py-12">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center mb-4">
            <span class="text-2xl font-bold text-white">BRADY</span>
            <span class="text-brady-gold font-medium ml-1">Construction</span>
          </div>
          <p class="text-gray-300 mb-4">Specialized in engineering, interior design, and builder software engineering services.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-brady-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-brady-gold">Quick Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-300 hover:text-white transition-colors">Home</router-link></li>
            <li><router-link to="/about" class="text-gray-300 hover:text-white transition-colors">About Us</router-link></li>
            <li><router-link to="/engineering-services" class="text-gray-300 hover:text-white transition-colors">Engineering Services</router-link></li>
            <li><router-link to="/interior-services" class="text-gray-300 hover:text-white transition-colors">Interior Services</router-link></li>
            <li><router-link to="/portfolio" class="text-gray-300 hover:text-white transition-colors">Portfolio</router-link></li>
            <li><router-link to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact Us</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-brady-gold">Contact Us</h3>
          <div class="space-y-3">
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-brady-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-gray-300">123 Construction Avenue, Building City, BC 12345</span>
            </div>
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-brady-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-gray-300">info@bradyconstruction.com</span>
            </div>
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-brady-gold mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-gray-300">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Brady Construction. All rights reserved.</p>
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
  padding-top: 80px;
}
</style>
