<script setup>
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

// Filter state
const activeFilter = ref('all');
const isLoading = ref(true);

// Project data
const projects = ref([]);
const error = ref(null);

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

// Filter projects based on active filter
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value;
  }
  return projects.value.filter(project => project.category === activeFilter.value);
});

// Fetch projects from Firebase
const fetchProjects = async () => {
  try {
    isLoading.value = true;
    
    // In a real implementation, this would fetch data from Firebase
    // For now, we'll use the placeholder data
    setTimeout(() => {
      projects.value = placeholderProjects;
      isLoading.value = false;
    }, 1000);

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
    
  } catch (err) {
    console.error('Error fetching projects:', err);
    error.value = 'Failed to load projects. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Set active filter
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Open project modal
const openProjectModal = (project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
  isModalOpen.value = true;
  document.body.classList.add('overflow-hidden');
};

// Close project modal
const closeProjectModal = () => {
  isModalOpen.value = false;
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
};

// Navigate to next image in modal
const nextImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedProject.value.images.length;
  }
};

// Navigate to previous image in modal
const prevImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value = (currentImageIndex.value - 1 + selectedProject.value.images.length) % selectedProject.value.images.length;
  }
};

// Handle keyboard navigation in modal
const handleKeyDown = (event) => {
  if (!isModalOpen.value) return;
  
  if (event.key === 'Escape') {
    closeProjectModal();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'ArrowLeft') {
    prevImage();
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchProjects();
  window.addEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
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
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center mb-12">
        <button 
          @click="setFilter('all')" 
          :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', 
                  activeFilter === 'all' 
                    ? 'bg-brady-gold text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          All Projects
        </button>
        <button 
          @click="setFilter('engineering')" 
          :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', 
                  activeFilter === 'engineering' 
                    ? 'bg-brady-gold text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          Engineering
        </button>
        <button 
          @click="setFilter('interior')" 
          :class="['px-6 py-2 mx-2 mb-2 rounded-md transition-colors', 
                  activeFilter === 'interior' 
                    ? 'bg-brady-gold text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          Interior Design
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brady-gold"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg text-gray-700">{{ error }}</p>
        <button @click="fetchProjects" class="mt-4 btn-primary">Try Again</button>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="group cursor-pointer"
          @click="openProjectModal(project)"
        >
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img 
              :src="project.images[0]" 
              :alt="project.title" 
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-brady-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white font-medium px-4 py-2 rounded-md border border-white">View Project</span>
            </div>
          </div>
          <span class="text-brady-gold font-medium">{{ project.subcategory }}</span>
          <h3 class="text-xl font-bold text-brady-charcoal">{{ project.title }}</h3>
          <p class="text-gray-600 line-clamp-2">{{ project.description }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && !error && filteredProjects.length === 0" class="text-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-lg text-gray-700">No projects found in this category.</p>
      </div>
    </div>
  </section>

  <!-- Project Modal -->
  <div 
    v-if="isModalOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brady-charcoal bg-opacity-90"
    @click.self="closeProjectModal"
  >
    <div 
      class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      :class="{ 'animate-fade-in': isModalOpen }"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h3 class="text-2xl font-bold text-brady-charcoal">{{ selectedProject?.title }}</h3>
        <button @click="closeProjectModal" class="text-gray-500 hover:text-brady-charcoal transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Image Gallery -->
          <div class="relative">
            <div class="relative overflow-hidden rounded-lg">
              <img 
                v-if="selectedProject" 
                :src="selectedProject.images[currentImageIndex]" 
                :alt="selectedProject.title" 
                class="w-full h-auto"
              >

              <!-- Navigation Arrows -->
              <button 
                v-if="selectedProject && selectedProject.images.length > 1"
                @click.stop="prevImage" 
                class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                v-if="selectedProject && selectedProject.images.length > 1"
                @click.stop="nextImage" 
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Thumbnails -->
            <div v-if="selectedProject && selectedProject.images.length > 1" class="flex mt-4 space-x-2 overflow-x-auto">
              <button 
                v-for="(image, index) in selectedProject.images" 
                :key="index"
                @click.stop="currentImageIndex = index"
                :class="['w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2', 
                        currentImageIndex === index ? 'border-brady-gold' : 'border-transparent']"
              >
                <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover">
              </button>
            </div>
          </div>

          <!-- Project Details -->
          <div>
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-brady-gold mb-2">Project Details</h4>
              <p class="text-gray-700 mb-4">{{ selectedProject?.description }}</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <h5 class="text-sm font-medium text-gray-500">CLIENT</h5>
                  <p class="text-brady-charcoal">{{ selectedProject?.client }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-500">LOCATION</h5>
                  <p class="text-brady-charcoal">{{ selectedProject?.location }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-500">YEAR</h5>
                  <p class="text-brady-charcoal">{{ selectedProject?.year }}</p>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-500">CATEGORY</h5>
                  <p class="text-brady-charcoal">{{ selectedProject?.subcategory }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h4 class="text-lg font-semibold text-brady-gold mb-4">Share This Project</h4>
              <div class="flex space-x-4">
                <a href="#" class="p-2 rounded-full bg-gray-100 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 rounded-full bg-gray-100 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 rounded-full bg-gray-100 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
                <a href="#" class="p-2 rounded-full bg-gray-100 text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-6 border-t">
        <div class="flex justify-between">
          <router-link to="/contact" class="btn-primary">Contact Us About This Project</router-link>
          <button @click="closeProjectModal" class="btn-outline">Close</button>
        </div>
      </div>
    </div>
  </div>
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
