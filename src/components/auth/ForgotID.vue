<script setup>
import { ref } from "vue"
import firebase  from '../../composables/firebase'
import { getFirestore, getDoc, doc } from 'firebase/firestore'

import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InlineMessage from 'primevue/inlinemessage'

//initialize firebase app 
firebase
const db = getFirestore()
 
 //user form 
 const recform = ref({ 
     email: '', 
     appId: '', 
     error: null, 
     processing: false 
 })
 
 const recover = async () => {
    //for when form action is still in process 
    recform.value.processing = true 
    
    //check if staff exists
    const docRef = doc(db, "staffs", recform.value.email)
    const snapDoc = await getDoc(docRef)
    
    if(snapDoc.exists()) {
        //clear form
        recform.value = { 
           email: '', appId: snapDoc.data().appId, error: null, processing: false 
       }
    } else {
      recform.value.error = "Incorrect information given."
      recform.value.processing = false
    }
 }

const visible = ref(false)
</script>

<template>
  <span class="mr-2 text-neutral-500 font-semibold text-sm hover:underline cursor-pointer" @click="visible = true">Forgot Application ID?</span>
  
  <Dialog v-model:visible="visible" modal header="Forgot ID" class="w-96" :breakpoints="{ '960px': '400px', '641px': '92vw' }">
      
  <form @submit.prevent="recover">
    <div v-if="recform.error" class="mb-2">
      <InlineMessage severity="error" class="w-full">{{recform.error}}</InlineMessage>
    </div>
    
    <div class="mb-5">
      <label>Enter your email to recover your Application ID.</label>
      <input type="email" v-model="recform.email" placeholder="Email" class="input mt-2 p-inputtext" required />
    </div>
    
    <div v-if="recform.appId" class="mb-5 -mt-2">
      <label>Here is your Application ID</label>
      <InputText v-model="recform.appId" placeholder="App ID" class="input mt-2" />
    </div>
    
    <div class="text-center">
      <Button label="Submit" :loading="recform.processing" loadingIcon="la la-spin la-spinner" type="submit" />
    </div>
  </form>
  
  </Dialog>
</template>