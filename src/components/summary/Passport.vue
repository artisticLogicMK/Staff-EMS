<script setup>
import { useStore } from '../../stores/global'

const x = useStore()
</script>

<template>
  <div class="summhead mb-2">Passport</div>
  
  <div class="relative rounded bg-neutral-200/90 inline-flex items-center justify-center w-28 h-28 mb-4">
    <i class="la la-user text-7xl text-neutral-400"></i>
    <img v-if="x.staffData.passport" :src="x.staffData.passport" class="absolute w-full h-full rounded" />
  </div>
</template>