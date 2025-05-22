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
        placeholder="Enter technician name"
      />
    </div>
    
    <div>
      <label class="label">
        <span class="label">Role</span>
      </label>
      <select v-model="form.role" class="select select-bordered w-full">
        <option value="">Select a role</option>
        <option>Senior Technician</option>
        <option>Technician</option>
        <option>Junior Technician</option>
        <option>Apprentice</option>
      </select>
    </div>
    
    <div>
      <label class="label">
        <span class="label">Skills</span>
      </label>
      <textarea 
        v-model="form.skills" 
        class="textarea textarea-bordered w-full" 
        placeholder="Enter skills (separate with commas)"
        rows="3"
      ></textarea>
      <p class="text-xs text-base-content opacity-70 mt-1">
        Enter skills separated by commas (e.g., Welding, Mechanical, Electrical)
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="label">
          <span class="label">Available From</span>
        </label>
        <input 
          type="time" 
          v-model="form.available_from" 
          class="input input-bordered w-full" 
        />
      </div>
      <div>
        <label class="label">
          <span class="label">Available To</span>
        </label>
        <input 
          type="time" 
          v-model="form.available_to" 
          class="input input-bordered w-full" 
        />
      </div>
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
import { ref, watch } from 'vue';

const props = defineProps({
  technician: Object
});

const emit = defineEmits(['saved', 'cancel']);

// Local reactive form state
const form = ref({
  name: '',
  role: '',
  skills: '',
  available_from: '',
  available_to: ''
});

// When editing, populate form
watch(
  () => props.technician,
  (tech) => {
    if (tech) {
      form.value = {
        name: tech.name || '',
        role: tech.role || '',
        skills: tech.skills || '',
        available_from: tech.available_from || '',
        available_to: tech.available_to || ''
      };
    } else {
      // Reset form when creating new
      form.value = {
        name: '',
        role: '',
        skills: '',
        available_from: '',
        available_to: ''
      };
    }
  },
  { immediate: true }
);

function onSubmit() {
  // Emit full form payload
  emit('saved', { ...form.value, id: props.technician?.id });
}
</script>
