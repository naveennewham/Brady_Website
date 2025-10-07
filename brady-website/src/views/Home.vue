<script setup>
import { ref, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import heroPoster from '../assets/hero_baner.png'

// Testimonials data
const testimonials = ref([
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO, BuildTech Inc.',
    content: 'Brady Construction delivered exceptional engineering services for our commercial project. Their attention to detail and innovative solutions exceeded our expectations.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Interior Design Director',
    content: 'The interior design team at Brady transformed our office space completely. Their understanding of modern aesthetics combined with functionality created the perfect workspace.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Project Manager, Urban Developments',
    content: 'Working with Brady Construction was seamless from start to finish. Their engineering team provided excellent solutions to complex structural challenges.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
]);

// Current testimonial index
const currentTestimonial = ref(0);

// Auto-rotate testimonials
let testimonialInterval;

onMounted(() => {
  startTestimonialRotation();
  // If we've already loaded the hero video once in this session, skip the poster
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const loadedBefore = sessionStorage.getItem('heroVideoReady') === '1'
    showPoster.value = !loadedBefore
  }
});

const startTestimonialRotation = () => {
  testimonialInterval = setInterval(() => {
    nextTestimonial();
  }, 5000); // Change every 5 seconds
};

const stopTestimonialRotation = () => {
  clearInterval(testimonialInterval);
};

const setTestimonial = (index) => {
  stopTestimonialRotation();
  currentTestimonial.value = index;
  startTestimonialRotation();
};

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.value.length) % testimonials.value.length;
};

// Hero video: show placeholder image until the video is ready (first load only)
const showPoster = ref(true)
const onVideoReady = () => {
  if (showPoster.value) {
    showPoster.value = false
    try { sessionStorage.setItem('heroVideoReady', '1') } catch (_) { /* no-op */ }
  }
}

// CTA Modal State
const showCtaModal = ref(false);
const ctaName = ref('');
const ctaEmail = ref('');
const ctaPhone = ref('');
const ctaService = ref('');
const ctaMessage = ref('');
const ctaLoading = ref(false);
const ctaSuccess = ref(false);
const ctaError = ref('');

const submitCta = async () => {
  ctaError.value = '';
  ctaSuccess.value = false;
  ctaLoading.value = true;

  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS environment variables are missing.');
    }

    const templateParams = {
      from_name: ctaName.value,
      from_email: ctaEmail.value,
      phone: ctaPhone.value,
      service: ctaService.value || 'Not specified',
      message: ctaMessage.value,
      // Optional: additional context fields
      submitted_at: new Date().toISOString(),
    };

    await emailjs.send(serviceId, templateId, templateParams, { publicKey });

    ctaSuccess.value = true;
    // Reset fields
    ctaName.value = '';
    ctaEmail.value = '';
    ctaPhone.value = '';
    ctaService.value = '';
    ctaMessage.value = '';

    // Close after a short delay
    setTimeout(() => {
      showCtaModal.value = false;
      ctaSuccess.value = false;
    }, 1200);
  } catch (err) {
    ctaError.value = err?.message || 'Failed to send. Please try again.';
  } finally {
    ctaLoading.value = false;
  }
};
</script>

