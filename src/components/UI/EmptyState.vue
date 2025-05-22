<template>
  <div class="card bg-base-100 p-8 text-center">
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="rounded-full bg-base-200 p-4">
        <slot name="icon">
          <UserGroupIcon class="h-10 w-10 opacity-40" />
        </slot>
      </div>
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <p class="opacity-70">{{ message }}</p>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import { UserGroupIcon } from "@heroicons/vue/24/outline";

defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
</script>
