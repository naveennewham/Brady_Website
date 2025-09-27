<script setup>
// Engineering services data
const engineeringServices = [
  {
    id: 1,
    title: 'Mechanical Engineering Services',
    description: 'Our mechanical engineering team provides comprehensive solutions for HVAC systems, plumbing, fire protection, and other mechanical aspects of construction projects. We focus on energy efficiency, sustainability, and optimal performance.',
    features: [
      'HVAC system design and optimization',
      'Plumbing system design',
      'Fire protection systems',
      'Energy modeling and analysis',
      'Sustainable mechanical solutions',
      'Mechanical equipment selection'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Electrical Engineering Services',
    description: 'Our electrical engineering services cover all aspects of electrical systems for buildings, from power distribution to lighting design. We prioritize safety, efficiency, and innovative solutions that meet modern demands.',
    features: [
      'Power distribution system design',
      'Lighting design and controls',
      'Emergency power systems',
      'Electrical load calculations',
      'Energy-efficient electrical solutions',
      'Smart building electrical systems'
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Electronics and Communication Systems',
    description: 'We design and implement cutting-edge electronics and communication systems that enhance building functionality, security, and user experience. Our solutions integrate seamlessly with other building systems.',
    features: [
      'Audio-visual system design',
      'Security and access control systems',
      'Data and communication networks',
      'Building automation systems',
      'Wireless infrastructure',
      'IoT integration'
    ],
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Systems Integration',
    description: 'Our systems integration expertise ensures that all building systems work together harmoniously, maximizing efficiency, functionality, and user comfort. We create smart, responsive environments that adapt to user needs.',
    features: [
      'Building management systems',
      'Cross-system communication protocols',
      'Central control and monitoring',
      'System performance optimization',
      'User interface design',
      'Remote access and control'
    ],
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Steel Welding and Fabrication',
    description: 'Our skilled team provides precision steel welding and fabrication services for structural components and custom architectural elements. We combine technical expertise with craftsmanship to deliver high-quality results.',
    features: [
      'Structural steel fabrication',
      'Custom architectural metalwork',
      'Stainless steel fabrication',
      'Aluminum fabrication',
      'Welding services (MIG, TIG, Stick)',
      'Quality control and testing'
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Painting and Waterproofing',
    description: 'Our painting and waterproofing services protect structures from the elements while enhancing their aesthetic appeal. We use high-quality materials and proven techniques to ensure durability and visual impact.',
    features: [
      'Interior and exterior painting',
      'Waterproofing membranes',
      'Concrete sealing',
      'Roof waterproofing',
      'Foundation waterproofing',
      'Decorative finishes'
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Project process steps
const processSteps = [
  {
    number: 1,
    title: 'Consultation',
    description: 'We begin with a thorough consultation to understand your project requirements, goals, and constraints.'
  },
  {
    number: 2,
    title: 'Assessment',
    description: 'Our engineers conduct a comprehensive assessment of the site and existing conditions to inform our approach.'
  },
  {
    number: 3,
    title: 'Concept Design',
    description: 'We develop initial concept designs that address your needs while considering technical feasibility and regulations.'
  },
  {
    number: 4,
    title: 'Detailed Engineering',
    description: 'Our team creates detailed engineering plans, specifications, and calculations for all required systems.'
  },
  {
    number: 5,
    title: 'Implementation',
    description: 'We oversee the implementation of our designs, ensuring quality control and adherence to specifications.'
  },
  {
    number: 6,
    title: 'Testing & Commissioning',
    description: 'All systems are thoroughly tested and commissioned to ensure optimal performance and safety.'
  },
  {
    number: 7,
    title: 'Handover & Support',
    description: 'We provide comprehensive documentation and training, along with ongoing support as needed.'
  }
];
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="blueprint" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#blueprint)" />
      </svg>
    </div>
    <div class="absolute top-0 right-0 w-1 h-full bg-brady-gold opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Engineering Services</h1>
        <p class="text-xl text-gray-300 mb-8">
          Comprehensive engineering solutions that combine technical expertise, innovation, and attention to detail.
        </p>
      </div>
    </div>
  </section>

  <!-- Services Overview -->
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title">Our Engineering Expertise</h2>
        <p class="text-gray-600">
          At Brady Construction, we offer a comprehensive range of engineering services to support your construction and renovation projects. Our team of experienced engineers brings technical knowledge, innovative thinking, and practical problem-solving to every challenge.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="space-y-16">
        <div v-for="(service, index) in engineeringServices" :key="service.id" 
             :class="['grid grid-cols-1 lg:grid-cols-2 gap-12 items-center', 
                     index % 2 === 1 ? 'lg:grid-flow-dense' : '']">
          
          <!-- Service Image -->
          <div :class="[index % 2 === 1 ? 'lg:col-start-1' : '']">
            <div class="relative">
              <div class="absolute -top-4 -left-4 w-20 h-20 bg-brady-gold opacity-20 rounded-full"></div>
              <img :src="service.image" :alt="service.title" class="rounded-lg shadow-xl w-full h-80 object-cover">
            </div>
          </div>
          
          <!-- Service Content -->
          <div>
            <h3 class="text-2xl font-bold text-brady-charcoal mb-4">{{ service.title }}</h3>
            <p class="text-gray-700 mb-6">{{ service.description }}</p>
            
            <h4 class="text-lg font-semibold text-brady-gold mb-3">Key Features:</h4>
            <ul class="space-y-2">
              <li v-for="feature in service.features" :key="feature" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brady-gold mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Process -->
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="section-title">Our Engineering Process</h2>
        <p class="text-gray-600">
          We follow a structured approach to ensure that every engineering project is delivered to the highest standards, on time and within budget.
        </p>
      </div>

      <div class="relative">
        <!-- Process Timeline (Desktop) -->
        <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-300 -translate-y-1/2"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div v-for="step in processSteps" :key="step.number" class="relative">
            <!-- Step Number -->
            <div class="w-12 h-12 rounded-full bg-brady-gold text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10 md:mb-8">
              {{ step.number }}
            </div>
            
            <!-- Step Content -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h4 class="text-lg font-semibold text-brady-charcoal mb-2">{{ step.title }}</h4>
              <p class="text-gray-600 text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title">Why Choose Our Engineering Services</h2>
          <p class="text-gray-700 mb-6">
            Our engineering team brings a unique combination of technical expertise, creative problem-solving, and practical experience to every project. We're committed to delivering solutions that not only meet technical requirements but also enhance the overall success of your project.
          </p>
          
          <div class="space-y-4 mt-8">
            <!-- Benefit 1 -->
            <div class="flex">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-brady-charcoal mb-1">Technical Excellence</h4>
                <p class="text-gray-600">Our engineers are highly qualified professionals with extensive experience in their respective fields.</p>
              </div>
            </div>
            
            <!-- Benefit 2 -->
            <div class="flex">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-brady-charcoal mb-1">Innovative Solutions</h4>
                <p class="text-gray-600">We stay at the forefront of engineering technology and methodologies to deliver innovative solutions.</p>
              </div>
            </div>
            
            <!-- Benefit 3 -->
            <div class="flex">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-brady-charcoal mb-1">Collaborative Approach</h4>
                <p class="text-gray-600">We work closely with architects, contractors, and other stakeholders to ensure seamless integration.</p>
              </div>
            </div>
            
            <!-- Benefit 4 -->
            <div class="flex">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-brady-charcoal mb-1">Timely Delivery</h4>
                <p class="text-gray-600">We understand the importance of timelines in construction projects and consistently deliver on schedule.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Engineering Work" class="rounded-lg shadow-md w-full h-48 object-cover">
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Engineering Work" class="rounded-lg shadow-md w-full h-64 object-cover">
            </div>
            <div class="space-y-4 mt-8">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Engineering Work" class="rounded-lg shadow-md w-full h-64 object-cover">
              <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Engineering Work" class="rounded-lg shadow-md w-full h-48 object-cover">
            </div>
          </div>
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-brady-beige opacity-60 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 md:py-20 bg-brady-charcoal">
    <div class="container mx-auto px-4 md:px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Engineering Project?</h2>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Contact our team today to discuss how our engineering services can bring your vision to life.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link to="/contact" class="btn-primary">Contact Us</router-link>
        <router-link to="/portfolio" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">View Our Portfolio</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles specific to the Engineering Services page */
</style>
