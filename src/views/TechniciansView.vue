<template>
  <div class="space-y-6">
    <!-- Header with title and actions -->
    <div class="flex items-center justify-between pb-4 border-b border-base-300">
      <div>
        <h2 class="text-2xl font-bold">Technicians</h2>
        <p class="text-sm opacity-70">Manage field technicians and their skills</p>
      </div>
      <button class="btn btn-primary" @click="onCreate">
        <PlusIcon class="h-5 w-5 mr-1" />
        Add Technician
      </button>
    </div>

    <!-- Content area with filtering options -->
    <div class="flex flex-col gap-4">
      <!-- Search and filter tools -->
      <TechnicianSearchBar
        v-model:searchQuery="searchQuery"
        v-model:roleFilter="filterRole"
        v-model:viewMode="viewMode"
      />

      <!-- Loading state -->
      <div v-if="technicianStore.loading" class="w-full flex justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Empty state -->
      <EmptyState
        v-else-if="filteredTechnicians.length === 0"
        title="No technicians found"
        :message="searchQuery || filterRole ? 'Try changing your search or filter' : 'Get started by adding your first technician'"
      >
        <template v-if="!searchQuery && !filterRole" #action>
          <button class="btn btn-primary mt-2" @click="onCreate">
            <PlusIcon class="h-5 w-5 mr-1" />
            Add Technician
          </button>
        </template>
      </EmptyState>

      <!-- Main content area -->
      <div v-else class="flex flex-col lg:flex-row gap-6">
        <!-- List/Grid view based on selection -->
        <div class="flex-1" :class="{'hidden': viewMode === 'grid' && showForm}">
          <TechnicianTable 
            v-if="viewMode === 'list'" 
            :technicians="filteredTechnicians"
            @edit="onEdit"
            @delete="confirmDelete"
          />
          
          <TechnicianGrid
            v-else
            :technicians="filteredTechnicians"
            @edit="onEdit"
            @delete="confirmDelete"
          />
        </div>

        <!-- Form section -->
        <transition name="slide">
          <div v-if="showForm" class="w-full lg:w-1/3 card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex justify-between items-center mb-4">
                <h3 class="card-title">{{ selectedTechnician ? 'Edit Technician' : 'Add New Technician' }}</h3>
                <button class="btn btn-sm btn-circle btn-ghost" @click="onCancel">
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
              <TechnicianForm 
                :technician="selectedTechnician" 
                @saved="onSaved" 
                @cancel="onCancel" 
              />
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <DeleteConfirmationModal
      modalId="delete_modal"
      :message="`Are you sure you want to delete ${techToDelete?.name}? This action cannot be undone.`"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTechnicianStore } from "@/store/technician";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";

// Import components
import TechnicianSearchBar from "@/components/Technician/TechnicianSearchBar.vue";
import TechnicianTable from "@/components/Technician/TechnicianTable.vue";
import TechnicianGrid from "@/components/Technician/TechnicianGrid.vue";
import TechnicianForm from "@/components/Technician/TechnicianForm.vue";
import EmptyState from "@/components/UI/EmptyState.vue";
import DeleteConfirmationModal from "@/components/UI/DeleteConfirmationModal.vue";

// Store and state
const technicianStore = useTechnicianStore();
const showForm = ref(false);
const selectedTechnician = ref(null);
const viewMode = ref('list');
const searchQuery = ref('');
const filterRole = ref('');
const techToDelete = ref(null);
const deleting = ref(false);

// Load data
onMounted(() => {
  technicianStore.fetchTechnicians();
});

// Computed
const filteredTechnicians = computed(() => {
  let result = technicianStore.list;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(tech => 
      tech.name.toLowerCase().includes(query) || 
      (tech.role && tech.role.toLowerCase().includes(query)) ||
      (tech.skills && tech.skills.toLowerCase().includes(query))
    );
  }
  
  // Apply role filter
  if (filterRole.value) {
    result = result.filter(tech => tech.role === filterRole.value);
  }
  
  return result;
});

// Methods
function onCreate() {
  selectedTechnician.value = null;
  showForm.value = true;
}

function onEdit(technician) {
  selectedTechnician.value = technician;
  showForm.value = true;
}

function confirmDelete(technician) {
  techToDelete.value = technician;
  document.getElementById('delete_modal').showModal();
}

async function handleDelete() {
  if (!techToDelete.value) return;
  
  deleting.value = true;
  await onDelete(techToDelete.value.id);
  
  // Close the modal programmatically
  document.getElementById('delete_modal').close();
  
  deleting.value = false;
  techToDelete.value = null;
}

async function onDelete(id) {
  await technicianStore.deleteTechnician(id);
}

async function onSaved(technicianData) {
  if (technicianData.id) {
    await technicianStore.updateTechnician(technicianData);
  } else {
    await technicianStore.createTechnician(technicianData);
  }
  
  showForm.value = false;
  selectedTechnician.value = null;
  await technicianStore.fetchTechnicians();
}

function onCancel() {
  showForm.value = false;
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
