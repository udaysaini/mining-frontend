<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <!-- Navbar component -->
    <Navbar />

    <!-- Breadcrumb component -->
    <Breadcrumbs />

    <!-- Main content container with animation -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer component -->
    <Footer />

    <!-- Action Button component -->
    <ActionButton @action="handleAction" />
  </div>
</template>

<script setup>
import Navbar from './components/Layout/Navbar.vue';
import Breadcrumbs from './components/Layout/Breadcrumbs.vue';
import Footer from './components/Layout/Footer.vue';
import ActionButton from './components/Layout/ActionButton.vue';

const handleAction = (actionType) => {
  // Handle different action types
  console.log('Action triggered:', actionType);
  // Here you would implement the actual logic for each action type
  // For example, open a modal or navigate to a form
};
</script>

<style>
/* Only adding styles that can't be handled through Tailwind/daisyUI */
.router-link-active {
  background-color: var(--fallback-b2,oklch(var(--b2)/1));
  font-weight: 500;
}

.router-link-exact-active {
  color: var(--fallback-p, oklch(var(--p)/1));
  font-weight: 600;
}

/* Subtle hover effect for interactive elements */
.btn:not(.btn-ghost):hover {
  transform: translateY(-1px);
}

/* Page transition effects */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
