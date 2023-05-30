<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import firebase  from '../../composables/firebase'
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore'

import ForgotID from './ForgotID.vue'
import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InlineMessage from 'primevue/inlinemessage'

//initialize firebase app 
 firebase
 
 const db = getFirestore()
 
 const router = useRouter()
 
 //user form 
 const loginform = ref({ 
     email: '', 
     appId: '', 
     error: null, 
     processing: false 
 })
 
 const login = async () => {
    //for when form action is still in process 
    loginform.value.processing = true 
    
    //check if staff exists
    const docRef = doc(db, "staffs", loginform.value.email)
    const snapDoc = await getDoc(docRef)
    
    const stopLoad = () => {
      loginform.value.error = "Incorrect information given."
      loginform.value.processing = false
    }
    
    if(snapDoc.exists()) {
      if (snapDoc.data().appId === loginform.value.appId) {
        //clear form
        loginform.value = { 
           email: '', appId: '', error: null, processing: false 
       }
        
        //set session
        sessionStorage.setItem("staffcms", snapDoc.data().appId)
        sessionStorage.removeItem("admin", "1")
        
        //go to dashboard
        //and no admin session
        if (snapDoc.data().submitted) {
          router.push({path: '/'+snapDoc.data().appId+'/dashboard/summary'})
        } else {
          router.push({path: '/'+snapDoc.data().appId+'/dashboard/biodata'})
        }
      } else{
        stopLoad()
      }
    } else {
      stopLoad()
    }
 }

const visible = ref(false)

const openLogin = () => {
  if (sessionStorage.getItem("staffcms") !== null) {
  //redirect to dashboard if session set
  router.push({path: '/'+sessionStorage.getItem("staffcms")+'/dashboard/biodata'})
  }
  
  visible.value = true
}
</script>

<template>
  <Button class="p-ripple mr-3 bg-neutral-700" label="Login" @click="openLogin"  />
  
  <Dialog v-model:visible="visible" modal header="Login" class="w-96" :breakpoints="{ '960px': '400px', '641px': '92vw' }">
      
  <form @submit.prevent="login">
    <div v-if="loginform.error" class="mb-2">
      <InlineMessage severity="error" class="w-full">{{loginform.error}}</InlineMessage>
    </div>
    
    <div class="mb-3">
      <input type="email" v-model="loginform.email" placeholder="Email" class="input p-inputtext" required />
    </div>
    
    <div class="mb-5">
      <InputText v-model="loginform.appId" placeholder="Application ID" class="input" required />
    </div>
    
    <div class="flex justify-between items-center">
      <ForgotID />
      <Button label="Submit" :loading="loginform.processing" loadingIcon="la la-spin la-spinner" type="submit" />
    </div>
  </form>
  
  </Dialog>
</template>