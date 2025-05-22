<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Maintenance</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <EquipmentTableRow 
            v-for="equipment in equipment" 
            :key="equipment.id" 
            :equipment="equipment"
            @edit="$emit('edit', equipment)"
            @delete="$emit('delete', equipment)"
            @assign="$emit('assign', $event)"
            @unassign="$emit('unassign', $event)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import EquipmentTableRow from './EquipmentTableRow.vue';

defineProps({
  equipment: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete', 'assign', 'unassign']);
</script>
