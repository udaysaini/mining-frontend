<template>
  <tr>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="w-10 rounded-full">
            <img :src="'https://picsum.photos/200?random=' + technician.id" />
          </div>
        </div>
        <div class="font-bold">{{ technician.name }}</div>
      </div>
    </td>
    <td>
      <div class="badge badge-neutral">{{ technician.role || 'Not assigned' }}</div>
    </td>
    <td>
      <div v-if="technician.skills" class="flex flex-wrap gap-1">
        <span v-for="(skill, index) in parseSkills(technician.skills)" :key="index" 
              class="badge badge-sm badge-secondary">
          {{ skill }}
        </span>
      </div>
      <span v-else class="text-sm opacity-70">No skills listed</span>
    </td>
    <td>
      <span v-if="technician.available_from && technician.available_to">
        {{ formatTime(technician.available_from) }} - {{ formatTime(technician.available_to) }}
        <span class="text-xs opacity-70 whitespace-nowrap">
          ({{ calculateHours(technician.available_from, technician.available_to) }} hrs)
        </span>
      </span>
      <span v-else class="text-sm opacity-70">Not specified</span>
    </td>
    <td>
      <div class="join">
        <button class="btn btn-sm btn-ghost join-item" @click="$emit('edit', technician)">
          <PencilIcon class="h-4 w-4" />
        </button>
        <button class="btn btn-sm btn-ghost join-item text-error" @click="$emit('delete', technician)">
          <TrashIcon class="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

defineProps({
  technician: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);

function parseSkills(skillsString) {
  if (!skillsString) return [];
  
  // Split by comma, semicolon or new line and trim whitespace
  return skillsString
    .split(/[,;\n]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
}

function formatTime(timeString) {
  // Handle different time formats
  if (!timeString) return '';
  
  // If already in HH:MM format, return as is
  if (/^\d{1,2}:\d{2}$/.test(timeString)) {
    return timeString;
  }
  
  // If in HH:MM:SS format, remove seconds
  if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeString)) {
    return timeString.substring(0, 5);
  }
  
  return timeString;
}

function calculateHours(startTime, endTime) {
  if (!startTime || !endTime) return '0';
  
  // Format times to ensure they're in HH:MM format
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  
  // Convert to minutes
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  // Calculate total minutes
  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;
  
  // Handle case where end time is on the next day
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }
  
  // Calculate duration in hours and minutes
  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  // Format the result
  if (minutes === 0) {
    return `${hours}`;
  } else {
    return `${hours}.${minutes}`;
  }
}
</script>
