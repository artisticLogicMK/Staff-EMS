<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'

import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InlineMessage from 'primevue/inlinemessage'

const router = useRouter()

const visible = ref(false)
const pass = ref('')
const passerror = ref(false)

const checkPass = () => {
  if (pass.value === 'mujib007') {
    sessionStorage.setItem("admin", "1")
    router.push({path: '/adminpanel'})
  } else {
    passerror.value = true
  }
}

onMounted(() => {
  visible.value = true
})
</script>

<template>
  <Dialog v-model:visible="visible" :closable="false" modal header="Admin Login" class="w-96" :breakpoints="{ '960px': '400px', '641px': '92vw' }">
      
  <form @submit.prevent="checkPass">
    <div v-if="passerror" class="mb-2">
      <InlineMessage severity="error" class="w-full">Password Incorrect.</InlineMessage>
    </div>
    
    <div class="mb-3">
      <label>Enter your passowrd to enter Admin Panel.</label>
      <input type="password" v-model="pass" placeholder="Password" class="input mt-2 p-inputtext" required />
    </div>
    
    <div class="text-center">
      <Button label="Enter" type="submit" />
    </div>
  </form>
  
  </Dialog>
</template>