<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <EquipmentCard 
      v-for="equipment in equipment" 
      :key="equipment.id" 
      :equipment="equipment"
      @edit="$emit('edit', equipment)"
      @delete="$emit('delete', equipment)"
      @assign="$emit('assign', $event)"
      @unassign="$emit('unassign', $event)"
    />
  </div>
</template>

<script setup>
import EquipmentCard from './EquipmentCard.vue';

defineProps({
  equipment: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete', 'assign', 'unassign']);
</script>
