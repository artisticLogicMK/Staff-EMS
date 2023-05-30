<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import firebase  from '../../composables/firebase'
import { getFirestore, setDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore'
 
import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InlineMessage from 'primevue/inlinemessage'

//initialize firebase app 
 firebase
 const db = getFirestore()
 
 const router = useRouter()
 
 //user form 
 const signform = ref({ 
     email: '', 
     name: '', 
     error: null, 
     processing: false 
 })
 
 const createStaff = async () => {
    //for when form action is still in process 
    signform.value.processing = true 
    
    //check if user exists
    const docRef = doc(db, "staffs", signform.value.email)
    const snapDoc = await getDoc(docRef)
    
    if(!snapDoc.exists()) {
      //generate application ID
      const appId = "UNIBUJA-" + Math.floor(Math.random() * (999999 - 100000 + 1))
      
      await setDoc(doc(db, "staffs", signform.value.email), { 
        name: signform.value.name, 
        email: signform.value.email,
        appId: appId,
        createdAt: serverTimestamp() 
      }) 
      .then(() => {
        //clear form
        signform.value = { 
           email: '', 
           name: '', 
           error: null, 
           processing: false 
        }
        
        //set session
        sessionStorage.setItem("staffcms", appId)
        sessionStorage.removeItem("admin", "1")
        
        //go to dashboard
        router.push({path: '/'+appId+'/dashboard/biodata'})
      })
    } else {
      signform.value.error = "This emaii is already in use."
      signform.value.processing = false
    }
 }

const visible = ref(false)

const openSignup = () => {
  if (sessionStorage.getItem("staffcms") !== null) {
  //redirect to dashboard if session set
  router.push({path: '/'+sessionStorage.getItem("staffcms")+'/dashboard/biodata'})
  }
  
  visible.value = true
}
</script>

<template>
  <Button label="SignUp" @click="openSignup" />
  
  <Dialog v-model:visible="visible" modal header="SignUp" class="w-96" :breakpoints="{ '960px': '400px', '641px': '92vw' }">
      
  <form @submit.prevent="createStaff">
    <div v-if="signform.error" class="mb-2">
      <InlineMessage severity="error" class="w-full">{{signform.error}}</InlineMessage>
    </div>
    
    <div class="mb-3">
      <InputText v-model="signform.name" placeholder="Full Name" class="input" required />
    </div>
    
    <div class="mb-5">
      <input type="email" v-model="signform.email" placeholder="Email" class="w-full p-inputtext" required />
    </div>
    
    <div class="text-center">
      <Button label="Submit" :loading="signform.processing" loadingIcon="la la-spin la-spinner" type="submit" />
    </div>
  </form>
  
  </Dialog>
</template>