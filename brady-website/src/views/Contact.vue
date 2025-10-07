<script setup>
import { ref } from 'vue';

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(null);

// Form validation
const errors = ref({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.value.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.value.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  if (!formData.value.subject.trim()) {
    newErrors.subject = 'Subject is required';
  }
  
  if (!formData.value.message.trim()) {
    newErrors.message = 'Message is required';
  }
  
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = null;
  
  try {
    // In a real implementation, this would send data to a server or Firebase
    // For now, we'll simulate a successful submission after a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitSuccess.value = true;
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    submitError.value = 'There was an error submitting your message. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
    <!-- Hero Background Image -->
    <div class="absolute inset-0">
      <div 
        class="w-full h-full bg-center bg-cover opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=60');"
      ></div>
    </div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="contact-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#contact-pattern)" />
      </svg>
    </div>
    <div class="absolute top-0 right-0 w-1/3 h-1 bg-brady-gold opacity-70"></div>
    <div class="absolute bottom-0 left-0 w-1/3 h-1 bg-brady-gold opacity-70"></div>
    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p class="text-xl text-gray-300 mb-8">
          Get in touch with our team to discuss your project or request more information about our services.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#contact-form" class="btn-primary">Book Appointment</a>
          <router-link to="/portfolio" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">View Portfolio</router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Information & Form -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div>
          <h2 class="section-title text-white">Get In Touch</h2>
          <p class="text-gray-300 mb-8">
            Whether you're interested in our engineering services, interior design expertise, or have questions about an existing project, we're here to help. Contact us using the information below or fill out the form to send us a message.
          </p>
          
          <div class="space-y-6">
            <!-- Address -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">Our Location</h3>
                <p class="text-gray-300">
                  123 Construction Avenue<br>
                  Building City, BC 12345<br>
                  United States
                </p>
              </div>
            </div>
            
            <!-- Email -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">Email Us</h3>
                <p class="text-gray-300">
                  General Inquiries: <a href="mailto:info@bradyconstruction.com" class="text-brady-gold hover:underline">info@bradyconstruction.com</a><br>
                  Support: <a href="mailto:support@bradyconstruction.com" class="text-brady-gold hover:underline">support@bradyconstruction.com</a>
                </p>
              </div>
            </div>
            
            <!-- Phone -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">Call Us</h3>
                <p class="text-gray-300">
                  Main Office: <a href="tel:+15551234567" class="text-brady-gold hover:underline">+1 (555) 123-4567</a><br>
                  Customer Service: <a href="tel:+15559876543" class="text-brady-gold hover:underline">+1 (555) 987-6543</a>
                </p>
              </div>
            </div>
            
            <!-- Hours -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-brady-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brady-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">Business Hours</h3>
                <p class="text-gray-300">
                  Monday - Friday: 8:00 AM - 6:00 PM<br>
                  Saturday: 9:00 AM - 1:00 PM<br>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          <!-- Social Media -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-brady-gray-800 border border-brady-gray-700 flex items-center justify-center text-white hover:bg-brady-gold hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brady-charcoal hover:bg-brady-gold hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div id="contact-form" class="glass-card p-8 rounded-lg">
          <h2 class="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
          
          <!-- Success Message -->
          <div v-if="submitSuccess" class="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Your message has been sent successfully. We'll get back to you soon!</span>
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="submitError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ submitError }}</span>
            </div>
          </div>
          
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  class="w-full px-4 py-2 border rounded-md focus:ring-brady-gold focus:border-brady-gold bg-brady-gray-900 text-white placeholder-gray-400 border-brady-gray-700"
                  :class="{'border-red-500': errors.name}"
                >
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  class="w-full px-4 py-2 border rounded-md focus:ring-brady-gold focus:border-brady-gold bg-brady-gray-900 text-white placeholder-gray-400 border-brady-gray-700"
                  :class="{'border-red-500': errors.email}"
                >
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
              
              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone" 
                  class="w-full px-4 py-2 border rounded-md focus:ring-brady-gold focus:border-brady-gold bg-brady-gray-900 text-white placeholder-gray-400 border-brady-gray-700"
                >
              </div>
              
              <!-- Subject -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-1">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="formData.subject" 
                  class="w-full px-4 py-2 border rounded-md focus:ring-brady-gold focus:border-brady-gold bg-brady-gray-900 text-white placeholder-gray-400 border-brady-gray-700"
                  :class="{'border-red-500': errors.subject}"
                >
                <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
              </div>
            </div>
            
            <!-- Message -->
            <div class="mt-6">
              <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Message *</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5" 
                class="w-full px-4 py-2 border rounded-md focus:ring-brady-gold focus:border-brady-gold bg-brady-gray-900 text-white placeholder-gray-400 border-brady-gray-700"
                :class="{'border-red-500': errors.message}"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>
            
            <!-- Submit Button -->
            <div class="mt-6">
              <button 
                type="submit" 
                class="btn-primary w-full"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Map Section -->
  <section class="py-16 md:py-24 bg-brady-dark text-gray-300">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="section-title text-white">Find Us</h2>
        <p class="text-gray-300">
          Visit our office to meet our team and discuss your project in person.
        </p>
      </div>
      
      <!-- Google Maps Embed -->
      <div class="glass-card rounded-lg overflow-hidden h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1634567890123!5m2!1sen!2sca" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
          class="filter grayscale"
        ></iframe>
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
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Book Appointment" class="absolute inset-0 w-full h-full object-cover">
          </div>
          
          <!-- Content Side -->
          <div class="p-8 md:p-12">
            <h3 class="text-2xl font-bold text-white mb-4">Schedule a Consultation</h3>
            <p class="text-gray-300 mb-6">
              Book a consultation with our team to discuss your project requirements and explore how we can help bring your vision to life.
            </p>
            <div class="space-y-4">
              <a href="tel:+15551234567" class="btn-primary block text-center">Call Us Now</a>
              <div class="text-center">
                <span class="text-gray-500">or</span>
              </div>
              <a href="mailto:info@bradyconstruction.com" class="btn-outline block text-center">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles specific to the Contact page */
</style>
