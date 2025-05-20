<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Technicians</h2>
      <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="onCreate">
        + New
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- List takes 2/3 of width on desktop -->
      <div class="flex-1 bg-white shadow rounded p-4">
        <TechnicianList :technicians="technicianStore.list" @edit="onEdit" @delete="onDelete" />
      </div>

      <!-- Form takes 1/3 of width -->
      <transition name="fade">
        <div v-if="showForm" class="w-full lg:w-1/3 bg-white shadow rounded p-4">
          <TechnicianForm :technician="selectedTechnician" @saved="onSaved" @cancel="onCancel" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTechnicianStore } from "@/store/technician";
import TechnicianList from "@/components/Technician/TechnicianList.vue";
import TechnicianForm from "@/components/Technician/TechnicianForm.vue";

// 1. Instantiate the store
const technicianStore = useTechnicianStore();

// 2. Local reactive state for form visibility and selected record
const showForm = ref(false);
const selectedTechnician = ref(null);

// 3. Load the list on component mount
onMounted(() => {
  technicianStore.fetchTechnicians();
});

// 4. Handlers
function onCreate() {
  selectedTechnician.value = null;
  showForm.value = true;
}

function onEdit(technician) {
  selectedTechnician.value = technician;
  showForm.value = true;
}

async function onDelete(id) {
  await technicianStore.deleteTechnician(id);
}

async function onSaved(technicianData) {
  console.log("onSaved Called.", selectedTechnician.value);
  console.log("onSaved Data:", technicianData);
  if (technicianData.id) {
    await technicianStore.updateTechnician(technicianData);
  } else {
    await technicianStore.createTechnician(technicianData);
  }
  
  showForm.value = false; // Hide the form after saving
  selectedTechnician.value = null; // Reset the selected technician
  await technicianStore.fetchTechnicians();
}

function onCancel() {
  showForm.value = false;
}
</script>
