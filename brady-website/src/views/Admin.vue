<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { auth, db, storage } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes } from 'firebase/storage'

const user = ref(null)
const isLoading = ref(true)
const authError = ref('')

// Login form state
const email = ref('')
const password = ref('')

// Projects state
const projects = ref([])
const form = ref({
  title: '',
  category: 'engineering',
  subcategory: '',
  description: '',
  client: '',
  location: '',
  year: ''
})
const selectedFiles = ref([])
const isSubmitting = ref(false)
let unsubscribe = null

// Auth state listener
let unlistenAuth = null
onMounted(() => {
  unlistenAuth = onAuthStateChanged(auth, (u) => {
    user.value = u
    if (u) startProjectsListener()
    else stopProjectsListener()
    isLoading.value = false
  })
})

onUnmounted(() => {
  if (unlistenAuth) unlistenAuth()
  stopProjectsListener()
})

function startProjectsListener() {
  const colRef = collection(db, 'projects')
  if (unsubscribe) unsubscribe()
  unsubscribe = onSnapshot(colRef, (snap) => {
    projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
}

function stopProjectsListener() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
}

async function login() {
  authError.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (e) {
    authError.value = e?.message || 'Login failed'
  }
}

async function logout() {
  await signOut(auth)
}

function onFileChange(e) {
  selectedFiles.value = Array.from(e.target.files || [])
}

async function addProject() {
  if (!user.value) return
  isSubmitting.value = true
  authError.value = ''
  try {
    // Upload files (optional)
    const imagePaths = []
    for (const f of selectedFiles.value) {
      const path = `projects/${Date.now()}_${Math.random().toString(36).slice(2)}_${f.name}`
      const sRef = storageRef(storage, path)
      await uploadBytes(sRef, f)
      imagePaths.push(path)
    }

    await addDoc(collection(db, 'projects'), {
      title: form.value.title,
      category: form.value.category,
      subcategory: form.value.subcategory,
      description: form.value.description,
      client: form.value.client,
      location: form.value.location,
      year: form.value.year,
      imagePaths, // Portfolio.vue resolves these to URLs
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    // reset form
    form.value = { title: '', category: 'engineering', subcategory: '', description: '', client: '', location: '', year: '' }
    selectedFiles.value = []
    const input = document.getElementById('images')
    if (input) input.value = ''
  } catch (e) {
    authError.value = e?.message || 'Failed to add project'
  } finally {
    isSubmitting.value = false
  }
}

async function removeProject(id) {
  if (!confirm('Delete this project?')) return
  try {
    await deleteDoc(doc(db, 'projects', id))
  } catch (e) {
    alert(e?.message || 'Failed to delete project')
  }
}
</script>

<template>
  <section class="min-h-screen bg-brady-dark text-gray-200 p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-white mb-6">Admin Portal</h1>

      <div v-if="isLoading" class="py-12">Loading...</div>

      <div v-else>
        <div v-if="!user" class="max-w-md mx-auto bg-brady-gray-900 p-6 rounded-lg border border-brady-gray-700">
          <h2 class="text-xl font-semibold mb-4">Login</h2>
          <div class="space-y-4">
            <input v-model="email" type="email" placeholder="Email" class="w-full p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
            <input v-model="password" type="password" placeholder="Password" class="w-full p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
            <button @click="login" class="btn-primary w-full">Sign In</button>
            <p v-if="authError" class="text-red-400 text-sm">{{ authError }}</p>
          </div>
        </div>

        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <p>Logged in as <span class="text-brady-gold">{{ user.email }}</span></p>
            <button @click="logout" class="btn-outline">Logout</button>
          </div>

          <!-- Add Project Form -->
          <div class="bg-brady-gray-900 p-6 rounded-lg border border-brady-gray-700 mb-8">
            <h2 class="text-xl font-semibold mb-4">Add Project</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.title" placeholder="Title" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
              <select v-model="form.category" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700">
                <option value="engineering">Engineering</option>
                <option value="interior">Interior</option>
              </select>
              <input v-model="form.subcategory" placeholder="Subcategory" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
              <input v-model="form.client" placeholder="Client" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
              <input v-model="form.location" placeholder="Location" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
              <input v-model="form.year" placeholder="Year" class="p-2 rounded bg-brady-gray-800 border border-brady-gray-700" />
              <textarea v-model="form.description" placeholder="Description" class="md:col-span-2 p-2 rounded bg-brady-gray-800 border border-brady-gray-700"></textarea>
              <div class="md:col-span-2">
                <label class="block mb-2">Images</label>
                <input id="images" type="file" multiple accept="image/*" @change="onFileChange" class="w-full" />
              </div>
            </div>
            <button :disabled="isSubmitting" @click="addProject" class="btn-primary mt-4">
              <span v-if="isSubmitting">Saving...</span>
              <span v-else>Save Project</span>
            </button>
            <p v-if="authError" class="text-red-400 text-sm mt-2">{{ authError }}</p>
          </div>

          <!-- Projects List -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="p in projects" :key="p.id" class="bg-brady-gray-900 rounded-lg border border-brady-gray-700 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ p.title }}</h3>
                  <p class="text-sm text-gray-400">{{ p.category }} • {{ p.subcategory }}</p>
                </div>
                <button @click="removeProject(p.id)" class="text-red-400 hover:text-red-300">Delete</button>
              </div>
              <p class="mt-2 text-gray-300 line-clamp-3">{{ p.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-primary {
  @apply bg-brady-gold text-white px-4 py-2 rounded hover:opacity-90 transition;
}
.btn-outline {
  @apply border border-brady-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-brady-gray-800 transition;
}
</style>
