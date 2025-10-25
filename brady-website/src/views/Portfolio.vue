<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import localProjects from '../data/projects_client.json';

// Filter state
const activeFilter = ref('all');
const isLoading = ref(true);
// Segment and year filters
const selectedSegment = ref('all'); // 'all' | 'current' | 'past'
const selectedYear = ref('all'); // 'all' | numeric string like '2024'

// Project data
const projects = ref([]);
const error = ref(null);

// (Removed unused image helpers)

// Force local loading for now (overrides env flag)
const useLocal = true

// Map all assets to URLs (eager) for robust resolution with spaces in paths
// Keys look like '../assets/eng services/painting.jpg'
const assetUrls = import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp,gif}', { eager: true, as: 'url' })

function resolveAsset(rel) {
  if (!rel) return undefined;
  const raw = `../assets/${rel}`;
  // Try direct key
  if (assetUrls[raw]) return assetUrls[raw];
  // Try decoded
  const dec = decodeURI(rel);
  if (assetUrls[`../assets/${dec}`]) return assetUrls[`../assets/${dec}`];
  // Try encoded
  const enc = encodeURI(rel);
  if (assetUrls[`../assets/${enc}`]) return assetUrls[`../assets/${enc}`];
  // Fallback to URL constructor
  try { return new URL(`../assets/${enc}`, import.meta.url).href } catch { /* noop */ }
  try { return new URL(`../assets/${rel}`, import.meta.url).href } catch { /* noop */ }
  return undefined;
}

