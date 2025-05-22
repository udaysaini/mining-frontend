<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <!-- Navbar with daisyUI - with higher contrast and management focus -->
    <div class="navbar bg-base-100 shadow-sm sticky top-0 z-30 border-b border-base-300">
      <div class="navbar-start">
        <div class="dropdown lg:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary-content"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
              />
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span class="text-xl font-semibold tracking-tight">Field Ops</span>
        </router-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li>
            <router-link to="/dashboard" class="rounded-md font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/technicians" class="rounded-md font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              Technicians
            </router-link>
          </li>
          <li>
            <router-link to="/equipment" class="rounded-md font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              Equipment
            </router-link>
          </li>
          <li>
            <router-link to="/shifts" class="rounded-md font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              Shifts
            </router-link>
          </li>
          <li>
            <router-link to="/reports" class="rounded-md font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                  clip-rule="evenodd"
                />
              </svg>
              Reports
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end gap-1">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-warning"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium">
                        Equipment Maintenance Required
                      </p>
                      <p class="text-xs opacity-70"
                        >Excavator #103 needs inspection</p
                      >
                      <p class="text-xs text-primary mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div class="py-3">
                  <div class="flex items-start">
                    <div class="rounded-full bg-info/20 p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-info"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium">Technician Shift Alert</p>
                      <p class="text-xs opacity-70"
                        >John Smith has clocked overtime</p
                      >
                      <p class="text-xs text-primary mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
                <div class="py-3">
                  <div class="flex items-start">
                    <div class="rounded-full bg-success/20 p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-success"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium">System Update</p>
                      <p class="text-xs opacity-70"
                        >Field Ops software updated to v2.4</p
                      >
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

        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://picsum.photos/200/200" alt="Profile" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge badge-sm badge-primary">Admin</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Breadcrumb with better management context -->
    <div class="bg-base-100 border-b border-base-300">
      <div class="container mx-auto px-4">
        <div class="breadcrumbs text-sm py-3">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li>Current Page</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main content container with animation -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer with theme switcher -->
    <footer class="footer footer-center p-4 bg-base-100 text-base-content border-t border-base-300">
      <aside class="flex items-center gap-4">
        <p class="text-sm opacity-70">
          © 2024 · Field Operations Management
        </p>
        <div class="dropdown dropdown-top">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
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

    <!-- Fixed action button without motion -->
    <div class="fixed bottom-6 right-6 z-10">
      <div class="dropdown dropdown-top dropdown-end">
        <button class="btn btn-primary btn-circle shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4"
        >
          <li><a>New Technician</a></li>
          <li><a>New Equipment</a></li>
          <li><a>Schedule Shift</a></li>
          <li><a>Create Report</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BellIcon } from "@heroicons/vue/24/outline";

// Component setup can be expanded later
</script>

<style>
/* Only adding styles that can't be handled through Tailwind/daisyUI */
.router-link-active {
  background-color: var(--fallback-b2,oklch(var(--b2)/1));
  font-weight: 500;
}

.router-link-exact-active {
  color: var(--fallback-p, oklch(var(--p)/1));
  font-weight: 600;
}

/* Subtle hover effect for interactive elements */
.btn:not(.btn-ghost):hover {
  transform: translateY(-1px);
}

/* Fix for icon alignment in navigation */
.menu-horizontal a svg {
  margin-right: 0.25rem;
  margin-top: -0.125rem;
}
</style>
