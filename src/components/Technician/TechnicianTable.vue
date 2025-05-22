<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Skills</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TechnicianTableRow 
            v-for="tech in technicians" 
            :key="tech.id" 
            :technician="tech"
            @edit="$emit('edit', tech)"
            @delete="$emit('delete', tech)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import TechnicianTableRow from './TechnicianTableRow.vue';

defineProps({
  technicians: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>
