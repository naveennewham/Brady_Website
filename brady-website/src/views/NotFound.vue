<template>
  <section class="py-20 md:py-32 flex items-center min-h-screen bg-gradient-dark">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="notfound-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#notfound-pattern)" />
        </svg>
      </div>
    </div>
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-6xl md:text-8xl font-bold text-white mb-6">404</h1>
        <h2 class="text-2xl md:text-3xl font-semibold text-brady-gold mb-6">Page Not Found</h2>
        <p class="text-lg text-gray-300 mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/" class="btn-primary">Return Home</router-link>
          <router-link to="/contact" class="btn-outline text-white border-white hover:bg-white hover:text-brady-charcoal">Contact Us</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
