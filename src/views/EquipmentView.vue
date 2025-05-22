<template>
  <div class="space-y-6">
    <!-- Header with title and actions -->
    <div class="flex items-center justify-between pb-4 border-b border-base-300">
      <div>
        <h2 class="text-2xl font-bold">Equipment</h2>
        <p class="text-sm opacity-70">Manage mining equipment and assignments</p>
      </div>
      <button class="btn btn-primary" @click="onCreate">
        <PlusIcon class="h-5 w-5 mr-1" />
        Add Equipment
      </button>
    </div>

    <!-- Content area with filtering options -->
    <div class="flex flex-col gap-4">
      <!-- Search and filter tools -->
      <EquipmentSearchBar
        v-model:searchQuery="searchQuery"
        v-model:typeFilter="typeFilter"
        v-model:statusFilter="statusFilter"
        v-model:viewMode="viewMode"
      />

      <!-- Loading state -->
      <div v-if="equipmentStore.loading" class="w-full flex justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Empty state -->
      <EmptyState
        v-else-if="filteredEquipment.length === 0 && !showForm"
        title="No equipment found"
        :message="searchQuery || typeFilter || statusFilter ? 'Try changing your search or filters' : 'Get started by adding your first equipment'"
      >
        <template v-if="!searchQuery && !typeFilter && !statusFilter" #action>
          <button class="btn btn-primary mt-2" @click="onCreate">
            <PlusIcon class="h-5 w-5 mr-1" />
            Add Equipment
          </button>
        </template>
      </EmptyState>

      <!-- Main content area -->
      <div v-else-if="filteredEquipment.length > 0 || showForm" class="flex flex-col lg:flex-row gap-6">
        <!-- List/Grid view based on selection -->
        <div class="flex-1" :class="{'hidden': viewMode === 'grid' && showForm}">
          <EquipmentTable 
            v-if="viewMode === 'list' && filteredEquipment.length > 0" 
            :equipment="filteredEquipment"
            @edit="onEdit"
            @delete="confirmDelete"
            @assign="showAssignModal"
            @unassign="confirmUnassign"
          />
          
          <EquipmentGrid
            v-else-if="filteredEquipment.length > 0"
            :equipment="filteredEquipment"
            @edit="onEdit"
            @delete="confirmDelete"
            @assign="showAssignModal"
            @unassign="confirmUnassign"
          />
        </div>

        <!-- Form section - Added key to force re-render -->
        <transition name="slide">
          <div v-if="showForm" class="w-full lg:w-1/3 card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex justify-between items-center mb-4">
                <h3 class="card-title">{{ selectedEquipment ? 'Edit Equipment' : 'Add New Equipment' }}</h3>
                <button class="btn btn-sm btn-circle btn-ghost" @click="onCancel">
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
              <EquipmentForm 
                :equipment="selectedEquipment" 
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
      :message="`Are you sure you want to delete ${equipmentToDelete?.name}? This action cannot be undone.`"
      :loading="deleting"
      @confirm="handleDelete"
    />
    
    <!-- Unassign confirmation modal -->
    <DeleteConfirmationModal
      modalId="unassign_modal"
      title="Confirm Unassign"
      :message="`Are you sure you want to unassign this equipment? The technician will no longer be responsible for it.`"
      :loading="unassigning"
      @confirm="handleUnassign"
    />
    
    <!-- Assign technician modal -->
    <AssignTechnicianModal
      ref="assignModal"
      modalId="assign_modal"
      :loading="assigning"
      @assign="handleAssign"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEquipmentStore } from "@/store/equipment";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";

// Import components
import EquipmentSearchBar from "@/components/Equipment/EquipmentSearchBar.vue";
import EquipmentTable from "@/components/Equipment/EquipmentTable.vue";
import EquipmentGrid from "@/components/Equipment/EquipmentGrid.vue";
import EquipmentForm from "@/components/Equipment/EquipmentForm.vue";
import AssignTechnicianModal from "@/components/Equipment/AssignTechnicianModal.vue";
import EmptyState from "@/components/UI/EmptyState.vue";
import DeleteConfirmationModal from "@/components/UI/DeleteConfirmationModal.vue";

// Store and state
const equipmentStore = useEquipmentStore();
// Make sure showForm is properly initialized as a reactive boolean
const showForm = ref(false);

// Log initial state
console.log('Initial showForm value:', showForm.value);

const selectedEquipment = ref(null);
const viewMode = ref('list');
const searchQuery = ref('');
const typeFilter = ref('');
const statusFilter = ref('');
const equipmentToDelete = ref(null);
const equipmentToUnassign = ref(null);
const equipmentToAssign = ref(null);
const deleting = ref(false);
const unassigning = ref(false);
const assigning = ref(false);
const assignModal = ref(null);

// Load data
onMounted(() => {
  equipmentStore.fetchEquipment();
});

// Computed
const filteredEquipment = computed(() => {
  let result = equipmentStore.list;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(equip => 
      equip.name.toLowerCase().includes(query) || 
      (equip.type && equip.type.toLowerCase().includes(query)) ||
      (equip.location && equip.location.toLowerCase().includes(query))
    );
  }
  
  // Apply type filter
  if (typeFilter.value) {
    result = result.filter(equip => equip.type === typeFilter.value);
  }
  
  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(equip => equip.status === statusFilter.value);
  }
  
  return result;
});

// Methods
function onCreate() {
  selectedEquipment.value = null;
  showForm.value = true;
  // Add console log for debugging
  console.log('onCreate called, showForm:', showForm.value);
}

function onEdit(equipment) {
  selectedEquipment.value = equipment;
  showForm.value = true;
}

function confirmDelete(equipment) {
  equipmentToDelete.value = equipment;
  document.getElementById('delete_modal').showModal();
}

function confirmUnassign(equipmentId) {
  equipmentToUnassign.value = equipmentId;
  document.getElementById('unassign_modal').showModal();
}

function showAssignModal(equipmentId) {
  equipmentToAssign.value = equipmentId;
  if (assignModal.value) {
    assignModal.value.resetSelection();
  }
  document.getElementById('assign_modal').showModal();
}

async function handleDelete() {
  if (!equipmentToDelete.value) return;
  
  deleting.value = true;
  await equipmentStore.deleteEquipment(equipmentToDelete.value.id);
  document.getElementById('delete_modal').close();
  deleting.value = false;
  equipmentToDelete.value = null;
}

async function handleUnassign() {
  if (!equipmentToUnassign.value) return;
  
  unassigning.value = true;
  await equipmentStore.unassignEquipment(equipmentToUnassign.value);
  document.getElementById('unassign_modal').close();
  unassigning.value = false;
  equipmentToUnassign.value = null;
}

async function handleAssign(technicianId) {
  if (!equipmentToAssign.value || !technicianId) return;
  
  assigning.value = true;
  await equipmentStore.assignEquipment(equipmentToAssign.value, technicianId);
  document.getElementById('assign_modal').close();
  assigning.value = false;
  equipmentToAssign.value = null;
}

async function onSaved(equipmentData) {
  if (equipmentData.id) {
    await equipmentStore.updateEquipment(equipmentData);
  } else {
    await equipmentStore.createEquipment(equipmentData);
  }
  
  showForm.value = false;
  selectedEquipment.value = null;
  await equipmentStore.fetchEquipment();
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

