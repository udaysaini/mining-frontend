<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">Role</th>
        <th class="px-4 py-2 text-left">Skills</th>
        <th class="px-4 py-2 text-left">From</th>
        <th class="px-4 py-2 text-left">To</th>
        <th class="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
      <tr v-for="tech in technicians" :key="tech.id" class="hover:bg-gray-50">
        <td class="border px-4 py-2">{{ tech.name }}</td>
        <td class="border px-4 py-2">{{ tech.role }}</td>
        <td class="border px-4 py-2">{{ tech.skills }}</td>
        <td class="border px-4 py-2">{{ tech.available_from || '-' }}</td>
        <td class="border px-4 py-2">{{ tech.available_to   || '-' }}</td>
        <td class="border px-4 py-2 space-x-2 text-center">
          <button
            class="px-2 py-1 bg-yellow-400 text-white rounded"
            @click="$emit('edit', tech)"
          >
            Edit
          </button>
          <button
            class="px-2 py-1 bg-red-500 text-white rounded"
            @click="$emit('delete', tech.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  technicians: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>
