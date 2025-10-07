<script setup>
import { ref, onMounted, computed } from 'vue'
import logoUrl from '../assets/brady_logo_trans.png'

// Filter state
const activeFilter = ref('all')
const isLoading = ref(true)

// Case studies data (placeholder; can be wired to Firebase like Portfolio)
const studies = ref([])
const error = ref(null)

const placeholderStudies = [
  {
    id: 'cs-1',
    title: 'HVAC Optimization for Office Tower',
    category: 'engineering',
    subcategory: 'Mechanical Engineering',
    description: 'Redesigned HVAC delivering 27% energy savings and improved occupant comfort across a 10-story tower.',
    client: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    year: '2023',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
    ],
    metrics: [
      { label: 'Energy Savings', value: '27%' },
      { label: 'Comfort Score', value: '+18%' }
    ],
    tags: ['HVAC', 'Energy Modeling', 'Retrofit']
  },
  {
    id: 'cs-2',
    title: 'Smart Building Electrical Upgrade',
    category: 'engineering',
    subcategory: 'Electrical Engineering',
    description: 'Implemented smart lighting and power distribution reducing peak load by 19% and maintenance costs by 12%.',
    client: 'Retail Ventures LLC',
    location: 'Chicago, IL',
    year: '2022',
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    metrics: [
      { label: 'Peak Load', value: '-19%' },
      { label: 'Maintenance', value: '-12%' }
    ],
    tags: ['Smart Controls', 'Lighting', 'Safety']
  },
  {
    id: 'cs-3',
    title: 'Boutique Hotel Experience Redesign',
    category: 'interior',
    subcategory: 'Commercial Interior',
    description: 'Guest rooms and lobby redesign increased guest satisfaction by 24% with optimized circulation and lighting.',
    client: 'Luxury Stays Inc.',
    location: 'Austin, TX',
    year: '2022',
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
    ],
    metrics: [
      { label: 'Guest Satisfaction', value: '+24%' },
      { label: 'Check-in Time', value: '-15%' }
    ],
    tags: ['Wayfinding', 'Lighting', 'FF&E']
  }
]

// Selected study for modal
const selectedStudy = ref(null)
const isModalOpen = ref(false)
const currentImageIndex = ref(0)

// Computed filtered list
const filteredStudies = computed(() => {
  if (activeFilter.value === 'all') return studies.value
  return studies.value.filter(s => s.category === activeFilter.value)
})

