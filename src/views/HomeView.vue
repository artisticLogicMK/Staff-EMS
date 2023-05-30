<script setup>
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
</script>

<template>
  <div class="bg-[url(../img/workers3.png)] bg-cover bg-center h-screen w-full relative flex items-center justify-center">
    
    <div class="absolute top-0 bg-white/[.50] backdrop-blur-[6px] backdrop-saturate-[171%] w-full h-full"></div>
  
    <div class="relative z-10 w-fit mx-auto text-center p-4">
      <h1 class="font-extrabold text-3xl xsm:text-3xl sm:text-4xl text-neutral-800/90 mb-2">DESIGN AND IMPLEMENTATION OF<br> EMPLOYEE MANAGEMENT SYSTEM</h1>
      <p class="text-base xsm:text-lg text-black/95">This software was developed by Musa Abbas Mujibullah as final year project for 2023</p>
      <p class="font-bold font-mono text-sm mb-3">Reg No: 19D/CSC208/160</p>
      
      <div class="text-center">
        <Login />
        <Signup />
      </div>
    </div>
    
  
  </div>
</template>
