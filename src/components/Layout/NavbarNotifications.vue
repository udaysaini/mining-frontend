<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <BellIcon class="h-5 w-5" />
        <span class="badge badge-sm badge-primary indicator-item">3</span>
      </div>
    </div>
    <div
      tabindex="0"
      class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-lg"
    >
      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold m-0">Notifications</h3>
          <span class="badge badge-primary">3 New</span>
        </div>
        <div class="divide-y divide-base-300">
          <div class="py-3">
            <div class="flex items-start">
              <div class="rounded-full bg-warning/20 p-2 mr-3">
                <ExclamationTriangleIcon class="h-5 w-5 text-warning" />
              </div>
              <div>
                <p class="text-sm font-medium">
                  Equipment Maintenance Required
                </p>
                <p class="text-xs opacity-70">Excavator #103 needs inspection</p>
                <p class="text-xs text-primary mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
          <div class="py-3">
            <div class="flex items-start">
              <div class="rounded-full bg-info/20 p-2 mr-3">
                <ClockIcon class="h-5 w-5 text-info" />
              </div>
              <div>
                <p class="text-sm font-medium">Technician Shift Alert</p>
                <p class="text-xs opacity-70">John Smith has clocked overtime</p>
                <p class="text-xs text-primary mt-1">4 hours ago</p>
              </div>
            </div>
          </div>
          <div class="py-3">
            <div class="flex items-start">
              <div class="rounded-full bg-success/20 p-2 mr-3">
                <CheckCircleIcon class="h-5 w-5 text-success" />
              </div>
              <div>
                <p class="text-sm font-medium">System Update</p>
                <p class="text-xs opacity-70">Field Ops software updated to v2.4</p>
                <p class="text-xs text-primary mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card-actions mt-2">
          <button class="btn btn-primary btn-sm w-full">View All</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BellIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/vue/24/outline";
</script>
