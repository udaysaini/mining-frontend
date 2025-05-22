<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="label">
        <span class="label">Name</span>
      </label>
      <input 
        v-model="form.name" 
        required 
        class="input input-bordered w-full" 
        placeholder="Enter equipment name"
      />
    </div>
    
    <div>
      <label class="label">
        <span class="label">Type</span>
      </label>
      <select v-model="form.type" class="select select-bordered w-full">
        <option value="">Select a type</option>
        <option v-for="type in equipmentTypes" :key="type">{{ type }}</option>
      </select>
    </div>
    
    <div>
      <label class="label">
        <span class="label">Location</span>
      </label>
      <input 
        v-model="form.location" 
        class="input input-bordered w-full" 
        placeholder="Enter location"
      />
    </div>
    
    <div>
      <label class="label">
        <span class="label">Status</span>
      </label>
      <select v-model="form.status" class="select select-bordered w-full">
        <option value="">Select a status</option>
        <option v-for="status in equipmentStatuses" :key="status">{{ status }}</option>
      </select>
    </div>
    
    <div>
      <label class="label">
        <span class="label">Last Maintenance Date</span>
      </label>
      <input 
        type="date" 
        v-model="form.last_maintenance" 
        class="input input-bordered w-full" 
      />
    </div>
    
    <div v-if="technicians.length > 0">
      <label class="label">
        <span class="label">Assigned To</span>
      </label>
      <select v-model="form.assigned_to" class="select select-bordered w-full">
        <option :value="null">Not assigned</option>
        <option v-for="tech in technicians" :key="tech.id" :value="tech.id">{{ tech.name }}</option>
      </select>
    </div>
    
    <div class="flex gap-2 justify-end mt-6">
      <button type="button" @click="$emit('cancel')" class="btn btn-ghost">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        Save
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTechnicianStore } from '@/store/technician';
import { getEquipmentTypes, getEquipmentStatuses } from '@/utils/equipment';

const props = defineProps({
  equipment: Object
});

const emit = defineEmits(['saved', 'cancel']);
const technicianStore = useTechnicianStore();
const technicians = ref([]);
const equipmentTypes = getEquipmentTypes();
const equipmentStatuses = getEquipmentStatuses();

// Local reactive form state
const form = ref({
  name: '',
  type: '',
  location: '',
  status: 'Operational',
  last_maintenance: '',
  assigned_to: null
});

// Fetch technicians for assignment dropdown
onMounted(async () => {
  if (technicianStore.list.length === 0) {
    await technicianStore.fetchTechnicians();
  }
  technicians.value = technicianStore.list;
});

// When editing, populate form
watch(
  () => props.equipment,
  (equipment) => {
    if (equipment) {
      form.value = {
        name: equipment.name || '',
        type: equipment.type || '',
        location: equipment.location || '',
        status: equipment.status || 'Operational',
        last_maintenance: equipment.last_maintenance || '',
        assigned_to: equipment.assigned_to || null,
        id: equipment.id
      };
    } else {
      // Reset form when creating new
      form.value = {
        name: '',
        type: '',
        location: '',
        status: 'Operational',
        last_maintenance: '',
        assigned_to: null
      };
    }
  },
  { immediate: true }
);

function onSubmit() {
  // Make a clean copy of form data
  const formData = { ...form.value };
  
  // Clean up empty strings
  Object.keys(formData).forEach(key => {
    if (formData[key] === '') {
      formData[key] = null;
    }
  });
  
  // Emit full form payload
  emit('saved', formData);
}
</script>
