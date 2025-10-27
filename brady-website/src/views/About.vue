<script setup>
import profile from '../data/profile_content.json'
// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Robert Brady',
    position: 'Founder & CEO',
    bio: 'With over 25 years of experience in construction and engineering, Robert founded Brady Construction with a vision to deliver excellence in every project.',
    image: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  {
    id: 2,
    name: 'Emily Chen',
    position: 'Head of Engineering',
    bio: 'Emily leads our engineering team with her extensive expertise in mechanical and electrical systems for both commercial and residential projects.',
    image: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    position: 'Interior Design Director',
    bio: 'Michael brings creativity and innovation to our interior design services, with a portfolio of award-winning commercial and residential projects.',
    image: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    position: 'Project Manager',
    bio: 'Sarah ensures that all our projects are delivered on time and within budget while maintaining our high standards of quality.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 5,
    name: 'David Thompson',
    position: 'Systems Integration Specialist',
    bio: 'David specializes in integrating various building systems to create smart, efficient, and user-friendly environments.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: 6,
    name: 'Lisa Patel',
    position: 'Client Relations Manager',
    bio: 'Lisa is dedicated to ensuring our clients receive exceptional service throughout their journey with Brady Construction.',
    image: 'https://randomuser.me/api/portraits/women/47.jpg'
  }
];

// Fallback image handler for broken/empty images
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60'
const onImgError = (e) => {
  if (e && e.target) {
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
        style="background-image: url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=60');"
      ></div>
    </div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    <div class="absolute top-0 left-0 w-1 h-full bg-brady-gold opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">About Brady Construction</h1>
        <p class="text-xl text-gray-300 mb-8">
          Building excellence through innovation, quality craftsmanship, and client-focused service since 2005.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/contact" class="btn-primary">Book Appointment</router-link>
          <router-link to="/portfolio" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">View Portfolio</router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- Company Overview -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title text-white">Our Story</h2>
          <p class="text-gray-300 mb-6">
            Brady Construction was founded in 2005 with a simple mission: to deliver exceptional engineering and design services that exceed client expectations. What began as a small team of passionate professionals has grown into a comprehensive construction services company with expertise across mechanical engineering, electrical systems, interior design, and more.
          </p>
          <p class="text-gray-300 mb-6">
            Over the years, we've successfully completed hundreds of projects ranging from residential renovations to large-scale commercial developments. Our growth has been built on a foundation of technical excellence, creative problem-solving, and unwavering commitment to client satisfaction.
          </p>
          <p class="text-gray-300">
            Today, Brady Construction continues to evolve and innovate, embracing new technologies and methodologies while staying true to our core values of quality, integrity, and service.
          </p>
        </div>
        <div class="relative">
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-brady-gold opacity-20 rounded-full"></div>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Brady Office" class="rounded-lg shadow-xl relative z-10">
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-brady-beige opacity-60 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Scope of Business (unique staggered layout) -->
  <section class="py-12 md:py-16 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2 tracking-widest">Scope of Business</h2>
        <div class="mx-auto w-24 h-0.5 bg-brady-gold/80 mb-3"></div>
        <p class="text-gray-300 text-sm md:text-base">Our core capabilities across engineering, maintenance and interiors — concise overview.</p>
      </div>

      <div v-if="Array.isArray(profile?.scopeOfBusiness?.groups) && profile.scopeOfBusiness.groups.length" class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-7">
        <div
          v-for="(grp, gi) in profile.scopeOfBusiness.groups"
          :key="'about-scope-unique-'+gi"
          :class="[
            // 2-2-1 centered pattern repeating every 5 items
            (gi % 5 === 0 || gi % 5 === 1) ? 'md:col-span-6 lg:col-span-6' :
            (gi % 5 === 2 || gi % 5 === 3) ? 'md:col-span-6 lg:col-span-6' :
            // centered single
            'md:col-span-6 md:col-start-4 lg:col-span-6 lg:col-start-4'
          ]"
          class="glass-card p-5 rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 hover:-translate-y-0.5 transition-transform"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-9 h-9 rounded-md bg-brady-gold/20 border border-brady-gold flex items-center justify-center text-brady-gold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-white font-bold text-lg leading-snug">
              <span class="bg-white/15 px-1.5 rounded-sm">{{ grp.title }}</span>
            </h3>
          </div>

          <ul class="text-gray-300 space-y-1.5 text-sm">
            <li v-for="(it, ii) in (grp.items || []).slice(0, 6)" :key="'about-scope-compact-item-'+gi+'-'+ii" class="flex items-start gap-2">
              <span class="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-brady-gold"></span>
              <span>{{ it }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Company Overview -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title text-white">Our Story</h2>
          <p class="text-gray-300 mb-6">
            Brady Construction was founded in 2005 with a simple mission: to deliver exceptional engineering and design services that exceed client expectations. What began as a small team of passionate professionals has grown into a comprehensive construction services company with expertise across mechanical engineering, electrical systems, interior design, and more.
          </p>
          <p class="text-gray-300 mb-6">
            Over the years, we've successfully completed hundreds of projects ranging from residential renovations to large-scale commercial developments. Our growth has been built on a foundation of technical excellence, creative problem-solving, and unwavering commitment to client satisfaction.
          </p>
          <p class="text-gray-300">
            Today, Brady Construction continues to evolve and innovate, embracing new technologies and methodologies while staying true to our core values of quality, integrity, and service.
          </p>
        </div>
        <div class="relative">
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-brady-gold opacity-20 rounded-full"></div>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Brady Office" class="rounded-lg shadow-xl relative z-10">
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-brady-beige opacity-60 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission, Vision, Values -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title text-white">Our Mission, Vision & Values</h2>
        <p class="text-gray-300">
          The principles that guide our work and define our approach to every project.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Mission -->
        <div class="glass-card p-8 rounded-lg">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4 text-white">Our Mission</h3>
          <p class="text-gray-300 text-center">
            To deliver innovative engineering and design solutions that transform spaces, enhance functionality, and exceed client expectations through technical excellence and exceptional service.
          </p>
        </div>

        <!-- Vision -->
        <div class="glass-card p-8 rounded-lg">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4 text-white">Our Vision</h3>
          <p class="text-gray-300 text-center">
            To be recognized as the industry leader in integrated engineering and design services, known for our innovation, quality, and ability to create spaces that inspire and perform.
          </p>
        </div>

        <!-- Values -->
        <div class="glass-card p-8 rounded-lg">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4 text-white">Our Values</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Excellence in everything we do</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Integrity and transparency</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Innovation and creative problem-solving</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Client-focused approach</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Sustainability and responsibility</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-brady-charcoal">
    <div class="container mx-auto px-4 md:px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Work With Us?</h2>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Contact our team today to discuss how we can bring your vision to life with our engineering and interior design expertise.
      </p>
      <router-link to="/contact" class="btn-primary">Contact Us</router-link>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles specific to the About page */
</style>
