<script setup>
// Interior services data
const interiorServices = [
  {
    id: 1,
    title: 'Commercial Interior Design',
    description: 'Our commercial interior design services create functional, aesthetically pleasing spaces that enhance productivity and reflect your brand identity. We work with businesses of all sizes to design offices, retail spaces, restaurants, and more.',
    features: [
      'Office space planning and design',
      'Retail store layout and design',
      'Restaurant and hospitality design',
      'Corporate branding integration',
      'Furniture selection and procurement',
      'Lighting design'
    ],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Residential Interior Design',
    description: 'Our residential interior design services transform houses into personalized homes that reflect your lifestyle and preferences. We focus on creating spaces that are both beautiful and functional, enhancing your daily living experience.',
    features: [
      'Whole home design',
      'Kitchen and bathroom design',
      'Living space transformation',
      'Custom furniture design',
      'Color and material selection',
      'Accessory and art curation'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Fallback image handler for broken/empty images
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=60'
const onImgError = (e) => {
  if (e && e.target) {
    e.target.src = FALLBACK_IMG
  }
}

// Design process steps
const designProcess = [
  {
    number: 1,
    title: 'Initial Consultation',
    description: 'We meet to discuss your vision, requirements, budget, and timeline for the project.'
  },
  {
    number: 2,
    title: 'Site Assessment',
    description: 'We evaluate the existing space, taking measurements and noting architectural features.'
  },
  {
    number: 3,
    title: 'Concept Development',
    description: 'We create initial design concepts that align with your vision and functional needs.'
  },
  {
    number: 4,
    title: 'Design Refinement',
    description: 'Based on your feedback, we refine the design concept into a detailed plan.'
  },
  {
    number: 5,
    title: 'Material Selection',
    description: 'We select materials, finishes, furniture, and accessories that bring the design to life.'
  },
  {
    number: 6,
    title: 'Implementation',
    description: 'We coordinate with contractors and vendors to execute the design according to plan.'
  },
  {
    number: 7,
    title: 'Final Styling',
    description: 'We add the finishing touches to complete the space and ensure every detail is perfect.'
  }
];

// Portfolio items (preview)
const portfolioItems = [
  {
    id: 1,
    title: 'Modern Office Redesign',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Luxury Apartment Interior',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Boutique Retail Store',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Contemporary Home Renovation',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
    <!-- Hero Background Image -->
    <div class="absolute inset-0">
      <div 
        class="w-full h-full bg-center bg-cover opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=60');"
      ></div>
    </div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="interior-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#interior-pattern)" />
      </svg>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-1 bg-brady-gold opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Interior Services</h1>
        <p class="text-xl text-gray-300 mb-8">
          Transforming spaces into beautiful, functional environments that inspire and delight.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/contact" class="btn-primary">Book Appointment</router-link>
          <router-link to="/portfolio" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">View Portfolio</router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Overview -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title text-white">Our Interior Design Expertise</h2>
        <p class="text-gray-300">
          At Brady Construction, we offer comprehensive interior design services for both commercial and residential spaces. Our team of talented designers combines creativity, technical knowledge, and attention to detail to create spaces that are both beautiful and functional.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="space-y-16">
        <div v-for="(service, index) in interiorServices" :key="service.id" 
             :class="['grid grid-cols-1 lg:grid-cols-2 gap-12 items-center', 
                     index % 2 === 1 ? 'lg:grid-flow-dense' : '']">
          
          <!-- Service Image -->
          <div :class="[index % 2 === 1 ? 'lg:col-start-1' : '']">
            <div class="relative">
              <div class="absolute -top-4 -left-4 w-20 h-20 bg-brady-gold opacity-20 rounded-full"></div>
              <img :src="service.image" :alt="service.title" class="rounded-lg shadow-xl w-full h-80 object-cover" @error="onImgError">
            </div>
          </div>
          
          <!-- Service Content -->
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">{{ service.title }}</h3>
            <p class="text-gray-300 mb-6">{{ service.description }}</p>
            
            <h4 class="text-lg font-semibold text-brady-gold mb-3">What We Offer:</h4>
            <ul class="space-y-2">
              <li v-for="feature in service.features" :key="feature" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Design Process -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title text-white">Our Design Process</h2>
        <p class="text-gray-300">
          We follow a structured approach to ensure that every interior design project is delivered to the highest standards, meeting your vision and requirements.
        </p>
      </div>

      <div class="relative">
        <!-- Process Timeline (Desktop) -->
        <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-300 -translate-y-1/2"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div v-for="step in designProcess" :key="step.number" class="relative">
            <!-- Step Number -->
            <div class="w-12 h-12 rounded-full bg-brady-gold text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10 md:mb-8">
              {{ step.number }}
            </div>
            
            <!-- Step Content -->
            <div class="glass-card p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-white mb-2">{{ step.title }}</h4>
              <p class="text-gray-300 text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Preview -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title text-white">Featured Interior Projects</h2>
        <p class="text-gray-300">
          Explore a selection of our interior design projects that showcase our creativity, attention to detail, and commitment to excellence.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="item in portfolioItems" :key="item.id" class="relative group overflow-hidden rounded-lg">
          <img :src="item.image" :alt="item.title" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" @error="onImgError">
          <div class="absolute inset-0 bg-gradient-to-t from-brady-charcoal to-transparent opacity-70"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <span class="text-brady-gold font-medium">{{ item.category }}</span>
            <h4 class="text-2xl font-bold text-white">{{ item.title }}</h4>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <router-link to="/portfolio" class="btn-primary">View Full Portfolio</router-link>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title text-white">Client Testimonials</h2>
        <p class="text-gray-300">
          Don't just take our word for it. Here's what our clients have to say about our interior design services.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Testimonial 1 -->
        <div class="glass-card p-8 rounded-lg">
          <div class="flex mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <blockquote class="text-lg italic text-gray-300 mb-6">
            "Brady Construction transformed our office space into a modern, functional environment that perfectly reflects our brand. The team was professional, creative, and attentive to our needs throughout the entire process."
          </blockquote>
          <div class="flex items-center">
            <img src="https://randomuser.me/api/portraits/women/48.jpg" alt="Client" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h4 class="font-bold text-white">Jennifer Williams</h4>
              <p class="text-gray-400">CEO, TechStart Inc.</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="glass-card p-8 rounded-lg">
          <div class="flex mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <blockquote class="text-lg italic text-gray-300 mb-6">
            "We couldn't be happier with the redesign of our home. The Brady Construction team listened to our ideas and transformed them into a beautiful, cohesive design that exceeded our expectations."
          </blockquote>
          <div class="flex items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h4 class="font-bold text-white">Michael & Sarah Johnson</h4>
              <p class="text-gray-400">Residential Clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Book Appointment CTA -->
  <section class="py-16 md:py-24 bg-brady-charcoal">
    <div class="container mx-auto px-4 md:px-6">
      <div class="max-w-4xl mx-auto glass-card overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Image Side -->
          <div class="relative h-64 md:h-auto">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Interior Design" class="absolute inset-0 w-full h-full object-cover">
          </div>
          
          <!-- Content Side -->
          <div class="p-8 md:p-12">
            <h3 class="text-2xl font-bold text-white mb-4">Ready to Transform Your Space?</h3>
            <p class="text-gray-300 mb-6">
              Book a consultation with our interior design team to discuss your project and explore how we can help bring your vision to life.
            </p>
            <div class="space-y-4">
              <router-link to="/contact" class="btn-primary block text-center">Book Appointment</router-link>
              <div class="flex items-center justify-center space-x-4">
                <a href="#" class="text-white hover:text-brady-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="text-white hover:text-brady-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
                <a href="#" class="text-white hover:text-brady-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                  </svg>
                </a>
                <a href="#" class="text-white hover:text-brady-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.293 15.707l-1.414 1.414-4.879-4.879-4.879 4.879-1.414-1.414 4.879-4.879-4.879-4.879 1.414-1.414 4.879 4.879 4.879-4.879 1.414 1.414-4.879 4.879 4.879 4.879z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles specific to the Interior Services page */
</style>
