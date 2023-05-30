<script setup>
import { ref, onBeforeMount, onMounted } from "vue"
import { useStore } from '../stores/global'
import { useRouter, useRoute } from 'vue-router'
import firebase  from '../composables/firebase'
import { getFirestore, getDocs, doc, query, collection, where } from 'firebase/firestore'

import DashboardLayout from "@/layouts/DashboardLayout.vue"

//initialize firebase app 
firebase
const db = getFirestore()

const x = useStore()
const router = useRouter()
const route = useRoute()

onBeforeMount( async () => {
  const q = query(collection(db, "staffs"), where("appId", "==", route.params.appId))
  const snapshot = await getDocs(q)
  snapshot.forEach((doc) => {
    x.staffAll = doc.data()
  })
  
  //populate biodata fields
  if(x.staffAll?.biodata !== undefined) {
    for (const [key,val] of Object.entries(x.staffAll.biodata)) {
      x.staffData.biodata[key] = x.staffAll.biodata[key]
    } 
  }
  
  //populate passport
  if(x.staffAll?.passport !== undefined) {
    x.staffData.passport = x.staffAll.passport
  }
  
  //populate academic fields
  if(x.staffAll?.academic !== undefined) {
    for (const [key,val] of Object.entries(x.staffAll.academic)) {
      x.staffData.academic[key] = x.staffAll.academic[key]
    } 
  }
  
  //populate service fields
  if(x.staffAll?.service !== undefined) {
    for (const [key,val] of Object.entries(x.staffAll.service)) {
      x.staffData.service[key] = x.staffAll.service[key]
    } 
  }
  
    //populate bank fields
  if(x.staffAll?.bank !== undefined) {
    for (const [key,val] of Object.entries(x.staffAll.bank)) {
      x.staffData.bank[key] = x.staffAll.bank[key]
    } 
  }
  
  //populate submitted
  if(x.staffAll?.submitted !== undefined) {
    x.staffData.submitted = x.staffAll.submitted
  }
  
  if (sessionStorage.getItem("staffcms") === null) {
    //redirect to home if session ! set
    router.push({path: '/'})
  }
  
  if (sessionStorage.getItem("admin") !== null) {
    //indicate admin
    x.admin = true
  }
})

onMounted( async () => {

})
</script>

<template>
  <DashboardLayout>
    <router-view></router-view>
  </DashboardLayout>
</template>