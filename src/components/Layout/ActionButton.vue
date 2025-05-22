<template>
  <div class="fixed bottom-6 right-6 z-10">
    <div class="dropdown dropdown-top dropdown-end">
      <button class="btn btn-primary btn-circle shadow-lg">
        <PlusIcon class="h-6 w-6" />
      </button>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4">
        <li><a @click="$emit('action', 'technician')">New Technician</a></li>
        <li><a @click="$emit('action', 'equipment')">New Equipment</a></li>
        <li><a @click="$emit('action', 'shift')">Schedule Shift</a></li>
        <li><a @click="$emit('action', 'report')">Create Report</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/outline";

defineEmits(['action']);
</script>
