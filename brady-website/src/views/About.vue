<script setup>
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
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
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
      </div>
    </div>
  </section>

  <!-- Company Overview -->
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title">Our Story</h2>
          <p class="text-gray-700 mb-6">
            Brady Construction was founded in 2005 with a simple mission: to deliver exceptional engineering and design services that exceed client expectations. What began as a small team of passionate professionals has grown into a comprehensive construction services company with expertise across mechanical engineering, electrical systems, interior design, and more.
          </p>
          <p class="text-gray-700 mb-6">
            Over the years, we've successfully completed hundreds of projects ranging from residential renovations to large-scale commercial developments. Our growth has been built on a foundation of technical excellence, creative problem-solving, and unwavering commitment to client satisfaction.
          </p>
          <p class="text-gray-700">
            Today, Brady Construction continues to evolve and innovate, embracing new technologies and methodologies while staying true to our core values of quality, integrity, and service.
          </p>
        </div>
        <div class="relative">
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-brady-gold opacity-20 rounded-full"></div>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Brady Construction Office" class="rounded-lg shadow-xl relative z-10">
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-brady-beige opacity-60 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission, Vision, Values -->
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title">Our Mission, Vision & Values</h2>
        <p class="text-gray-600">
          The principles that guide our work and define our approach to every project.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Mission -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4">Our Mission</h3>
          <p class="text-gray-600 text-center">
            To deliver innovative engineering and design solutions that transform spaces, enhance functionality, and exceed client expectations through technical excellence and exceptional service.
          </p>
        </div>

        <!-- Vision -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4">Our Vision</h3>
          <p class="text-gray-600 text-center">
            To be recognized as the industry leader in integrated engineering and design services, known for our innovation, quality, and ability to create spaces that inspire and perform.
          </p>
        </div>

        <!-- Values -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <div class="w-16 h-16 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-center mb-4">Our Values</h3>
          <ul class="space-y-2 text-gray-600">
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

  <!-- Team Section -->
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title">Meet Our Team</h2>
        <p class="text-gray-600">
          Our talented professionals bring expertise, creativity, and dedication to every project.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Team Member Cards -->
        <div v-for="member in teamMembers" :key="member.id" class="group">
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img :src="member.image" :alt="member.name" class="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-brady-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex space-x-3">
                <a href="#" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-brady-charcoal">{{ member.name }}</h3>
          <p class="text-brady-gold font-medium mb-2">{{ member.position }}</p>
          <p class="text-gray-600">{{ member.bio }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
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
