<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import firebase  from '../composables/firebase'
import { getFirestore, getDocs, doc, query, collection, where, deleteDoc } from 'firebase/firestore'
import { useStore } from '../stores/global'
import { useRouter } from 'vue-router'

import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

//initialize firebase app 
firebase
const db = getFirestore()

const x = useStore()
const router = useRouter()

const staffs = ref([])
const staffsp = ref([])

const confirmDel = ref(false)
const deleting = ref(false)
const sort = ref('all')
const searchOpen = ref(false)
const searchVal = ref('')

const deleteStaff = (email) => {
  deleting.value = true
  const thedoc = doc(db, "staffs", email)
  deleteDoc(thedoc).then(() => {
    confirmDel.value = false
    deleting.value = false
    
    staffs.value = staffs.value.filter((stf) => stf.email !== email)
  })
}

const filter = () => {
  if (sort.value === 'all') {
    staffs.value = staffsp.value
  }
  if (sort.value === 'academic') {
    staffs.value = staffsp.value.filter((s) => s.academic === 'academic')
  }
  if (sort.value === 'none') {
    staffs.value = staffsp.value.filter((s) => s.academic === 'nonacademic')
  }
}

const searchStaff = () => {
  const val = searchVal.value
  if (val) {
    staffs.value = staffsp.value.filter((s) => s.appId === val || s.email === val)
  } else {
    staffs.value = staffsp.value
  }
}

const refreshSearch = () => {
  staffs.value = staffsp.value
}

const toStaff = (appId) => {
  sessionStorage.setItem("staffcms", appId)
  router.push({path: '/'+appId+'/dashboard/summary'})
}

const logoutAdmin = () => {
  sessionStorage.removeItem("admin")
  router.push({path: '/admin'})
}

onBeforeMount( async () => {
  if (sessionStorage.getItem("admin") === null) {
    //redirect to admin login if session ! set
    router.push({path: '/admin'})
  }
  
  const q = query(collection(db, "staffs"), where("submitted", "==", true))
  const snapshot = await getDocs(q)
  
  snapshot.forEach((doc) => {
    const data = doc.data()
    const construct = {
      appId: data.appId,
      name: data.biodata.name,
      email: data.email,
      academic: data.academic.stafftype
    }
    staffs.value.push(construct)
    staffsp.value.push(construct)
  })
})

onMounted(() => {
  //x.admin = true
})
</script>

<template>
  <div class="relative bg-neutral-200/80 h-screen w-full flex flex-col py-5 px-2 md:px-5">
    
    <div class="fixed top-0 left-0 z-10 w-full bg-neutral-700 shadow-md text-center text-lg sm:text-xl font-semibold text-white py-2.5 px-3 md:px-5">
      <div class="flex justify-between items-center w-full max-w-5xl mx-auto">
        Admin Panel
        <i @click="logoutAdmin" class="la la-power-off text-3xl cursor-pointer"></i>
      </div>
    </div>
    
    <div class="grow bg-white w-full max-w-4xl mx-auto rounded-md shadow-sm mt-11 md:mt-12 p-3">
  
      <div class="flex justify-between items-end pb-2 border-b mb-2">
        <div class="font-semibold text-base text-neutral-400">Staff</div>
        
        <div class="flex">
          <i class="la la-sort text-lg mr-0.5 text-neutral-500"></i>
          <select class="border rounded text-neutral-500 bg-white p-1 focus:outline-0" v-model="sort" @change="filter">
            <option value="all">All</option>
            <option value="academic">Academic</option>
            <option value="none">Non Academic</option>
          </select>
          <div @click="searchOpen = !searchOpen" class="rounded-full border text-base px-2 flex justify-center items-center text-neutral-500 ml-1.5 cursor-pointer"><i class="la la-search"></i></div>
        </div>
      </div>
      
      <div v-if="searchOpen" class="flex mb-2">
        <InputText v-model="searchVal" placeholder="Application ID or Email" class="grow" />
        <Button icon="la la-search" class="ml-2" rounded @click="searchStaff" />
        <Button icon="la la-refresh" class="ml-2" rounded @click="refreshSearch" />
      </div>
      
      <div class="w-full overflow-x-auto">
        <table class="stafftbl min-w-[730px]">
          <tr>
            <th>No</th>
            <th>App Id</th>
            <th>Name</th>
            <th>Email</th>
            <th colspan="2">Action</th>
            <th></th>
          </tr>
          
          <tr v-for="(stf, i) in staffs" :key="stf.appId">
            <td>{{i+1}}</td>
            <td>{{stf.appId}}</td>
            <td>{{stf.name}}</td>
            <td>{{stf.email}}</td>
            <td>
              <button @click="toStaff(stf.appId)" class="border-none bg-neutral-600 rounded text-white text-sm px-2 py-1">Edit</button>
            </td>
            <td>
              <button @click="confirmDel = stf.email" class="border border-neutral-600 bg-none rounded text-neutral-600 text-sm px-2 py-1 ml-2">Delete</button>
            </td>
            <td><input type="checkbox"></td>
          </tr>
        </table>
      </div>
      
    </div>
    
  </div>
  
  <Dialog v-model:visible="confirmDel" modal  class="w-96" :breakpoints="{ '960px': '400px', '641px': '92vw' }">
    <p>
        Are you sure want to delete this staff?
    </p>
    <template #footer>
        <Button label="Cancel" icon="la la-times" @click="confirmDel = false" autofocus text />
        <Button label="Proceed" icon="la la-check" @click="deleteStaff(confirmDel)" :loading="deleting" loadingIcon="la la-spin la-spinner" />
    </template>
  </Dialog>
</template>

<style>
.stafftbl{@apply w-full}
.stafftbl tr{@apply even:bg-neutral-100/70}
.stafftbl td{@apply p-2 text-neutral-500 text-start}
.stafftbl th{@apply px-2 py-1 text-start text-sm text-neutral-600/90}
</style>