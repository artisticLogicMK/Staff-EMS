<script setup>
import { useStore } from '../stores/global'
import DashboardNav from "../components/dashboard/DashboardNav.vue"
import DashboardHead from "../components/dashboard/DashboardHead.vue"

const x = useStore()
</script>

<template>
  
  <div class="flex h-fullk">
    
    <DashboardNav />
    
    <main class="grow flex flex-col bg-neutral-200/80 print:bg-white" :class="x.print ? 'h-fit min-h-fit' : 'h-full md:h-screen'">
      
      <DashboardHead />
      
      <div class="md:grow m-3 md:m-6 mt-20 md:mt-6 rounded-md md:overflow-auto print:mt-3" :class="{'mt-28 md:mt-6': x.admin}">
        <div class="bg-white rounded-md shadow-sm p-3 md:p-5 print:shadow-none">
          <slot></slot>
        </div>
      </div>
      
    </main>
    
  </div>
</template>