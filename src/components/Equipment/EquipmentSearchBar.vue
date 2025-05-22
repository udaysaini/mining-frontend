<template>
  <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
    <div class="join">
      <div class="input join-item flex items-center bg-base-100">
        <MagnifyingGlassIcon class="h-5 w-5 text-base-content opacity-50 ml-2" />
        <input 
          type="text" 
          placeholder="Search equipment..." 
          class="input p-2 w-full sm:w-64 focus:outline-none bg-transparent"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
      </div>
      <select 
        class="select select-bordered join-item" 
        :value="typeFilter"
        @change="$emit('update:typeFilter', $event.target.value)"
      >
        <option value="">All Types</option>
        <option v-for="type in equipmentTypes" :key="type">{{ type }}</option>
      </select>
      <select 
        class="select select-bordered join-item" 
        :value="statusFilter"
        @change="$emit('update:statusFilter', $event.target.value)"
      >
        <option value="">All Statuses</option>
        <option v-for="status in equipmentStatuses" :key="status">{{ status }}</option>
      </select>
    </div>
    
    <div class="join">
      <button 
        class="btn btn-sm join-item" 
        :class="{'btn-active': viewMode === 'list'}" 
        @click="$emit('update:viewMode', 'list')"
      >
        <Bars4Icon class="h-5 w-5" />
      </button>
      <button 
        class="btn btn-sm join-item" 
        :class="{'btn-active': viewMode === 'grid'}" 
        @click="$emit('update:viewMode', 'grid')"
      >
        <Squares2X2Icon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon, Bars4Icon, Squares2X2Icon } from "@heroicons/vue/24/outline";
import { getEquipmentTypes, getEquipmentStatuses } from '@/utils/equipment';

const equipmentTypes = getEquipmentTypes();
const equipmentStatuses = getEquipmentStatuses();

defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  typeFilter: {
    type: String,
    required: true
  },
  statusFilter: {
    type: String,
    required: true
  },
  viewMode: {
    type: String,
    required: true
  }
});

defineEmits(['update:searchQuery', 'update:typeFilter', 'update:statusFilter', 'update:viewMode']);
</script>
