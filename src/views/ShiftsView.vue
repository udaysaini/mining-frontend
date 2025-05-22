<template>
  <div class="space-y-6">
    <!-- Header with title and actions -->
    <div class="flex items-center justify-between pb-4 border-b border-base-300">
      <div>
        <h2 class="text-2xl font-bold">Shifts</h2>
        <p class="text-sm opacity-70">Manage technician shifts and equipment assignments</p>
      </div>
      <button class="btn btn-primary" @click="onCreate">
        <PlusIcon class="h-5 w-5 mr-1" />
        Add Shift
      </button>
    </div>

    <!-- Content area with filtering options -->
    <div class="flex flex-col gap-4">
      <!-- Search and filter tools -->
      <ShiftSearchBar
        v-model:searchQuery="searchQuery"
        v-model:dateFilter="filterDate"
        v-model:technicianFilter="filterTechnician"
      />

      <!-- Loading state -->
      <div v-if="loading" class="w-full flex justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Empty state -->
      <EmptyState
        v-else-if="filteredShifts.length === 0 && !showForm"
        title="No shifts found"
        :message="searchQuery || filterDate || filterTechnician ? 'Try changing your search or filters' : 'Get started by adding your first shift'"
      >
        <template v-if="!searchQuery && !filterDate && !filterTechnician" #action>
          <button class="btn btn-primary mt-2" @click="onCreate">
            <PlusIcon class="h-5 w-5 mr-1" />
            Add Shift
          </button>
        </template>
      </EmptyState>

      <!-- Main content area -->
      <div v-else-if="filteredShifts.length > 0 || showForm" class="flex flex-col lg:flex-row gap-6">
        <!-- List view -->
        <div class="flex-1" :class="{'hidden lg:block': showForm}">
          <ShiftTable 
            v-if="filteredShifts.length > 0"
            :shifts="filteredShifts"
            @edit="onEdit"
            @delete="confirmDelete"
          />
        </div>

        <!-- Form section -->
        <transition name="slide">
          <div v-if="showForm" class="w-full lg:w-1/3 card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex justify-between items-center mb-4">
                <h3 class="card-title">{{ selectedShift ? 'Edit Shift' : 'Add New Shift' }}</h3>
                <button class="btn btn-sm btn-circle btn-ghost" @click="onCancel">
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
              <ShiftForm 
                :shift="selectedShift" 
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
      :message="`Are you sure you want to delete this shift? This action cannot be undone.`"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useShiftsStore } from "@/store/shifts";
import { useTechnicianStore } from "@/store/technician";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";

// Import components
import ShiftSearchBar from "@/components/Shift/ShiftSearchBar.vue";
import ShiftTable from "@/components/Shift/ShiftTable.vue";
import ShiftForm from "@/components/Shift/ShiftForm.vue";
import EmptyState from "@/components/UI/EmptyState.vue";
import DeleteConfirmationModal from "@/components/UI/DeleteConfirmationModal.vue";

// Store and state
const shiftsStore = useShiftsStore();
const technicianStore = useTechnicianStore();
const loading = ref(true);
const showForm = ref(false);
const selectedShift = ref(null);
const searchQuery = ref('');
const filterDate = ref('');
const filterTechnician = ref('');
const shiftToDelete = ref(null);
const deleting = ref(false);

// Load data
onMounted(async () => {
  try {
    await Promise.all([
      shiftsStore.fetchShifts(),
      technicianStore.fetchTechnicians()
    ]);
  } catch (error) {
    console.error('Failed to load initial data:', error);
  } finally {
    loading.value = false;
  }
});

// Computed
const filteredShifts = computed(() => {
  let result = shiftsStore.list;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(shift => {
      const technicianName = technicianStore.list.find(tech => tech.id === shift.technician_id)?.name || '';
      return (
        technicianName.toLowerCase().includes(query) || 
        (shift.notes && shift.notes.toLowerCase().includes(query))
      );
    });
  }
  
  // Apply date filter
  if (filterDate.value) {
    result = result.filter(shift => shift.date === filterDate.value);
  }
  
  // Apply technician filter
  if (filterTechnician.value) {
    result = result.filter(shift => shift.technician_id === parseInt(filterTechnician.value));
  }
  
  return result;
});

// Methods
function onCreate() {
  selectedShift.value = null;
  showForm.value = true;
}

function onEdit(shift) {
  selectedShift.value = shift;
  showForm.value = true;
}

function confirmDelete(shift) {
  shiftToDelete.value = shift;
  document.getElementById('delete_modal').showModal();
}

async function handleDelete() {
  if (!shiftToDelete.value) return;
  
  deleting.value = true;
  await onDelete(shiftToDelete.value.id);
  
  // Close the modal programmatically
  document.getElementById('delete_modal').close();
  
  deleting.value = false;
  shiftToDelete.value = null;
}

async function onDelete(id) {
  await shiftsStore.deleteShift(id);
}

async function onSaved(shiftData) {
  if (shiftData.id) {
    await shiftsStore.updateShift(shiftData);
  } else {
    await shiftsStore.createShift(shiftData);
  }
  
  showForm.value = false;
  selectedShift.value = null;
  await shiftsStore.fetchShifts();
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