<template>
  <!-- Luxurious Hero Section with Advanced Design Elements -->
  <section class="relative h-screen overflow-hidden">
    <!-- Background media container -->
    <div class="absolute inset-0 w-full h-full">
      <!-- Video (always rendered). When it becomes ready, we hide the poster -->
      <video
        class="absolute inset-0 w-full h-full object-cover z-0"
        autoplay
        muted
        loop
        playsinline
        @loadeddata="onVideoReady"
        @canplay="onVideoReady"
        @canplaythrough="onVideoReady"
      >
        <source src="../assets/BradWebsiteHero2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Poster image shown until the video is ready (first load only) -->
      <img
        v-if="showPoster"
        :src="heroPoster"
        alt="Hero placeholder"
        class="absolute inset-0 w-full h-full object-cover z-10"
      />
    </div>

    <!-- Overlay for readability -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Centered CTA Content -->
    <div class="absolute inset-0 flex items-center justify-center px-4">
      <div class="text-center max-w-3xl">
        <h1 class="font-display text-4xl md:text-6xl font-bold leading-tight">
          <span class="block text-white">Engineering precision.</span>
          <span class="block text-brady-gold">Architectural impact.</span>
        </h1>
        <!-- <p class="mt-4 text-lg md:text-xl text-brady-gray-200">
          MEP expertise and integrated systems—delivered with excellence, efficiency, and enduring quality.
        </p> -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/engineering-services" class="px-8 py-3 bg-brady-gold text-brady-darker font-medium tracking-wide hover:bg-brady-gold-light transition-colors">
            Explore Services
          </router-link>
          <button type="button" @click="showCtaModal = true" class="px-8 py-3 border-2 border-brady-gold text-white hover:bg-brady-gold/10 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Modal -->
  <transition name="fade">
    <div v-if="showCtaModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70" @click="showCtaModal = false"></div>

      <!-- Dialog -->
      <div class="relative z-10 w-full max-w-xl bg-brady-darker border border-brady-gold/30 shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-brady-gold/20 bg-brady-dark">
          <h3 class="font-heading text-xl text-brady-gold tracking-wide">Book an Appointment</h3>
          <button type="button" @click="showCtaModal = false" aria-label="Close" class="text-gray-300 hover:text-white">✕</button>
        </div>

        <!-- Form -->
        <form class="px-6 py-6 grid grid-cols-1 gap-4" @submit.prevent="submitCta">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-300 mb-1">Full Name</label>
              <input v-model="ctaName" type="text" required class="w-full bg-brady-dark border border-brady-gold/30 text-white px-3 py-2 focus:outline-none focus:border-brady-gold" placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm text-gray-300 mb-1">Email</label>
              <input v-model="ctaEmail" type="email" required class="w-full bg-brady-dark border border-brady-gold/30 text-white px-3 py-2 focus:outline-none focus:border-brady-gold" placeholder="john@company.com" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-300 mb-1">Phone</label>
              <input v-model="ctaPhone" type="tel" class="w-full bg-brady-dark border border-brady-gold/30 text-white px-3 py-2 focus:outline-none focus:border-brady-gold" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label class="block text-sm text-gray-300 mb-1">Service</label>
              <select v-model="ctaService" class="w-full bg-brady-dark border border-brady-gold/30 text-white px-3 py-2 focus:outline-none focus:border-brady-gold">
                <option value="" disabled>Select a service</option>
                <option>Mechanical Engineering</option>
                <option>Electrical Engineering</option>
                <option>Plumbing Engineering</option>
                <option>Systems Integration</option>
                <option>Steel Welding & Fabrication</option>
                <option>Painting & Waterproofing</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-300 mb-1">Message</label>
            <textarea v-model="ctaMessage" rows="4" class="w-full bg-brady-dark border border-brady-gold/30 text-white px-3 py-2 focus:outline-none focus:border-brady-gold" placeholder="Tell us briefly about your project..."></textarea>
          </div>
          <div class="mt-2 flex items-center justify-end gap-3">
            <button type="button" @click="showCtaModal = false" class="px-5 py-2 text-gray-300 hover:text-white">Cancel</button>
            <button type="submit" class="px-6 py-2 bg-brady-gold text-brady-darker font-medium hover:bg-brady-gold-light transition-colors">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <!-- Service Tiles Section with Images -->
  <section class="py-16 bg-brady-darker relative">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Engineering Services Tile -->
        <div class="relative group overflow-hidden rounded-lg h-[450px]">
          <!-- Background Image - MEP Project -->
          <div class="absolute inset-0 w-full h-full">
            <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="MEP Engineering Services" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-brady-darker via-brady-darker/80 to-transparent"></div>
          </div>
          
          <!-- Diagonal Accent -->
          <div class="absolute -top-2 -right-2 w-16 h-16 bg-brady-gold opacity-20 transform rotate-45 z-10"></div>
          
          <!-- Content Container -->
          <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
            <!-- Number Indicator -->
            <div class="absolute top-0 right-4 font-display text-5xl font-bold text-brady-gold opacity-20">01</div>
            
            <!-- Icon with Offset Background -->
            <div class="relative mb-6">
              <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
              <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <h3 class="font-heading text-2xl text-brady-gold mb-3">ENGINEERING</h3>
            <p class="text-gray-300 mb-6">Expert engineering solutions for construction projects of all sizes, ensuring efficiency, durability, and innovation.</p>
            
            <!-- Action Link -->
            <router-link to="/engineering-services" class="inline-block">
              <div class="group-hover:bg-brady-gold group-hover:bg-opacity-10 border border-brady-gold py-2 px-4 transition-all duration-300">
                <span class="text-brady-gold font-medium">VIEW SERVICES</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Interior Services Tile -->
        <div class="relative group overflow-hidden rounded-lg h-[450px]">
          <!-- Background Image -->
          <div class="absolute inset-0 w-full h-full">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="Interior Services" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-brady-darker via-brady-darker/80 to-transparent"></div>
          </div>
          
          <!-- Diagonal Accent -->
          <div class="absolute -top-2 -right-2 w-16 h-16 bg-brady-gold opacity-20 transform rotate-45 z-10"></div>
          
          <!-- Content Container -->
          <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
            <!-- Number Indicator -->
            <div class="absolute top-0 right-4 font-display text-5xl font-bold text-brady-gold opacity-20">02</div>
            
            <!-- Icon with Offset Background -->
            <div class="relative mb-6">
              <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
              <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <h3 class="font-heading text-2xl text-brady-gold mb-3">INTERIOR</h3>
            <p class="text-gray-300 mb-6">Personalized interior design for commercial and residential spaces that reflect your style and enhance functionality.</p>
            
            <!-- Action Link -->
            <router-link to="/interior-services" class="inline-block">
              <div class="group-hover:bg-brady-gold group-hover:bg-opacity-10 border border-brady-gold py-2 px-4 transition-all duration-300">
                <span class="text-brady-gold font-medium">VIEW SERVICES</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Building Services Tile (Coming Soon) -->
        <div class="relative group overflow-hidden rounded-lg h-[450px]">
          <!-- Background Image -->
          <div class="absolute inset-0 w-full h-full">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="Building Services" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-brady-darker via-brady-darker/80 to-transparent"></div>
          </div>
          
          <!-- Diagonal Accent -->
          <div class="absolute -top-2 -right-2 w-16 h-16 bg-brady-gold opacity-20 transform rotate-45 z-10"></div>
          
          <!-- Content Container -->
          <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
            <!-- Number Indicator -->
            <div class="absolute top-0 right-4 font-display text-5xl font-bold text-brady-gold opacity-20">03</div>
            
            <!-- Icon with Offset Background -->
            <div class="relative mb-6">
              <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
              <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <h3 class="font-heading text-2xl text-brady-gold mb-3">BUILDING</h3>
            <p class="text-gray-300 mb-6">Comprehensive construction and building management solutions launching Q4 2025.</p>
            
            <!-- Coming Soon Label -->
            <div class="inline-block">
              <div class="border border-gray-600 py-2 px-4 bg-brady-dark bg-opacity-70">
                <span class="text-gray-400 font-medium">COMING SOON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Who We Are Section - Luxurious Design -->
  <section class="py-24 bg-brady-dark relative">
    <!-- Decorative Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
      <div class="absolute top-10 left-10 w-64 h-64 border border-brady-gold rounded-full"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 border border-brady-gold rounded-full"></div>
      <div class="absolute top-1/2 left-1/4 w-32 h-32 border border-brady-gold transform rotate-45"></div>
    </div>
    
    <div class="container mx-auto px-4 md:px-6 relative">
      <!-- Elegant Section Header -->
      <div class="text-center mb-16">
        <div class="inline-block">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-4 relative">
            <span class="relative z-10">WHO <span class="text-brady-gold">WE ARE</span></span>
            <div class="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brady-gold to-transparent"></div>
          </h2>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column: Enhanced Image -->
        <div class="relative">
          <!-- Gold Frame Effect -->
          <div class="absolute -top-3 -left-3 right-3 bottom-3 border border-brady-gold opacity-30"></div>
          
          <!-- Main Image with Overlay -->
          <div class="relative rounded-sm overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                 alt="Brady Construction Team" 
                 class="w-full h-[500px] object-cover">
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-brady-darker to-transparent opacity-40"></div>
            
            <!-- Diagonal Gold Accent -->
            <div class="absolute top-0 left-0 w-24 h-24 bg-brady-gold opacity-20 transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
            <div class="absolute bottom-0 right-0 w-24 h-24 bg-brady-gold opacity-20 transform translate-y-1/2 translate-x-1/2 rotate-45"></div>
          </div>
          
          <!-- Elegant Stats Card -->
          <div class="absolute -bottom-10 -right-10 bg-brady-dark p-8 border-b-2 border-brady-gold shadow-2xl">
            <div class="grid grid-cols-2 gap-10">
              <div>
                <div class="text-4xl font-bold text-brady-gold mb-2 font-display">15<span class="text-2xl">+</span></div>
                <div class="text-sm text-gray-400 tracking-wider">YEARS OF EXCELLENCE</div>
              </div>
              <div>
                <div class="text-4xl font-bold text-brady-gold mb-2 font-display">250<span class="text-2xl">+</span></div>
                <div class="text-sm text-gray-400 tracking-wider">PROJECTS DELIVERED</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Rich Content -->
        <div class="relative">
          <!-- Subtle Background Pattern -->
          <div class="absolute -top-6 -right-6 w-32 h-32 border border-brady-gold opacity-10 rounded-full"></div>
          
          <!-- Content with Enhanced Typography -->
          <p class="text-gray-300 mb-8 text-lg leading-relaxed">
            <span class="text-brady-gold font-heading text-2xl">B</span>rady Construction is a premier engineering and construction firm specializing in innovative solutions for complex projects. With over 15 years of industry experience, we've established ourselves as leaders in delivering exceptional quality and cutting-edge design.  
          </p>
          
          <p class="text-gray-300 mb-10 leading-relaxed">
            Our team of highly skilled engineers, designers, and construction professionals work collaboratively to transform your vision into reality. We pride ourselves on our attention to detail, commitment to excellence, and ability to deliver projects on time and within budget.
          </p>
          
          <!-- Luxurious Feature Boxes -->
          <div class="mb-8 bg-gradient-to-r from-brady-dark to-brady-darker p-6 border-l-2 border-brady-gold shadow-lg">
            <div class="flex items-center">
              <div class="w-16 h-16 rounded-full bg-brady-gold bg-opacity-10 flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-2">Our Mission</h3>
                <p class="text-gray-300">To deliver exceptional engineering and construction solutions that exceed client expectations and set new industry standards.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-brady-dark to-brady-darker p-6 border-l-2 border-brady-gold shadow-lg">
            <div class="flex items-center">
              <div class="w-16 h-16 rounded-full bg-brady-gold bg-opacity-10 flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-2">Our Vision</h3>
                <p class="text-gray-300">To be the industry leader in innovative construction and engineering solutions, recognized globally for excellence and innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us Section - Luxurious Design -->
  <section class="py-24 bg-brady-darker relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full">
      <!-- Diagonal Gold Lines -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <div class="absolute -top-10 -left-10 w-40 h-[200%] bg-brady-gold transform rotate-45"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-[200%] bg-brady-gold transform rotate-45"></div>
      </div>
    </div>
    
    <div class="container mx-auto px-4 md:px-6 relative">
      <!-- Elegant Section Header with Gold Accents -->
      <div class="text-center mb-20 relative">
        <!-- Gold Decorative Elements -->
        <div class="absolute top-1/2 left-0 w-16 h-px bg-brady-gold opacity-30 hidden md:block"></div>
        <div class="absolute top-1/2 right-0 w-16 h-px bg-brady-gold opacity-30 hidden md:block"></div>
        
        <div class="inline-block relative">
          <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border border-brady-gold opacity-10 rounded-full"></div>
          <h2 class="font-display text-5xl md:text-6xl font-bold text-white mb-6 relative">
            <span class="relative z-10">WHY <span class="text-brady-gold">CHOOSE US</span></span>
          </h2>
          <div class="w-32 h-1 bg-gradient-to-r from-transparent via-brady-gold to-transparent mx-auto"></div>
        </div>
        
        <p class="text-gray-300 max-w-3xl mx-auto mt-8 text-lg">
          At Brady Construction, we combine technical expertise with innovative design to deliver exceptional results. 
          Here's why discerning clients trust us with their most important projects.
        </p>
      </div>
      
      <!-- Luxurious Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <!-- Feature 1 - Expertise -->
        <div class="relative group">
          <!-- Hover Effect Border -->
          <div class="absolute inset-0 bg-brady-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden">
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-brady-gold opacity-10 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            
            <div class="flex items-start">
              <div class="mr-6">
                <div class="w-20 h-20 bg-brady-dark border border-brady-gold shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-4">EXPERTISE</h3>
                <p class="text-gray-300 leading-relaxed">
                  Our team brings decades of combined experience in engineering and construction, ensuring your project is in capable hands. We've successfully delivered projects across various sectors, from luxury residential to complex commercial developments.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Feature 2 - Innovation -->
        <div class="relative group">
          <!-- Hover Effect Border -->
          <div class="absolute inset-0 bg-brady-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden">
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-brady-gold opacity-10 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            
            <div class="flex items-start">
              <div class="mr-6">
                <div class="w-20 h-20 bg-brady-dark border border-brady-gold shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-4">INNOVATION</h3>
                <p class="text-gray-300 leading-relaxed">
                  We stay at the forefront of industry advancements, implementing cutting-edge technologies and methodologies. Our innovative approach ensures your project benefits from the latest developments in sustainable construction and smart building solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Feature 3 - Communication -->
        <div class="relative group">
          <!-- Hover Effect Border -->
          <div class="absolute inset-0 bg-brady-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden">
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-brady-gold opacity-10 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            
            <div class="flex items-start">
              <div class="mr-6">
                <div class="w-20 h-20 bg-brady-dark border border-brady-gold shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-4">COMMUNICATION</h3>
                <p class="text-gray-300 leading-relaxed">
                  We maintain transparent, consistent communication throughout your project, ensuring you're informed every step of the way. Our dedicated project managers provide regular updates and are always available to address your questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Feature 4 - Timeliness -->
        <div class="relative group">
          <!-- Hover Effect Border -->
          <div class="absolute inset-0 bg-brady-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden">
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-brady-gold opacity-10 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            
            <div class="flex items-start">
              <div class="mr-6">
                <div class="w-20 h-20 bg-brady-dark border border-brady-gold shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-heading text-brady-gold mb-4">TIMELINESS</h3>
                <p class="text-gray-300 leading-relaxed">
                  We understand the importance of deadlines and deliver projects on schedule without compromising on quality. Our meticulous planning and resource management ensure efficient execution and timely completion of every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Luxurious Call to Action -->
      <div class="text-center relative">
        <!-- Decorative Elements -->
        <div class="absolute left-1/4 -top-4 w-px h-16 bg-brady-gold opacity-20 hidden md:block"></div>
        <div class="absolute right-1/4 -top-4 w-px h-16 bg-brady-gold opacity-20 hidden md:block"></div>
        
        <router-link to="/contact" class="inline-block relative group">
          <div class="absolute inset-0 bg-brady-gold opacity-0 group-hover:opacity-10 transition-all duration-500 transform scale-90 group-hover:scale-100"></div>
          <div class="border-2 border-brady-gold py-4 px-10 relative z-10">
            <span class="text-brady-gold font-medium tracking-wider text-lg">SCHEDULE A CONSULTATION</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  <!-- Features Section with Luxurious Design Elements -->
  <section class="py-20 md:py-28 bg-brady-dark relative overflow-hidden">
    <!-- Luxurious Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full">
      <!-- Decorative Gold Elements -->
      <div class="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-brady-gold to-transparent opacity-10"></div>
      <div class="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-brady-gold to-transparent opacity-10"></div>
      <div class="absolute top-20 left-20 w-48 h-48 border border-brady-gold rounded-full opacity-5"></div>
      <div class="absolute bottom-40 right-20 w-64 h-64 border border-brady-gold rounded-full opacity-5"></div>
      <div class="absolute top-1/4 right-1/4 w-32 h-32 border border-brady-gold transform rotate-45 opacity-5"></div>
    </div>
    
    <div class="container mx-auto px-4 md:px-6 relative">
      <!-- Elegant Section Header -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-20 relative">
        <!-- Decorative Line Element -->
        <div class="absolute top-1/2 left-0 w-full h-px bg-brady-gold opacity-5 hidden lg:block"></div>
        
        <div class="md:w-1/2 mb-10 md:mb-0 relative z-10">
          <div class="inline-block relative">
            <h2 class="font-display text-4xl md:text-6xl font-bold text-white mb-6 relative">
              OUR <span class="text-brady-gold">SERVICES</span>
              <div class="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-brady-gold to-transparent opacity-50"></div>
            </h2>
          </div>
        </div>
        
        <div class="md:w-1/2 relative z-10">
          <p class="text-gray-300 text-xl leading-relaxed max-w-xl">
            We provide comprehensive solutions across engineering and interior design, delivering excellence and unparalleled craftsmanship at every step of your project.
          </p>
        </div>
      </div>

      <!-- Engineering Services - Diagonal Luxurious Design -->
      <div class="mb-24">
        <!-- Elegant Section Title -->
        <div class="flex items-center mb-16 relative">
          <!-- Decorative Elements -->
          <div class="absolute left-0 -top-4 w-8 h-8 border border-brady-gold opacity-10 transform rotate-45"></div>
          
          <h3 class="font-heading text-3xl md:text-4xl text-brady-gold tracking-wide relative">
            <span>ENGINEERING SERVICES</span>
            <div class="absolute -bottom-2 left-0 w-1/2 h-px bg-gradient-to-r from-brady-gold to-transparent"></div>
          </h3>
          <div class="ml-8 flex-grow h-px bg-gradient-to-r from-brady-gold to-transparent opacity-20"></div>
        </div>
        
        <!-- Symmetric Diagonal Layout Container -->
        <div class="relative">
          <!-- Decorative Diagonal Lines -->
          <div class="absolute top-0 left-1/6 w-px h-full bg-brady-gold opacity-10 transform -rotate-12 hidden lg:block"></div>
          <div class="absolute top-0 right-1/6 w-px h-full bg-brady-gold opacity-10 transform rotate-12 hidden lg:block"></div>
          <div class="absolute top-0 left-1/3 w-px h-full bg-brady-gold opacity-10 transform -rotate-12 hidden lg:block"></div>
          <div class="absolute top-0 right-1/3 w-px h-full bg-brady-gold opacity-10 transform rotate-12 hidden lg:block"></div>
          
          <!-- Symmetric Service Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
            <!-- Service Card 1 - Mechanical Engineering -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -top-4 -right-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Mechanical Engineering</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Comprehensive mechanical engineering solutions for construction projects of all sizes, ensuring efficiency, durability, and optimal performance through innovative design approaches.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
            
            <!-- Service Card 2 - Electrical Engineering -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -top-4 -left-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Electrical Engineering</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Expert electrical systems design and implementation for residential, commercial, and industrial projects, focusing on energy efficiency, safety, and cutting-edge smart technology integration.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
            
            <!-- Service Card 3 - Plumbing Engineering -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -bottom-4 -right-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Plumbing Engineering</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Advanced plumbing system design and installation for optimal water management and conservation, utilizing sustainable technologies and premium materials for long-lasting performance.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
            
            <!-- Service Card 4 - Systems Integration -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -bottom-4 -left-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Systems Integration</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Seamless integration of various building systems for optimal performance, efficiency, and user experience. Our holistic approach ensures all components work together harmoniously for maximum functionality.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
            
            <!-- Service Card 5 - Steel Welding & Fabrication -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -top-4 -right-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Steel Welding & Fabrication</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Precision steel welding and fabrication services for structural components and custom architectural elements, delivered with meticulous attention to detail and superior craftsmanship.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
            
            <!-- Service Card 6 - Painting & Waterproofing -->
            <div class="group relative">
              <div class="bg-gradient-to-br from-brady-dark to-brady-darker p-8 border-b-2 border-brady-gold shadow-xl relative overflow-hidden h-full">
                <!-- Diagonal Decorative Element -->
                <div class="absolute -top-4 -left-4 w-24 h-24 border border-brady-gold opacity-10 transform rotate-45"></div>
                
                <!-- Icon with Premium Styling -->
                <div class="relative mb-8">
                  <div class="absolute top-1 left-1 w-16 h-16 bg-brady-gold opacity-10"></div>
                  <div class="relative z-10 w-16 h-16 bg-brady-dark border border-brady-gold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Service Content with Enhanced Typography -->
                <div class="text-sm text-brady-gold tracking-wider mb-3">PREMIUM SERVICE</div>
                <h4 class="text-2xl font-semibold mb-4 text-white font-heading">Painting & Waterproofing</h4>
                <p class="text-gray-300 leading-relaxed mb-6">
                  Professional painting and waterproofing services to protect structures and enhance aesthetic appeal, using premium materials and advanced techniques for lasting durability and beauty.
                </p>
                
                <!-- Elegant Link -->
                <div class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interior Services - Luxurious Design -->
      <div class="mb-24 mt-16">
        <!-- Elegant Section Title -->
        <div class="flex items-center mb-16 relative">
          <!-- Decorative Elements -->
          <div class="absolute left-0 -top-4 w-8 h-8 border border-brady-gold opacity-10 transform rotate-45"></div>
          
          <h3 class="font-heading text-3xl md:text-4xl text-brady-gold tracking-wide relative">
            <span>INTERIOR SERVICES</span>
            <div class="absolute -bottom-2 left-0 w-1/2 h-px bg-gradient-to-r from-brady-gold to-transparent"></div>
          </h3>
          <div class="ml-8 flex-grow h-px bg-gradient-to-r from-brady-gold to-transparent opacity-20"></div>
        </div>
        
        <!-- Luxurious Interior Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Interior Service 1 - Commercial -->
          <div class="relative group">
            <!-- Premium Image Container with Overlay -->
            <div class="relative overflow-hidden rounded-sm shadow-2xl mb-8">
              <!-- Decorative Frame -->
              <div class="absolute -top-3 -left-3 w-24 h-24 border border-brady-gold opacity-20 z-10"></div>
              <div class="absolute -bottom-3 -right-3 w-24 h-24 border border-brady-gold opacity-20 z-10"></div>
              
              <!-- Image with Hover Effect -->
              <div class="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Commercial Interior" 
                  class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
                
                <!-- Rich Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brady-darker via-brady-darker/80 to-transparent"></div>
                
                <!-- Elegant Category Label -->
                <div class="absolute top-6 right-6 px-4 py-1 border border-brady-gold bg-brady-darker bg-opacity-60">
                  <div class="text-sm text-brady-gold tracking-wider">COMMERCIAL</div>
                </div>
              </div>
            </div>
            
            <!-- Luxurious Content -->
            <div class="relative">
              <!-- Subtle Decorative Element -->
              <div class="absolute -left-4 top-0 h-full w-px bg-brady-gold opacity-20"></div>
              
              <div class="pl-6">
                <h4 class="font-heading text-2xl text-brady-gold mb-4 tracking-wide">COMMERCIAL SPACES</h4>
                <p class="text-gray-300 mb-6 leading-relaxed">
                  Innovative design solutions for offices, retail spaces, and hospitality venues that balance sophisticated aesthetics with functionality, creating environments that inspire productivity and leave lasting impressions.
                </p>
                
                <!-- Elegant Link -->
                <router-link to="/interior-services" class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2 tracking-wider">EXPLORE SERVICES</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Interior Service 2 - Residential -->
          <div class="relative group">
            <!-- Premium Image Container with Overlay -->
            <div class="relative overflow-hidden rounded-sm shadow-2xl mb-8">
              <!-- Decorative Frame -->
              <div class="absolute -top-3 -left-3 w-24 h-24 border border-brady-gold opacity-20 z-10"></div>
              <div class="absolute -bottom-3 -right-3 w-24 h-24 border border-brady-gold opacity-20 z-10"></div>
              
              <!-- Image with Hover Effect -->
              <div class="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Residential Interior" 
                  class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
                
                <!-- Rich Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brady-darker via-brady-darker/80 to-transparent"></div>
                
                <!-- Elegant Category Label -->
                <div class="absolute top-6 right-6 px-4 py-1 border border-brady-gold bg-brady-darker bg-opacity-60">
                  <div class="text-sm text-brady-gold tracking-wider">RESIDENTIAL</div>
                </div>
              </div>
            </div>
            
            <!-- Luxurious Content -->
            <div class="relative">
              <!-- Subtle Decorative Element -->
              <div class="absolute -left-4 top-0 h-full w-px bg-brady-gold opacity-20"></div>
              
              <div class="pl-6">
                <h4 class="font-heading text-2xl text-brady-gold mb-4 tracking-wide">RESIDENTIAL SPACES</h4>
                <p class="text-gray-300 mb-6 leading-relaxed">
                  Personalized interior design for homes that reflect your unique style, enhance your lifestyle, and create harmonious living environments with an emphasis on luxury, comfort, and timeless elegance.
                </p>
                
                <!-- Elegant Link -->
                <router-link to="/interior-services" class="inline-block group-hover:translate-x-2 transition-transform duration-300">
                  <span class="text-brady-gold flex items-center">
                    <span class="mr-2 tracking-wider">EXPLORE SERVICES</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="w-full h-px bg-brady-gold opacity-50 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  </section>

  <!-- Testimonials Section with Futuristic Layout -->
  <section class="py-16 md:py-24 bg-brady-darker relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-1/2 h-full opacity-5">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="circuit-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 10 10 L 10 0" fill="none" stroke="currentColor" stroke-width="0.5" />
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
    <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brady-gold opacity-5 blur-3xl"></div>
    
    <div class="container mx-auto px-4 md:px-6 relative">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-16">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <div class="tech-text text-xs text-brady-gold-light opacity-70 mb-2">// CLIENT TESTIMONIALS</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">VOICES OF <span class="text-brady-gold">TRUST</span></h2>
          <div class="w-20 h-1 bg-brady-gold mb-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1/2 h-full bg-brady-gold-light opacity-70 animate-pulse"></div>
          </div>
        </div>
        <div class="md:w-1/2">
          <p class="text-gray-300 text-lg">
            Don't just take our word for it. Here's what our clients have to say about working with Brady Construction.
          </p>
        </div>
      </div>

      <!-- Testimonial Slider -->
      <div class="max-w-4xl mx-auto relative">
        <!-- Testimonial -->
        <div class="glass-panel-dark rounded-lg p-8 md:p-10 border-t-2 border-brady-gold">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
              <img :src="testimonials[currentTestimonial].image" :alt="testimonials[currentTestimonial].name" class="w-full h-full object-cover">
            </div>
            <div>
              <div class="flex mb-4">
                <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <blockquote class="text-lg md:text-xl italic text-gray-200 mb-6">
                "{{ testimonials[currentTestimonial].content }}"
              </blockquote>
              <div>
                <h4 class="font-bold text-white">{{ testimonials[currentTestimonial].name }}</h4>
                <p class="text-brady-gold">{{ testimonials[currentTestimonial].position }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button @click="prevTestimonial" class="p-2 rounded-full bg-brady-charcoal text-white hover:bg-brady-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="flex space-x-2">
            <button 
              v-for="(_, index) in testimonials" 
              :key="index"
              @click="setTestimonial(index)"
              :class="['w-3 h-3 rounded-full transition-colors', 
                currentTestimonial === index ? 'bg-brady-gold' : 'bg-gray-300 hover:bg-gray-400']"
            ></button>
          </div>
          <button @click="nextTestimonial" class="p-2 rounded-full bg-brady-charcoal text-white hover:bg-brady-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 md:py-20 bg-brady-charcoal">
    <div class="container mx-auto px-4 md:px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Contact our team today to discuss how we can bring your vision to life with our engineering and interior design expertise.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link to="/contact" class="btn-primary">Contact Us</router-link>
        <router-link to="/portfolio" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">View Our Portfolio</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles specific to the Home page */
</style>
