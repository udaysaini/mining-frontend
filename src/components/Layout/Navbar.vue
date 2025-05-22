<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-30 border-b border-base-300">
    <div class="navbar-start">
      <div class="dropdown lg:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <Bars3Icon class="h-5 w-5" />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
        >
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/technicians">Technicians</router-link></li>
          <li><router-link to="/equipment">Equipment</router-link></li>
          <li><router-link to="/shifts">Shifts</router-link></li>
          <li><router-link to="/reports">Reports</router-link></li>
        </ul>
      </div>
      <router-link to="/" class="flex items-center gap-2 px-2">
        <div class="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
          <CurrencyDollarIcon class="h-6 w-6 text-primary-content" />
        </div>
        <span class="text-xl font-semibold tracking-tight">Field Ops</span>
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-1">
        <li>
          <router-link to="/dashboard" class="rounded-md font-medium">
            <ChartPieIcon class="h-5 w-5" />
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/technicians" class="rounded-md font-medium">
            <UserGroupIcon class="h-5 w-5" />
            Technicians
          </router-link>
        </li>
        <li>
          <router-link to="/equipment" class="rounded-md font-medium">
            <BriefcaseIcon class="h-5 w-5" />
            Equipment
          </router-link>
        </li>
        <li>
          <router-link to="/shifts" class="rounded-md font-medium">
            <ClockIcon class="h-5 w-5" />
            Shifts
          </router-link>
        </li>
        <li>
          <router-link to="/reports" class="rounded-md font-medium">
            <DocumentChartBarIcon class="h-5 w-5" />
            Reports
          </router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-1">
      <NavbarNotifications />
      <NavbarProfile />
    </div>
  </div>
</template>

<script setup>
import { 
  Bars3Icon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  DocumentChartBarIcon,
  ChartPieIcon,
  CurrencyDollarIcon
} from "@heroicons/vue/24/outline";
import NavbarNotifications from './NavbarNotifications.vue';
import NavbarProfile from './NavbarProfile.vue';
</script>

<style scoped>
/* Fix for icon alignment in navigation */
.menu-horizontal a svg {
  margin-right: 0.25rem;
  margin-top: -0.125rem;
}
</style>
