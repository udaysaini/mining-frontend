<template>
  <form @submit.prevent="onSubmit" class="space-y-4 p-4 bg-gray-50 rounded">
    <div>
      <label class="block mb-1">Name</label>
      <input v-model="form.name" required class="w-full border px-2 py-1" />
    </div>
    <div>
      <label class="block mb-1">Role</label>
      <input v-model="form.role" class="w-full border px-2 py-1" />
    </div>
    <div>
      <label class="block mb-1">Skills (comma-sep)</label>
      <input v-model="form.skills" class="w-full border px-2 py-1" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block mb-1">Available From</label>
        <input type="time" v-model="form.available_from" class="w-full border px-2 py-1" />
      </div>
      <div>
        <label class="block mb-1">Available To</label>
        <input type="time" v-model="form.available_to" class="w-full border px-2 py-1" />
      </div>
    </div>
    <div class="flex space-x-2">
      <button type="submit" class="px-3 py-1 bg-green-600 text-white rounded">
        Save
      </button>
      <button type="button" @click="$emit('cancel')" class="px-3 py-1 bg-gray-400 text-white rounded">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  technician: Object
})

const emit = defineEmits(['saved', 'cancel'])

// Local reactive form state
const form = ref({
  name: '',
  role: '',
  skills: '',
  available_from: '',
  available_to: ''
})

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
      }
    }
  },
  { immediate: true }
)

function onSubmit() {
  // Emit full form payload
  emit('saved', { ...form.value, id: props.technician?.id })
}
</script>
