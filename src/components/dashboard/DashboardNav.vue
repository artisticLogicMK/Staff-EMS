<script setup>
import { ref } from 'vue'
import { useStore } from '../../stores/global'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()

const route = useRoute()

const routePrefix = "/"+route.params.appId+"/dashboard"
</script>

<template>
  <nav
    v-if="!store.print"
    :class="store.navOpen ? 'block absolute top-0 z-20 md:static bg-black/10 w-full h-full md:w-auto' : 'hidden md:block'"
  >
    
    <div
      class="relative w-64 md:w-56 lg:w-64 h-full md:h-screen bg-neutral-700 text-white/95 p-3 shadow-md"
    >
      
      <div class="absolute top-0 right-0 m-2 md:hidden cursor-pointer" @click="store.navOpen = false">
        <i class="la la-times text-3xl text-white"></i>
      </div>
      
      <div class="flex items-center mb-7">
        <span v-if="!store.admin" @click="$router.push({path:'/'})" class="rounded-full text-center border border-transparent hover:border-neutral-300 px-1 mr-2 cursor-pointer">
          <i class="la la-angle-left"></i>
        </span>
        <span class="font-semibold text-lg">Dashboard</span>
      </div>
      
      <div class="font-semibold text-sm mb-2">Application Process</div>
      
      <div class="relative">
        <div class="absolute border-r border-dashed border-neutral-300 h-[92%] ml-6"></div>
        
        <div class="relative z-10 text-base text-neutral-300">
          <RouterLink :to="{path: routePrefix+'/biodata'}" class="navTabs" :class="{'complete': store.bioValidate()}">
            <span class="icon"><i class="la la-check"></i></span>
            <span>Bio Data</span>
          </RouterLink>
          
          <RouterLink :to="{path: routePrefix+'/passport'}" class="navTabs" :class="{'complete': store.passportValidate()}">
            <span class="icon"><i class="la la-check"></i></span>
            <span>Passport</span>
          </RouterLink>
    
          <RouterLink :to="{path: routePrefix+'/academic'}" class="navTabs" :class="{'complete': store.academicValidate()}">
            <span class="icon"><i class="la la-check"></i></span>
            <span>Academic Record</span>
          </RouterLink>
          
          <RouterLink :to="{path: routePrefix+'/service'}" class="navTabs" :class="{'complete': store.serviceValidate()}">
            <span class="icon"><i class="la la-check"></i></span>
            <span>Service Record</span>
          </RouterLink>
          
          <RouterLink :to="{path: routePrefix+'/bank'}" class="navTabs" :class="{'complete': store.bankValidate()}">
            <span class="icon"><i class="la la-check"></i></span>
            <span>Bank Details</span>
          </RouterLink>
          
          <RouterLink :to="{path: routePrefix+'/summary'}" class="navTabs">
            <span class="icon"><i class="la la-arrow-right"></i></span>
            <span>Summary</span>
          </RouterLink>
        </div>
        
      </div>
    </div>
    
  </nav>
</template>

<style>
.navTabs{@apply block rounded px-3 py-2 cursor-pointer}
.navTabs.router-link-active{@apply bg-neutral-800}
.navTabs.router-link-active .icon{@apply bg-neutral-800}
.navTabs .icon{@apply bg-neutral-600 inline-flex items-center justify-center rounded-full border border-neutral-300 w-6 h-6 mr-2}
.navTabs.complete .icon{@apply text-green-400 border-green-400 }
</style>