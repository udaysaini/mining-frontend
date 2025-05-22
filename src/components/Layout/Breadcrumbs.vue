<template>
  <div class="bg-base-100 border-b border-base-300">
    <div class="container mx-auto px-4">
      <div class="breadcrumbs text-sm py-3">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>{{ currentPage }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = computed(() => {
  // Extract current page name from route
  // Can be enhanced to use route.meta or custom mapping
  const path = route.path;
  if (path === '/') return 'Home';
  return path.split('/').pop().charAt(0).toUpperCase() + path.split('/').pop().slice(1);
});
</script>