// Simulated fetch
const fetchStudies = async () => {
  try {
    isLoading.value = true
    setTimeout(() => {
      studies.value = placeholderStudies
      isLoading.value = false
    }, 600)
  } catch (err) {
    console.error('Error fetching case studies:', err)
    error.value = 'Failed to load case studies. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

// Interactions
const setFilter = (filter) => { activeFilter.value = filter }
const openStudyModal = (study) => {
  selectedStudy.value = study
  currentImageIndex.value = 0
  isModalOpen.value = true
  document.body.classList.add('overflow-hidden')
}
const closeStudyModal = () => {
  isModalOpen.value = false
  document.body.classList.remove('overflow-hidden')
  setTimeout(() => { selectedStudy.value = null }, 300)
}
const nextImage = () => {
  if (selectedStudy.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedStudy.value.images.length
  }
}
const prevImage = () => {
  if (selectedStudy.value) {
    currentImageIndex.value = (currentImageIndex.value - 1 + selectedStudy.value.images.length) % selectedStudy.value.images.length
  }
}
const handleKeyDown = (event) => {
  if (!isModalOpen.value) return
  if (event.key === 'Escape') closeStudyModal()
  else if (event.key === 'ArrowRight') nextImage()
  else if (event.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  fetchStudies()
  window.addEventListener('keydown', handleKeyDown)
})

// Local fallback image
const FALLBACK_IMG = logoUrl
const onImgError = (e) => { if (e && e.target) e.target.src = FALLBACK_IMG }
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
    <div class="absolute inset-0">
      <div 
        class="w-full h-full bg-center bg-cover opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=60');"
      ></div>
    </div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="cs-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cs-pattern)" />
      </svg>
    </div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Case Studies</h1>
        <p class="text-xl text-gray-300 mb-8">
          Real outcomes from engineering and interior projects—showcasing goals, solutions, and measurable impact.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/contact" class="btn-primary">Discuss Your Project</router-link>
          <a href="#case-studies-grid" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">Browse Case Studies</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Filters + Grid -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-wrap justify-center mb-12">
        <button @click="setFilter('all')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'all' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">All</button>
        <button @click="setFilter('engineering')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'engineering' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Engineering</button>
        <button @click="setFilter('interior')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'interior' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Interior</button>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brady-gold"></div>
      </div>
      <div v-else-if="error" class="text-center py-20">
        <p class="text-lg text-gray-300">{{ error }}</p>
        <button @click="fetchStudies" class="mt-4 btn-primary">Try Again</button>
      </div>

      <div id="case-studies-grid" v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="study in filteredStudies" :key="study.id" class="group cursor-pointer" @click="openStudyModal(study)">
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img :src="study.images[0]" :alt="study.title" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" @error="onImgError">
            <div class="absolute inset-0 bg-gradient-to-t from-brady-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white font-medium px-4 py-2 rounded-md border border-white">View Case Study</span>
            </div>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-brady-gold font-medium">{{ study.subcategory }}</span>
            <span class="text-xs text-gray-500">•</span>
            <span class="text-xs text-gray-400">{{ study.year }} • {{ study.location }}</span>
          </div>
          <h3 class="text-xl font-bold text-white">{{ study.title }}</h3>
          <p class="text-gray-300 line-clamp-2">{{ study.description }}</p>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="t in study.tags" :key="t" class="text-xs px-2 py-1 rounded bg-brady-gray-800 text-gray-300 border border-brady-gray-700">{{ t }}</span>
          </div>
        </div>
      </div>

      <div v-if="!isLoading && !error && filteredStudies.length === 0" class="text-center py-20">
        <p class="text-lg text-gray-300">No case studies found in this category.</p>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brady-charcoal bg-opacity-90" @click.self="closeStudyModal">
    <div class="glass-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto" :class="{ 'animate-fade-in': isModalOpen }">
      <div class="flex justify-between items-center p-6 border-b border-brady-gray-700">
        <h3 class="text-2xl font-bold text-white">{{ selectedStudy?.title }}</h3>
        <button @click="closeStudyModal" class="text-gray-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="p-6 text-gray-300">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="relative">
            <div class="relative overflow-hidden rounded-lg">
              <img v-if="selectedStudy" :src="selectedStudy.images[currentImageIndex]" :alt="selectedStudy.title" class="w-full h-auto" @error="onImgError">
              <button v-if="selectedStudy && selectedStudy.images.length > 1" @click.stop="prevImage" class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brady-gray-800 bg-opacity-80 text-white hover:bg-brady-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button v-if="selectedStudy && selectedStudy.images.length > 1" @click.stop="nextImage" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brady-gray-800 bg-opacity-80 text-white hover:bg-brady-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div v-if="selectedStudy && selectedStudy.images.length > 1" class="flex mt-4 space-x-2 overflow-x-auto">
              <button v-for="(image, index) in selectedStudy.images" :key="index" @click.stop="currentImageIndex = index" :class="['w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2', currentImageIndex === index ? 'border-brady-gold' : 'border-transparent']">
                <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" @error="onImgError">
              </button>
            </div>
          </div>
          <div>
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-brady-gold mb-2">Summary</h4>
              <p class="text-gray-300 mb-4">{{ selectedStudy?.description }}</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div v-for="m in selectedStudy?.metrics || []" :key="m.label" class="p-3 rounded bg-brady-gray-800 border border-brady-gray-700">
                  <div class="text-sm text-gray-400">{{ m.label }}</div>
                  <div class="text-white text-xl font-semibold">{{ m.value }}</div>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <h5 class="text-sm font-medium text-gray-400">CLIENT</h5>
                  <p class="text-white">{{ selectedStudy?.client }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-400">LOCATION</h5>
                  <p class="text-white">{{ selectedStudy?.location }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-400">YEAR</h5>
                  <p class="text-white">{{ selectedStudy?.year }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-400">CATEGORY</h5>
                  <p class="text-white">{{ selectedStudy?.subcategory }}</p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <h4 class="text-lg font-semibold text-brady-gold mb-4">Tags</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="t in selectedStudy?.tags || []" :key="t" class="text-xs px-2 py-1 rounded bg-brady-gray-800 text-gray-300 border border-brady-gray-700">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-6 border-t border-brady-gray-700">
        <div class="flex justify-between">
          <router-link to="/contact" class="btn-primary">Start Your Project</router-link>
          <button @click="closeStudyModal" class="btn-outline">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
.overflow-x-auto::-webkit-scrollbar { display: none; }
.overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
</style>
