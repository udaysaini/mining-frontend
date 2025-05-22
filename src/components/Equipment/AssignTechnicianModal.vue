<template>
  <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Assign Technician</h3>
      <div class="py-4">
        <label class="label">
          <span class="label">Select Technician</span>
        </label>
        <select v-model="selectedTechnicianId" class="select select-bordered w-full">
          <option :value="null" disabled>Choose a technician</option>
          <option v-for="tech in technicians" :key="tech.id" :value="tech.id">{{ tech.name }}</option>
        </select>
      </div>
      <div class="modal-action">
        <form method="dialog" class="flex gap-2">
          <button class="btn">Cancel</button>
          <button 
            class="btn btn-primary" 
            @click="handleAssign"
            :class="{'loading': loading}"
            :disabled="loading || !selectedTechnicianId"
          >
            Assign
          </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTechnicianStore } from '@/store/technician';

const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['assign']);
const technicianStore = useTechnicianStore();
const technicians = ref([]);
const selectedTechnicianId = ref(null);

onMounted(async () => {
  if (technicianStore.list.length === 0) {
    await technicianStore.fetchTechnicians();
  }
  technicians.value = technicianStore.list;
});

function handleAssign() {
  if (selectedTechnicianId.value) {
    emit('assign', selectedTechnicianId.value);
    selectedTechnicianId.value = null;
  }
}

// Reset selection when modal is opened
function resetSelection() {
  selectedTechnicianId.value = null;
}

// Expose method to parent
defineExpose({ resetSelection });
</script>
