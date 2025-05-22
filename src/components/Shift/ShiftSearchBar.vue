<template>
  <div class="bg-base-100 rounded-lg">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <!-- Search input -->
      <div class="form-control">
        <div class="relative w-full">
          <input
            type="text"
            :value="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search shifts..."
            class="input input-bordered w-full pr-10"
          />
          <button 
            v-if="searchQuery" 
            @click="$emit('update:searchQuery', '')" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <XMarkIcon class="h-5 w-5 text-base-content opacity-60" />
          </button>
          <MagnifyingGlassIcon v-else class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content opacity-60" />
        </div>
      </div>

      <!-- Date filter -->
      <div class="form-control">
        <div class="relative w-full">
          <input
            type="date"
            :value="dateFilter"
            @input="updateDateFilter"
            class="input input-bordered w-full pr-10"
          />
          <button 
            v-if="dateFilter" 
            @click="$emit('update:dateFilter', '')" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <XMarkIcon class="h-5 w-5 text-base-content opacity-60" />
          </button>
        </div>
      </div>

      <!-- Technician filter -->
      <div class="form-control">
        <select
          :value="technicianFilter"
          @change="updateTechnicianFilter"
          class="select select-bordered w-full"
        >
          <option value="">All Technicians</option>
          <option v-for="tech in technicians" :key="tech.id" :value="tech.id">
            {{ tech.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useTechnicianStore } from '@/store/technician';

// Props
const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  dateFilter: {
    type: String,
    default: ''
  },
  technicianFilter: {
    type: String,
    default: ''
  }
});

// Emits
const emit = defineEmits(['update:searchQuery', 'update:dateFilter', 'update:technicianFilter']);

// Store
const technicianStore = useTechnicianStore();

// Computed
const technicians = computed(() => technicianStore.list);

// Methods
function updateSearchQuery(event) {
  emit('update:searchQuery', event.target.value);
}

function updateDateFilter(event) {
  emit('update:dateFilter', event.target.value);
}

function updateTechnicianFilter(event) {
  emit('update:technicianFilter', event.target.value);
}
</script>
