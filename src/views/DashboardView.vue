<template>
  <div class="py-2">
    <!-- Dashboard header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Operations Dashboard</h1>
        <p class="text-sm opacity-70">Overview of field operations and equipment status</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
          </svg>
          Filter
        </button>
        <button class="btn btn-sm btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
          </svg>
          Export
        </button>
      </div>
    </div>
    
    <!-- Stats overview -->
    <div class="stats shadow w-full mb-6">
      <div class="stat">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <div class="stat-title">Active Technicians</div>
        <div class="stat-value">32</div>
        <div class="stat-desc">↑ 2 from last week</div>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        </div>
        <div class="stat-title">Equipment Utilization</div>
        <div class="stat-value">78%</div>
        <div class="stat-desc">↑ 6% from last month</div>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-title">Maintenance Alerts</div>
        <div class="stat-value">7</div>
        <div class="stat-desc">↓ 3 from yesterday</div>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-title">Scheduled Shifts</div>
        <div class="stat-value">42</div>
        <div class="stat-desc">For next 7 days</div>
      </div>
    </div>
    
    <!-- Equipment Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title flex justify-between">
            Equipment Status
            <button class="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </button>
          </h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipment</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EX-103</td>
                  <td>Excavator</td>
                  <td><span class="badge badge-warning">Maintenance</span></td>
                  <td>North Pit</td>
                </tr>
                <tr>
                  <td>DT-085</td>
                  <td>Dump Truck</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>East Haul Road</td>
                </tr>
                <tr>
                  <td>LD-042</td>
                  <td>Loader</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>South Deposit</td>
                </tr>
                <tr>
                  <td>DR-115</td>
                  <td>Drill</td>
                  <td><span class="badge badge-error">Out of Service</span></td>
                  <td>Workshop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title flex justify-between">
            Active Technicians
            <button class="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </button>
          </h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Tech ID</th>
                  <th>Name</th>
                  <th>Assignment</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>T-045</td>
                  <td>John Smith</td>
                  <td>Excavator Maintenance</td>
                  <td>6.5 / 8</td>
                </tr>
                <tr>
                  <td>T-023</td>
                  <td>Maria Garcia</td>
                  <td>Haul Road Inspection</td>
                  <td>4 / 8</td>
                </tr>
                <tr>
                  <td>T-067</td>
                  <td>Robert Chen</td>
                  <td>Drill Operation</td>
                  <td>7.5 / 8</td>
                </tr>
                <tr>
                  <td>T-089</td>
                  <td>Sarah Johnson</td>
                  <td>Equipment Training</td>
                  <td>2 / 8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Charts and Maps -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card bg-base-100 shadow-md md:col-span-2">
        <div class="card-body">
          <h2 class="card-title">Production Overview</h2>
          <div class="h-64 flex items-center justify-center">
            <!-- Placeholder for chart -->
            <div class="w-full h-full bg-base-200 rounded-lg flex items-center justify-center">
              <p class="text-base-content/50">Production Chart Visualization</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title">Site Map</h2>
          <div class="h-64 flex items-center justify-center">
            <!-- Placeholder for map -->
            <div class="w-full h-full bg-base-200 rounded-lg flex items-center justify-center">
              <p class="text-base-content/50">Interactive Site Map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dashboard component functionality will be added later
</script>
