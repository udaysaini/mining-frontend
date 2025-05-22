<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <TechnicianCard 
      v-for="tech in technicians" 
      :key="tech.id" 
      :technician="tech"
      @edit="$emit('edit', tech)"
      @delete="$emit('delete', tech)"
    />
  </div>
</template>

<script setup>
import TechnicianCard from './TechnicianCard.vue';

defineProps({
  technicians: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>
