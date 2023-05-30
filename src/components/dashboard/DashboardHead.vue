<script setup>
import { useStore } from '../../stores/global'
import { useRouter } from 'vue-router'

import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'

const x = useStore()
const router = useRouter()

const logout = () => {
  sessionStorage.removeItem("staffcms")
  sessionStorage.removeItem("admin")
  
  //clear datas
  x.staffData = {
    biodata: {
      title: '',
      name: '',
      email: '',
      gender: '',
      religion: '',
      status: '',
      phone1: '',
      phone2: '',
      dob: '',
      state: '',
      lga: '',
      address: '',
    },
    passport: '',
    academic: {
      stafftype: '',
      qualification: '',
      descipline: '',
    },
    service: {
      job: '',
      appointment: '',
      rank: '',
      grade: '',
      first: '',
      last: ''
    },
    bank: {
      ippis: '',
      name: '',
      email: '',
      bankname: '',
      account: '',
      pfa: '',
      pfapin: '',
      nin: '',
      bvn: '',
      kin: '',
      phone: '',
      relationship: '',
      address: ''
    },
    submitted: false,
    meta: {
      biodata: {
        error: null,
        processing: false
      },
      academic: {
        error: null,
        processing: false
      },
      service: {
        error: null,
        processing: false
      },
      bank: {
        error: null,
        processing: false
      },
      submit: {
        processing: false,
        success: false
      }
    }
  }
  
  router.push({path: '/'})
}
</script>

<template>
  <RouterLink v-if="x.admin" :to="{path: '/adminpanel'}" class="fixed top-0 z-10 md:static w-full md:w-auto bg-neutral-800/90 w-full text-center p-2 text-white font-semibold text-sm">
      <i class="la la-angle-left"></i> Back to Admin Panel
  </RouterLink>
  
  <div v-if="!x.print" class="fixed top-0 z-10 md:static w-full md:w-auto bg-white shadow-sm flex justify-between items-center py-2 px-3" :class="{'mt-9 md:mt-0': x.admin}">
    
    <div class="flex items-center text-sm text-base">
      <i class="la la-bars text-neutral-600 text-3xl mr-2 md:hidden cursor-pointer" @click="x.navOpen = true"></i>
      <span class="text-neutral-400">App ID:</span>
      <span class="text-neutral-600"> {{$route.params.appId}}</span>
    </div>
    
    <div class="relative group">
      <Avatar icon="la la-user" size="large" shape="circle" />
      
      <div class="absolute top-full right-0 bg-white rounded border text-base min-w-[120px] shadow-md scale-y-0 origin-center group-hover:scale-y-100">
        <div class="font-semibold text-sm text-neutral-600 py-2 px-3 border-b">{{x.staffAll?.email}}</div>
        <div class="text-neutral-600 py-2 px-3 hover:bg-neutral-100 cursor-pointer" @click="logout">
          <i class="la la-power-off"></i> Logout
        </div>
      </div>
    </div>
  </div>
</template>