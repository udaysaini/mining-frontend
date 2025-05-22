<template>
  <footer class="footer footer-center p-4 bg-base-100 text-base-content border-t border-base-300">
    <aside class="flex items-center gap-4">
      <p class="text-sm opacity-70">
        © {{ currentYear }} · Field Operations Management
      </p>
      <div class="dropdown dropdown-top">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm">
          <SwatchIcon class="h-5 w-5" />
        </div>
        <div
          tabindex="0"
          class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
        >
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label">Light Theme</span>
              <input
                type="radio"
                name="theme-dropdown"
                class="theme-controller"
                value="mining"
                checked
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label">Dark Theme</span>
              <input
                type="radio"
                name="theme-dropdown"
                class="theme-controller"
                value="mining-dark"
              />
            </label>
          </div>
        </div>
      </div>
    </aside>
  </footer>
</template>

<script setup>
import { SwatchIcon } from "@heroicons/vue/24/outline";
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>
