<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold">Field Ops Dashboard</h1>
        <nav class="space-x-4">
          <router-link class="text-gray-600 hover:text-gray-900" to="/dashboard">Dashboard</router-link>
          <router-link class="text-gray-600 hover:text-gray-900" to="/technicians">Techs</router-link>
          <router-link class="text-gray-600 hover:text-gray-900" to="/equipment">Equipment</router-link>
          <router-link class="text-gray-600 hover:text-gray-900" to="/shifts">Shifts</router-link>
        </nav>
      </div>
    </header>

    <!-- Main content container -->
    <main class="flex-1 max-w-7xl mx-auto px-4 py-6">
      <router-view/>
    </main>

    <!-- Footer (optional) -->
    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-2 text-center text-gray-500 text-sm">
        © 2025 Your Company
      </div>
    </footer>
  </div>
</template>

<script setup>
// no changes needed here
</script>

<style>
/* optional: basic link styling */
nav a {
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
  color: #000;
}

/* in your global CSS (e.g., index.css) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
