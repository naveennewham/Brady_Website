<script setup>
import content from '../data/profile_content.json'

// Helper: return truthy if an array has at least one non-empty string
const hasItems = (arr) => Array.isArray(arr) && arr.some(s => String(s || '').trim().length)
</script>

<template>
  <section class="mt-8 mb-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- About + Mission -->
      <div v-if="hasItems(content?.about?.bullets) || hasItems(content?.missionValues?.bullets)" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5">
        <div v-if="hasItems(content?.about?.bullets)" class="mb-4">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.about.title || 'About Brady' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(b, i) in content.about.bullets" :key="'about-'+i">{{ b }}</li>
          </ul>
        </div>
        <div v-if="hasItems(content?.missionValues?.bullets)">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.missionValues.title || 'Mission & Values' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(b, i) in content.missionValues.bullets" :key="'mv-'+i">{{ b }}</li>
          </ul>
        </div>
      </div>

      <!-- Services snapshot -->
      <div v-if="hasItems(content?.services?.engineering?.bullets) || hasItems(content?.services?.interior?.bullets) || hasItems(content?.services?.maintenance?.bullets)" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5">
        <h3 class="text-lg font-semibold text-white mb-3">Services Snapshot</h3>
        <div class="space-y-3">
          <div v-if="hasItems(content?.services?.engineering?.bullets)">
            <h4 class="text-sm font-medium text-brady-gold mb-1">{{ content.services.engineering.title || 'Engineering Services' }}</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li v-for="(b, i) in content.services.engineering.bullets" :key="'eng-'+i">{{ b }}</li>
            </ul>
          </div>
          <div v-if="hasItems(content?.services?.interior?.bullets)">
            <h4 class="text-sm font-medium text-brady-gold mb-1">{{ content.services.interior.title || 'Interior Design Services' }}</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li v-for="(b, i) in content.services.interior.bullets" :key="'int-'+i">{{ b }}</li>
            </ul>
          </div>
          <div v-if="hasItems(content?.services?.maintenance?.bullets)">
            <h4 class="text-sm font-medium text-brady-gold mb-1">{{ content.services.maintenance.title || 'Maintenance / AMCs' }}</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li v-for="(b, i) in content.services.maintenance.bullets" :key="'mnt-'+i">{{ b }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Capabilities / HSE -->
      <div v-if="hasItems(content?.capabilities?.bullets) || hasItems(content?.hse?.bullets)" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5">
        <div v-if="hasItems(content?.capabilities?.bullets)" class="mb-4">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.capabilities.title || 'Capabilities & Certifications' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(b, i) in content.capabilities.bullets" :key="'cap-'+i">{{ b }}</li>
          </ul>
        </div>
        <div v-if="hasItems(content?.hse?.bullets)">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.hse.title || 'HSE & Compliance' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(b, i) in content.hse.bullets" :key="'hse-'+i">{{ b }}</li>
          </ul>
        </div>
      </div>

      <!-- Sectors -->
      <div v-if="Array.isArray(content?.sectors?.items) && content.sectors.items.length" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5 lg:col-span-2">
        <h3 class="text-lg font-semibold text-white mb-2">{{ content.sectors.title || 'Sectors & Industries' }}</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-300">
          <li v-for="(s, i) in content.sectors.items" :key="'sec-'+i">{{ s }}</li>
        </ul>
      </div>

      <!-- Scope of Business -->
      <div v-if="Array.isArray(content?.scopeOfBusiness?.groups) && content.scopeOfBusiness.groups.length" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5 lg:col-span-3">
        <h3 class="text-lg font-semibold text-white mb-3">{{ content.scopeOfBusiness.title || 'Scope of Business' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(grp, gi) in content.scopeOfBusiness.groups" :key="'sob-'+gi">
            <h4 class="text-sm font-medium text-brady-gold mb-2">{{ grp.title }}</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li v-for="(it, ii) in grp.items || []" :key="'sob-item-'+gi+'-'+ii">{{ it }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Clients / Awards -->
      <div v-if="(Array.isArray(content?.clients?.items) && content.clients.items.length) || hasItems(content?.awards?.bullets)" class="rounded-lg border border-brady-gray-700 bg-brady-gray-900/40 p-5">
        <div v-if="Array.isArray(content?.clients?.items) && content.clients.items.length" class="mb-4">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.clients.title || 'Clients & Partners' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(c, i) in content.clients.items" :key="'cli-'+i">{{ c }}</li>
          </ul>
        </div>
        <div v-if="hasItems(content?.awards?.bullets)">
          <h3 class="text-lg font-semibold text-white mb-2">{{ content.awards.title || 'Awards & Accreditations' }}</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li v-for="(b, i) in content.awards.bullets" :key="'awd-'+i">{{ b }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
