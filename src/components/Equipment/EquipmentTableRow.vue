<template>
  <tr>
    <td>
      <div class="font-medium">{{ equipment.name }}</div>
    </td>
    <td>
      <div v-if="equipment.type" class="badge badge-outline">{{ equipment.type }}</div>
      <span v-else class="text-sm opacity-70">-</span>
    </td>
    <td>
      <div v-if="equipment.location">{{ equipment.location }}</div>
      <span v-else class="text-sm opacity-70">-</span>
    </td>
    <td>
      <div class="badge" :class="statusClass">{{ equipment.status || 'Operational' }}</div>
    </td>
    <td>
      <div v-if="equipment.last_maintenance">{{ formatDate(equipment.last_maintenance) }}</div>
      <span v-else class="text-sm opacity-70">-</span>
    </td>
    <td>
      <div v-if="equipment.assigned_to" class="flex items-center gap-2">
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img :src="'https://picsum.photos/200?random=' + equipment.assigned_to" />
          </div>
        </div>
        <span>{{ getAssignedTechnician(equipment.assigned_to) }}</span>
      </div>
      <span v-else class="text-sm opacity-70">Not assigned</span>
    </td>
    <td>
      <div class="join">
        <button 
          v-if="equipment.assigned_to" 
          class="btn btn-sm btn-ghost join-item" 
          @click="$emit('unassign', equipment.id)"
          title="Unassign"
        >
          <UserMinusIcon class="h-4 w-4" />
        </button>
        <button 
          v-else 
          class="btn btn-sm btn-ghost join-item" 
          @click="$emit('assign', equipment.id)"
          title="Assign to technician"
        >
          <UserPlusIcon class="h-4 w-4" />
        </button>
        <button 
          class="btn btn-sm btn-ghost join-item" 
          @click="$emit('edit', equipment)"
          title="Edit"
        >
          <PencilIcon class="h-4 w-4" />
        </button>
        <button 
          class="btn btn-sm btn-ghost join-item text-error" 
          @click="$emit('delete', equipment)"
          title="Delete"
        >
          <TrashIcon class="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import { PencilIcon, TrashIcon, UserPlusIcon, UserMinusIcon } from "@heroicons/vue/24/outline";
import { getStatusBadgeColor, formatDate } from '@/utils/equipment';
import { useTechnicianStore } from '@/store/technician';

const props = defineProps({
  equipment: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete', 'assign', 'unassign']);

const technicianStore = useTechnicianStore();

const statusClass = computed(() => {
  return getStatusBadgeColor(props.equipment.status);
});

function getAssignedTechnician(technicianId) {
  const technician = technicianStore.list.find(tech => tech.id === technicianId);
  return technician ? technician.name : 'Unknown Technician';
}
</script>
