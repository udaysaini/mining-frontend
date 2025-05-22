<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Technician</th>
          <th>Equipment</th>
          <th>Notes</th>
          <th class="w-20">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift.id">
          <td>{{ formatDate(shift.date) }}</td>
          <td>{{ formatTimeRange(shift.start_time, shift.end_time) }}</td>
          <td>{{ getTechnicianName(shift.technician_id) }}</td>
          <td>{{ getEquipmentName(shift.assigned_equipment_id) }}</td>
          <td class="max-w-xs truncate">{{ shift.notes || 'N/A' }}</td>
          <td>
            <div class="flex gap-2">
              <button @click="$emit('edit', shift)" class="btn btn-xs btn-ghost text-info">
                <PencilIcon class="h-4 w-4" />
              </button>
              <button @click="$emit('delete', shift)" class="btn btn-xs btn-ghost text-error">
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useTechnicianStore } from '@/store/technician';
import { useEquipmentStore } from '@/store/equipment';

// Props
const props = defineProps({
  shifts: {
    type: Array,
    required: true
  }
});

// Emits
defineEmits(['edit', 'delete']);

// Stores
const technicianStore = useTechnicianStore();
const equipmentStore = useEquipmentStore();

// Methods
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return 'N/A';
  
  // Format the time to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

function getTechnicianName(technicianId) {
  const technician = technicianStore.list.find(tech => tech.id === technicianId);
  return technician ? technician.name : 'Unknown';
}

function getEquipmentName(equipmentId) {
  if (!equipmentId) return 'None';
  const equipment = equipmentStore.list.find(eq => eq.id === equipmentId);
  return equipment ? equipment.name : 'Unknown';
}
</script>
