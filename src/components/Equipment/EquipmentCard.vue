<template>
  <div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
    <div class="card-body">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="card-title">{{ equipment.name }}</h3>
          <div class="flex flex-wrap gap-2 mt-1">
            <span v-if="equipment.type" class="badge badge-outline">{{ equipment.type }}</span>
            <span class="badge" :class="statusClass">{{ equipment.status || 'Operational' }}</span>
          </div>
        </div>
        <div v-if="equipment.assigned_to" class="indicator">
          <span class="indicator-item status status-success status-xs"></span>
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img :src="'https://picsum.photos/200?random=' + equipment.assigned_to" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="divider my-2"></div>
      
      <div class="space-y-2 text-sm">
        <div v-if="equipment.location" class="flex items-center gap-2">
          <MapPinIcon class="h-4 w-4 opacity-70" />
          <span>{{ equipment.location }}</span>
        </div>
        
        <div v-if="equipment.last_maintenance" class="flex items-center gap-2">
          <CalendarIcon class="h-4 w-4 opacity-70" />
          <span>Last maintained: {{ formatDate(equipment.last_maintenance) }}</span>
        </div>
        
        <div v-if="equipment.assigned_to" class="flex items-center gap-2">
          <UserIcon class="h-4 w-4 opacity-70" />
          <span>Assigned to: {{ getAssignedTechnician(equipment.assigned_to) }}</span>
        </div>
      </div>
      
      <div class="card-actions justify-end mt-4">
        <button 
          v-if="equipment.assigned_to" 
          class="btn btn-sm btn-ghost" 
          @click="$emit('unassign', equipment.id)"
        >
          <UserMinusIcon class="h-4 w-4 mr-1" />
          Unassign
        </button>
        <button 
          v-else 
          class="btn btn-sm btn-ghost" 
          @click="$emit('assign', equipment.id)"
        >
          <UserPlusIcon class="h-4 w-4 mr-1" />
          Assign
        </button>
        <button class="btn btn-sm btn-ghost" @click="$emit('edit', equipment)">
          <PencilIcon class="h-4 w-4 mr-1" />
          Edit
        </button>
        <button class="btn btn-sm btn-ghost text-error" @click="$emit('delete', equipment)">
          <TrashIcon class="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { PencilIcon, TrashIcon, UserPlusIcon, UserMinusIcon, MapPinIcon, CalendarIcon, UserIcon } from "@heroicons/vue/24/outline";
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