// Placeholder projects (will be replaced with Firebase data)
const placeholderProjects = [
  {
    id: '1',
    title: 'Modern Office Complex',
    category: 'engineering',
    subcategory: 'Mechanical Engineering',
    description: 'Complete mechanical engineering design for a 10-story office building, including HVAC, plumbing, and fire protection systems.',
    client: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    year: '2023',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '2',
    title: 'Luxury Apartment Interior',
    category: 'interior',
    subcategory: 'Residential',
    description: 'Complete interior design for a luxury penthouse apartment, featuring custom furniture, high-end finishes, and smart home integration.',
    client: 'Private Client',
    location: 'New York, NY',
    year: '2023',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '3',
    title: 'Commercial Retail Center',
    category: 'engineering',
    subcategory: 'Electrical Engineering',
    description: 'Electrical engineering design for a large retail center, including power distribution, lighting, and emergency systems.',
    client: 'Retail Ventures LLC',
    location: 'Chicago, IL',
    year: '2022',
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '4',
    title: 'Corporate Headquarters Redesign',
    category: 'interior',
    subcategory: 'Commercial',
    description: 'Interior redesign of a corporate headquarters, focusing on creating a modern, collaborative workspace that reflects the company brand.',
    client: 'Global Innovations',
    location: 'Seattle, WA',
    year: '2022',
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '5',
    title: 'Residential Smart Home',
    category: 'engineering',
    subcategory: 'Electronics and Communication',
    description: 'Complete smart home system design and implementation for a luxury residence, including audio-visual, security, and automation systems.',
    client: 'Private Client',
    location: 'Miami, FL',
    year: '2023',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '6',
    title: 'Boutique Hotel Renovation',
    category: 'interior',
    subcategory: 'Commercial',
    description: 'Interior design for the renovation of a boutique hotel, including guest rooms, lobby, restaurant, and common areas.',
    client: 'Luxury Stays Inc.',
    location: 'Austin, TX',
    year: '2022',
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Selected project for modal
const selectedProject = ref(null);
const isModalOpen = ref(false);
const currentImageIndex = ref(0);

// Helper: Format title - only first letter capitalized, rest lowercase
function formatTitle(str) {
  if (!str || typeof str !== 'string') return str;
  const s = str.trim();
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// Modal actions
const openProjectModal = (project) => {
  // Ensure images are present; if not, resolve from imagePaths now
  let imgs = Array.isArray(project.images) ? project.images.slice() : []
  if (!imgs.length && Array.isArray(project.imagePaths)) {
    imgs = project.imagePaths.map(rel => resolveAsset(rel)).filter(Boolean)
  }
  const enriched = { ...project, images: imgs }
  if (import.meta.env.DEV) {
    console.log('[Portfolio] Opening modal for', enriched.title, 'images:', enriched.images)
  }
  selectedProject.value = enriched
  currentImageIndex.value = 0
  isModalOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.classList.add('overflow-hidden')
  }
}

const closeProjectModal = () => {
  isModalOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.classList.remove('overflow-hidden')
  }
  setTimeout(() => { selectedProject.value = null }, 200)
}

const nextImage = () => {
  if (!selectedProject.value) return
  const imgs = Array.isArray(selectedProject.value.images) ? selectedProject.value.images : []
  if (!imgs.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % imgs.length
}

const prevImage = () => {
  if (!selectedProject.value) return
  const imgs = Array.isArray(selectedProject.value.images) ? selectedProject.value.images : []
  if (!imgs.length) return
  currentImageIndex.value = (currentImageIndex.value - 1 + imgs.length) % imgs.length
}

const handleKeyDown = (e) => {
  if (!isModalOpen.value) return
  if (e.key === 'Escape') closeProjectModal()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  // Ensure data loads and keyboard navigation binds
  try { fetchProjects() } catch (e) {}
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

// Filter projects based on active filter
const filteredProjects = computed(() => {
  // start from all
  let list = projects.value.slice();
  // category filter (skip special maintenance template)
  if (activeFilter.value !== 'all' && activeFilter.value !== 'maintenance') {
    list = list.filter(p => p.category === activeFilter.value);
  }
  // segment filter
  if (selectedSegment.value === 'current') {
    list = list.filter(p => String(p.year || '').includes('Present'));
  } else if (selectedSegment.value === 'past') {
    list = list.filter(p => !String(p.year || '').includes('Present'));
  }
  // year filter
  if (selectedYear.value !== 'all') {
    list = list.filter(p => String(p.year || '').includes(selectedYear.value));
  }
  return list;
});

// Maintenance view data (all loaded projects are client-provided now)
const maintenanceCurrent = computed(() =>
  projects.value.filter(p => String(p.year || '').includes('Present'))
)

const maintenancePast = computed(() =>
  projects.value.filter(p => !String(p.year || '').includes('Present'))
)

// Available years for dropdown (extract the starting year)
const availableYears = computed(() => {
  const years = new Set();
  for (const p of projects.value) {
    const match = String(p.year || '').match(/\b(20\d{2}|19\d{2})/);
    if (match) years.add(match[1]);
  }
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
})

// Maintenance filtered lists by selectedYear (if not 'all')
const maintenanceCurrentFiltered = computed(() => {
  let list = maintenanceCurrent.value
  if (selectedYear.value !== 'all') {
    list = list.filter(p => String(p.year || '').includes(selectedYear.value))
  }
  return list
})

const maintenancePastFiltered = computed(() => {
  let list = maintenancePast.value
  if (selectedYear.value !== 'all') {
    list = list.filter(p => String(p.year || '').includes(selectedYear.value))
  }
  return list
})

// Fetch projects from Firebase
const fetchProjects = async () => {
  try {
    isLoading.value = true;
    // If flag is set, load from local JSON/assets and return
    if (useLocal) {
      loadFromLocal();
      return;
    }

    // Example Firebase implementation (commented out for now)
    /*
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    const projectsList = [];
    
    for (const doc of projectsSnapshot.docs) {
      const projectData = doc.data();
      
      // Get image URLs from Firebase Storage
      const imageUrls = [];
      for (const imagePath of projectData.imagePaths || []) {
        try {
          const imageRef = storageRef(getStorage(), imagePath);
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
        } catch (err) {
          console.error(`Error getting image URL for ${imagePath}:`, err);
        }
      }
      
      projectsList.push({
        id: doc.id,
        ...projectData,
        images: imageUrls.length > 0 ? imageUrls : projectData.images || []
      });
    }
    
    projects.value = projectsList;
    */
    // Temporary: until Firebase is fully configured, use local as default
    loadFromLocal();
  } catch (err) {
    console.error('Error fetching projects:', err);
    // On any error, fall back to local
    loadFromLocal();
  } finally {
    isLoading.value = false;
  }
};

// Helper: load local JSON and resolve images from src/assets
function loadFromLocal() {
  try {
    const resolved = (localProjects || []).map(p => {
      const images = Array.isArray(p.imagePaths)
        ? p.imagePaths.map(rel => resolveAsset(rel)).filter(Boolean)
        : Array.isArray(p.images)
          ? p.images
          : []
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        subcategory: p.subcategory,
        description: p.description,
        client: p.client,
        location: p.location,
        year: p.year,
        images,
        imagePaths: p.imagePaths || []
      }
    })
    projects.value = resolved
    if (import.meta.env.DEV) {
      // Minimal debug: log first two projects' titles and number of images
      console.log('[Portfolio] Loaded local projects:', projects.value.slice(0, 2).map(p => ({ title: p.title, images: p.images?.length })))
    }
    error.value = null
  } catch (e) {
    console.error('Failed to load local projects:', e)
    projects.value = []
    error.value = 'Failed to load local projects.'
  } finally {
    isLoading.value = false
  }
}

// Set active filter
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// (Removed duplicate modal handlers and lifecycle block below to avoid redeclaration)

// Fallback image handler for broken/empty images
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=60'
const onImgError = (e) => {
  if (e && e.target) {
    if (import.meta.env.DEV) {
      try {
        const failedSrc = e.target.currentSrc || e.target.src
        const alt = e.target.alt || ''
        console.warn('[Portfolio] Image failed to load:', { src: failedSrc, alt })
      } catch {}
    }
    e.target.src = FALLBACK_IMG
  }
}
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
    <!-- Hero Background Image -->
    <div class="absolute inset-0">
      <div 
        class="w-full h-full bg-center bg-cover opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=60');"
      ></div>
    </div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="portfolio-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#portfolio-pattern)" />
      </svg>
    </div>
    <div class="absolute top-0 left-0 w-full h-1 bg-brady-gold opacity-70"></div>
    <div class="absolute bottom-0 right-0 w-1/4 h-1 bg-brady-gold opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Portfolio</h1>
        <p class="text-xl text-gray-300 mb-8">
          Explore our diverse range of engineering and interior design projects that showcase our expertise and commitment to excellence.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/contact" class="btn-primary">Book Appointment</router-link>
          <a href="#portfolio-grid" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">Browse Projects</a>
        </div>

      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center mb-4">
        <button @click="setFilter('all')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'all' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">All Projects</button>
        <button @click="setFilter('engineering')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'engineering' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Engineering</button>
        <button @click="setFilter('interior')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'interior' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Interior Design</button>
        <button @click="setFilter('maintenance')" :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', activeFilter === 'maintenance' ? 'bg-brady-gold text-white' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Maintenance</button>
      </div>

      <!-- Segment + Year controls (hidden for maintenance view) -->
      <div v-if="activeFilter !== 'maintenance'" class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div class="inline-flex rounded-md overflow-hidden border border-brady-gray-700">
          <button @click="selectedSegment = 'all'" :class="['px-4 py-2 text-sm', selectedSegment === 'all' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">All</button>
          <button @click="selectedSegment = 'current'" :class="['px-4 py-2 text-sm', selectedSegment === 'current' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Current</button>
          <button @click="selectedSegment = 'past'" :class="['px-4 py-2 text-sm', selectedSegment === 'past' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Past</button>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-400">Year</label>
          <select v-model="selectedYear" class="bg-brady-gray-800 text-gray-200 border border-brady-gray-700 px-3 py-2 text-sm">
            <option value="all">All</option>
            <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brady-gold"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p class="text-lg text-gray-300">{{ error }}</p>
        <button @click="fetchProjects" class="mt-4 btn-primary">Try Again</button>
      </div>

      <!-- Maintenance View -->
      <div v-else-if="activeFilter === 'maintenance'">
        <!-- Controls for Maintenance -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div class="inline-flex rounded-md overflow-hidden border border-brady-gray-700">
            <button @click="selectedSegment = 'all'" :class="['px-4 py-2 text-sm', selectedSegment === 'all' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">All</button>
            <button @click="selectedSegment = 'current'" :class="['px-4 py-2 text-sm', selectedSegment === 'current' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Current</button>
            <button @click="selectedSegment = 'past'" :class="['px-4 py-2 text-sm', selectedSegment === 'past' ? 'bg-brady-gold text-brady-darker' : 'bg-brady-gray-800 text-gray-300 hover:bg-brady-gray-700']">Past</button>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-400">Year</label>
            <select v-model="selectedYear" class="bg-brady-gray-800 text-gray-200 border border-brady-gray-700 px-3 py-2 text-sm">
              <option value="all">All</option>
              <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-12">
          <!-- Current -->
          <div v-if="selectedSegment !== 'past' && maintenanceCurrentFiltered.length">
            <div class="hidden"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div v-for="project in maintenanceCurrentFiltered" :key="project.id" class="group cursor-pointer" @click="openProjectModal(project)">
                <div class="relative overflow-hidden rounded-lg mb-4 h-72 bg-gradient-to-br from-[#14110F] via-[#1B1714] to-[#23201A] border-b-2 border-brady-gold">
                  <div v-if="String(project.year || '').includes('Present')" class="absolute top-3 left-3 z-20"><span class="px-2 py-1 text-xs font-semibold bg-brady-gold text-brady-darker tracking-wide">Current</span></div>
                  <!-- Client logo / initials at top-left -->
                  <div class="absolute top-5 left-5 z-10">
                    <div class="w-12 h-12 rounded-md border border-brady-gold/70 bg-brady-dark/60 overflow-hidden flex items-center justify-center">
                      <img v-if="project.clientLogoUrl" :src="project.clientLogoUrl" :alt="project.client + ' logo'" class="w-full h-full object-contain p-1" @error="$event.target.style.display='none'" />
                      <span v-else class="text-brady-gold text-sm font-semibold px-1">{{ (project.client || ' ').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="absolute inset-2 rounded-md border border-brady-gold/10 pointer-events-none"></div>
                  <div class="absolute top-2 right-2 w-4 h-4 bg-brady-gold/20 rotate-45 pointer-events-none"></div>
                  <!-- Icon box moved to top-right (inside frame) -->
                  <div class="absolute top-5 right-5 w-12 h-12 rounded-md border border-brady-gold text-brady-gold bg-brady-dark/40 flex items-center justify-center">
                    <svg v-if="/Solar/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 4.95l-1.414-1.414M7.464 7.464L6.05 6.05m11.314 0l-1.414 1.414M7.464 16.536L6.05 17.95M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    <svg v-else-if="/Security/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <svg v-else-if="/(EV|Charger|Electrical)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <svg v-else-if="/(Maintenance|M&E|Network|Communication|Lift|Plumbing)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V10"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  
                  <div class="absolute inset-x-0 bottom-0 z-10 p-5 pr-7 bg-gradient-to-t from-[rgba(20,17,15,0.92)] via-[rgba(20,17,15,0.6)] to-transparent min-h-[60%] flex items-end">
                    <div class="flex items-start justify-between gap-4 w-full">
                      <div class="flex items-start gap-0 min-w-0">
                        <div class="min-w-0">
                          <div class="text-xs tracking-wide text-brady-gold/90">{{ project.subcategory }}</div>
                          <h3 class="mt-1 text-white font-normal text-xl leading-snug font-heading line-clamp-2">{{ formatTitle(project.title) }}</h3>
                          <p class="mt-2 text-sm text-gray-200 leading-relaxed line-clamp-2" v-if="project.description">{{ project.description }}</p>
                          <div class="mt-1 text-xs text-gray-400 truncate"><span class="text-gray-400">Client:</span> {{ project.client }}<span class="mx-2 opacity-40">•</span><span class="text-gray-400">Year:</span> {{ project.year }}</div>
                        </div>
                      </div>
                      <div class="shrink-0 self-center mr-1">
                        <button @click.stop="openProjectModal(project)" aria-label="View Project" class="group w-10 h-10 rounded-full border border-brady-gold text-brady-gold flex items-center justify-center hover:bg-brady-gold hover:text-brady-darker transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Past -->
          <div v-if="selectedSegment !== 'current' && maintenancePastFiltered.length">
            <!-- Title removed per request -->
            <div class="hidden"></div>
            <div id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="project in maintenancePastFiltered" :key="project.id" class="group cursor-pointer" @click="openProjectModal(project)">
                <div class="relative overflow-hidden rounded-lg mb-4 h-72 bg-gradient-to-br from-[#0B0B0C] via-[#121214] to-[#1A1A1D] border-b-2 border-brady-gold">
                  <div v-if="String(project.year || '').includes('Present')" class="absolute top-3 left-3 z-10"><span class="px-2 py-1 text-xs font-semibold bg-brady-gold text-brady-darker tracking-wide">Current</span></div>
                  <div class="absolute inset-2 rounded-md border border-brady-gold/10 pointer-events-none"></div>
                  <div class="absolute top-2 right-2 w-4 h-4 bg-brady-gold/20 rotate-45 pointer-events-none"></div>
                  <!-- Icon box in top-right for past, consistent with current/default -->
                  <div class="absolute top-5 right-5 w-12 h-12 rounded-md border border-brady-gold text-brady-gold bg-brady-dark/40 flex items-center justify-center">
                    <svg v-if="/Solar/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 4.95l-1.414-1.414M7.464 7.464L6.05 6.05m11.314 0l-1.414 1.414M7.464 16.536L6.05 17.95M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    <svg v-else-if="/Security/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <svg v-else-if="/(EV|Charger|Electrical)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <svg v-else-if="/(Maintenance|M&E|Network|Communication|Lift|Plumbing)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V10"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div class="absolute inset-x-0 bottom-0 z-10 p-5 pr-7 bg-gradient-to-t from-[rgba(20,17,15,0.92)] via-[rgba(20,17,15,0.6)] to-transparent">
                    <div class="flex items-start justify-between gap-4 w-full">
                      <div class="flex items-start gap-0 min-w-0">
                        <div class="min-w-0">
                          <div class="text-xs tracking-wide text-brady-gold/90">{{ project.subcategory }}</div>
                          <h3 class="mt-1 text-white font-normal text-xl leading-snug font-heading line-clamp-2">{{ formatTitle(project.title) }}</h3>
                          <p class="mt-1 text-sm text-gray-300 line-clamp-2" v-if="project.description">{{ project.description }}</p>
                          <div class="mt-1 text-xs text-gray-400 truncate"><span class="text-gray-400">Client:</span> {{ project.client }}<span class="mx-2 opacity-40">•</span><span class="text-gray-400">Year:</span> {{ project.year }}</div>
                        </div>
                      </div>
                      <div class="shrink-0 self-center mr-1">
                        <button @click.stop="openProjectModal(project)" aria-label="View Project" class="group w-10 h-10 rounded-full border border-brady-gold text-brady-gold flex items-center justify-center hover:bg-brady-gold hover:text-brady-darker transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Default Grid -->
      <div v-else id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id" class="group cursor-pointer" @click="openProjectModal(project)">
          <div class="relative overflow-hidden rounded-lg mb-4 h-64 bg-gradient-to-br from-[#14110F] via-[#1B1714] to-[#23201A] border-b-2 border-brady-gold">
            <div v-if="String(project.year || '').includes('Present')" class="absolute top-3 left-3 z-10"><span class="px-2 py-1 text-xs font-semibold bg-brady-gold text-brady-darker tracking-wide">Current</span></div>
            <div class="absolute inset-2 rounded-md border border-brady-gold/10 pointer-events-none"></div>
            <div class="absolute top-2 right-2 w-4 h-4 bg-brady-gold/20 rotate-45 pointer-events-none"></div>
            <div class="absolute top-4 right-4 w-12 h-12 rounded-md border border-brady-gold text-brady-gold bg-brady-dark/40 flex items-center justify-center">
              <svg v-if="/Solar/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 4.95l-1.414-1.414M7.464 7.464L6.05 6.05m11.314 0l-1.414 1.414M7.464 16.536L6.05 17.95M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <svg v-else-if="/Security/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg v-else-if="/(EV|Charger|Electrical)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <svg v-else-if="/(Maintenance|M&E|Network|Communication|Lift|Plumbing)/i.test(project.subcategory || '')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V10"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div class="absolute inset-x-0 bottom-0 z-10 p-5 pr-7 bg-gradient-to-t from-[rgba(20,17,15,0.92)] via-[rgba(20,17,15,0.6)] to-transparent min-h-[60%] flex items-end">
              <div class="flex items-start justify-between gap-4 w-full">
                <div class="flex items-start gap-0 min-w-0">
                  <div class="min-w-0">
                    <div class="text-xs tracking-wide text-brady-gold/90">{{ project.subcategory }}</div>
                    <h3 class="mt-1 text-white font-normal text-xl leading-snug font-heading line-clamp-2">{{ formatTitle(project.title) }}</h3>
                    <p class="mt-2 text-sm text-gray-200 leading-relaxed line-clamp-2" v-if="project.description">{{ project.description }}</p>
                    <div class="mt-1 text-xs text-gray-400 truncate"><span class="text-gray-400">Client:</span> {{ project.client }}<span class="mx-2 opacity-40">•</span><span class="text-gray-400">Year:</span> {{ project.year }}</div>
                  </div>
                </div>
                <div class="shrink-0 self-center mr-1">
                  <button @click.stop="openProjectModal(project)" aria-label="View Project" class="group w-10 h-10 rounded-full border border-brady-gold text-brady-gold flex items-center justify-center hover:bg-brady-gold hover:text-brady-darker transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  
  <!-- Project Modal -->
  <transition name="fade">
    <div v-if="isModalOpen && selectedProject" class="fixed inset-0 z-50">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70" @click="closeProjectModal"></div>

      <!-- Dialog -->
      <div class="relative z-10 max-w-5xl mx-auto mt-16 mb-10 bg-brady-darker border border-brady-gold/30 shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-brady-gold/20 bg-brady-dark">
          <div class="min-w-0 pr-4">
            <div class="text-xs tracking-wide text-brady-gold/90">{{ selectedProject.subcategory }}</div>
            <h3 class="text-white font-medium text-xl truncate">{{ selectedProject.title }}</h3>
          </div>
          <button @click="closeProjectModal" aria-label="Close" class="text-gray-300 hover:text-white">✕</button>
        </div>

        <!-- Content -->
        <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Image area -->
          <div class="relative bg-brady-dark/40 border border-brady-gray-700 h-72 md:h-96 flex items-center justify-center overflow-hidden">
            <img 
              v-if="Array.isArray(selectedProject.images) && selectedProject.images.length"
              :src="selectedProject.images[currentImageIndex]"
              :alt="selectedProject.title"
              class="w-full h-full object-cover"
              @error="onImgError"
            />
            <div v-else class="text-gray-400">No images available</div>

            <!-- Nav arrows -->
            <button @click.stop="prevImage" class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brady-dark/70 border border-brady-gold text-brady-gold flex items-center justify-center"> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click.stop="nextImage" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brady-dark/70 border border-brady-gold text-brady-gold flex items-center justify-center"> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <!-- Details -->
          <div>
            <p v-if="selectedProject.description" class="text-gray-300 mb-4">{{ selectedProject.description }}</p>
            <div class="space-y-1 text-sm text-gray-300">
              <div><span class="text-gray-400">Client:</span> {{ selectedProject.client }}</div>
              <div v-if="selectedProject.location"><span class="text-gray-400">Location:</span> {{ selectedProject.location }}</div>
              <div><span class="text-gray-400">Year:</span> {{ selectedProject.year }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-x-auto {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
