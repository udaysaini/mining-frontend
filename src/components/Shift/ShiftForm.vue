<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Date field -->
    <div class="form-control">
      <label class="label">
        <span class="label">Date</span>
      </label>
      <input 
        type="date" 
        v-model="formData.date" 
        class="input input-bordered validator" 
        required
      />
      <p v-if="errors.date" class="validator-hint text-error mt-1">{{ errors.date }}</p>
    </div>

    <!-- Time fields -->
    <div class="grid grid-cols-2 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label">Start Time</span>
        </label>
        <input 
          type="time" 
          v-model="formData.start_time" 
          class="input input-bordered validator" 
          required
        />
        <p v-if="errors.start_time" class="validator-hint text-error mt-1">{{ errors.start_time }}</p>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label">End Time</span>
        </label>
        <input 
          type="time" 
          v-model="formData.end_time" 
          class="input input-bordered validator" 
          required
        />
        <p v-if="errors.end_time" class="validator-hint text-error mt-1">{{ errors.end_time }}</p>
      </div>
    </div>

    <!-- Technician select -->
    <div class="form-control">
      <label class="label">
        <span class="label">Assign Technician</span>
      </label>
      <select 
        v-model="formData.technician_id" 
        class="select select-bordered validator w-full" 
        required
      >
        <option value="" disabled>Select a technician</option>
        <option v-for="tech in technicians" :key="tech.id" :value="tech.id">{{ tech.name }}</option>
      </select>
      <p v-if="errors.technician_id" class="validator-hint text-error mt-1">{{ errors.technician_id }}</p>
    </div>

    <!-- Equipment select -->
    <div class="form-control">
      <label class="label">
        <span class="label">Assign Equipment (Optional)</span>
      </label>
      <select 
        v-model="formData.assigned_equipment_id" 
        class="select select-bordered w-full"
      >
        <option :value="null">None</option>
        <option v-for="equip in equipment" :key="equip.id" :value="equip.id">{{ equip.name }}</option>
      </select>
      <p v-if="errors.assigned_equipment_id" class="validator-hint text-error mt-1">{{ errors.assigned_equipment_id }}</p>
    </div>

    <!-- Notes -->
    <div class="form-control">
      <label class="label">
        <span class="label">Notes (Optional)</span>
      </label>
      <textarea 
        v-model="formData.notes" 
        class="textarea textarea-bordered h-24" 
        placeholder="Add any additional notes here..."
      ></textarea>
      <p v-if="errors.notes" class="validator-hint text-error mt-1">{{ errors.notes }}</p>
    </div>

    <!-- Error display area -->
    <div v-if="apiError" class="alert alert-error">
      <span>{{ apiError }}</span>
    </div>
    
    <!-- Form actions -->
    <div class="flex justify-end gap-2 mt-6">
      <button type="button" class="btn btn-ghost" @click="$emit('cancel')" :disabled="isSubmitting">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="loading loading-spinner loading-xs mr-2"></span>
        {{ shift ? 'Update Shift' : 'Create Shift' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useEquipmentStore } from '@/store/equipment';
import { useTechnicianStore } from '@/store/technician';

// Props
const props = defineProps({
  shift: {
    type: Object,
    default: null
  }
});

// Emits
const emit = defineEmits(['saved', 'cancel']);

// Stores
const equipmentStore = useEquipmentStore();
const technicianStore = useTechnicianStore();

// State
const isSubmitting = ref(false);
const apiError = ref(null);
const errors = reactive({});

// Form data initialization
const formData = reactive({
  id: props.shift?.id || null,
  date: props.shift?.date || '',
  start_time: props.shift?.start_time?.substring(0, 5) || '',
  end_time: props.shift?.end_time?.substring(0, 5) || '',
  technician_id: props.shift?.technician_id || '',
  assigned_equipment_id: props.shift?.assigned_equipment_id || null,
  notes: props.shift?.notes || ''
});

// Computed
const technicians = computed(() => technicianStore.list);
const equipment = computed(() => equipmentStore.list);

// Fetch equipment data
onMounted(async () => {
  try {
    if (equipmentStore.list.length === 0) {
      await equipmentStore.fetchEquipment();
    }
    if (technicianStore.list.length === 0) {
      await technicianStore.fetchTechnicians();
    }
  } catch (error) {
    apiError.value = "Failed to load form data. Please try again.";
  }
});

// Form validation
function validateForm() {
  let isValid = true;
  errors.date = null;
  errors.start_time = null;
  errors.end_time = null;
  errors.technician_id = null;
  apiError.value = null;

  // Validate date
  if (!formData.date) {
    errors.date = "Date is required";
    isValid = false;
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
    errors.date = "Date must be in YYYY-MM-DD format";
    isValid = false;
  }

  // Validate start_time
  if (!formData.start_time) {
    errors.start_time = "Start time is required";
    isValid = false;
  }

  // Validate end_time
  if (!formData.end_time) {
    errors.end_time = "End time is required";
    isValid = false;
  } else if (formData.start_time && formData.end_time <= formData.start_time) {
    errors.end_time = "End time must be after start time";
    isValid = false;
  }

  // Validate technician_id
  if (!formData.technician_id) {
    errors.technician_id = "Technician is required";
    isValid = false;
  }

  return isValid;
}

// Handle form submission
async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  apiError.value = null;

  try {
    // Format the data for submission
    const data = {
      ...formData,
      technician_id: parseInt(formData.technician_id),
      assigned_equipment_id: formData.assigned_equipment_id ? parseInt(formData.assigned_equipment_id) : null
    };

    // Emit the saved event with the form data
    emit('saved', data);
  } catch (error) {
    console.error('Error saving shift:', error);
    apiError.value = error.response?.data?.message || "Failed to save shift. Please try again.";
    
    // Handle validation errors from API
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors);
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
