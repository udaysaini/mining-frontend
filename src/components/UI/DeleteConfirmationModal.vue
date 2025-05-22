<template>
  <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <form method="dialog" class="flex gap-2">
          <button class="btn">Cancel</button>
          <button 
            class="btn btn-error" 
            @click="$emit('confirm')"
            :class="{'loading': loading}"
            :disabled="loading"
          >
            Delete
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
defineProps({
  modalId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Deletion'
  },
  message: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['confirm']);
</script>
