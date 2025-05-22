<template>
  <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
    <div class="join">
      <div class="input join-item flex items-center bg-base-100">
        <MagnifyingGlassIcon class="h-5 w-5 text-base-content opacity-50 ml-2" />
        <input 
          type="text" 
          placeholder="Search technicians..." 
          class="input p-2 w-full sm:w-64 focus:outline-none bg-transparent"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
      </div>
      <select 
        class="select select-bordered join-item" 
        :value="roleFilter"
        @change="$emit('update:roleFilter', $event.target.value)"
      >
        <option value="">All Roles</option>
        <option value="Senior Technician">Senior Technician</option>
        <option value="Technician">Technician</option>
        <option value="Junior Technician">Junior Technician</option>
        <option value="Apprentice">Apprentice</option>
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

defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  roleFilter: {
    type: String,
    required: true
  },
  viewMode: {
    type: String,
    required: true
  }
});

defineEmits(['update:searchQuery', 'update:roleFilter', 'update:viewMode']);
</script>
