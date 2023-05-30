import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import firebase from '../composables/firebase'
import { getFirestore, setDoc, getDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

//initialize firebase app 
 firebase
 const db = getFirestore()
 
export const useStore = defineStore('store', () => {
  const print = ref(false)
  const navOpen = ref(false)
  const confirmInfo = ref(false)
  
  const staffAll = ref(null)
  const admin = false
  
  //staff datas
  const staffData = ref({
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
  })
  
  //staff data validators
  const bioValidate = () => {
    return Object.values(staffData.value.biodata).every((v) => v !== '')
  }

  const passportValidate = () => {
    return staffData.value.passport !== ''
  }
  
  const academicValidate = () => {
    return Object.values(staffData.value.academic).every((v) => v !== '')
  }
  
  const serviceValidate = () => {
    return Object.values(staffData.value.service).every((v) => v !== '')
  }
  
  const bankValidate = () => {
    return Object.values(staffData.value.bank).every((v) => v !== '')
  }
  
  
  const saveBio = async () => {
    //start loader
    staffData.value.meta.biodata.processing = true
    
    if (bioValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        biodata: staffData.value.biodata
      })
      .then(() => {
        staffData.value.meta.biodata.success = true
        staffData.value.meta.biodata.processing = false
      })
    } else {
      staffData.value.meta.biodata.error = true
      staffData.value.meta.biodata.processing = false
    }
  }
  
  const savePassport = async () => {
    if (passportValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        passport: staffData.value.passport
      })
    }
  }

const saveAcademic = async () => {
    //start loader
    staffData.value.meta.academic.processing = true
    
    if (academicValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        academic: staffData.value.academic
      })
      .then(() => {
        staffData.value.meta.academic.success = true
        staffData.value.meta.academic.processing = false
      })
    } else {
      staffData.value.meta.academic.error = true
      staffData.value.meta.academic.processing = false
    }
  }
  
const saveService = async () => {
    //start loader
    staffData.value.meta.service.processing = true
    
    if (serviceValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        service: staffData.value.service
      })
      .then(() => {
        staffData.value.meta.service.success = true
        staffData.value.meta.service.processing = false
      })
    } else {
      staffData.value.meta.service.error = true
      staffData.value.meta.service.processing = false
    }
  }
  
const saveBank = async () => {
    //start loader
    staffData.value.meta.bank.processing = true
    
    if (serviceValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        bank: staffData.value.bank
      })
      .then(() => {
        staffData.value.meta.bank.success = true
        staffData.value.meta.bank.processing = false
      })
    } else {
      staffData.value.meta.bank.error = true
      staffData.value.meta.bank.processing = false
    }
  }
  
const submitInfo = async () => {
    //start loader
    staffData.value.meta.submit.processing = true
    
    //submit all info if not
    saveBio()
    savePassport()
    saveAcademic()
    saveService()
    saveBank()
    
    if (bioValidate() && passportValidate() && academicValidate() && serviceValidate() && bankValidate()) {
      await updateDoc(doc(db, "staffs", staffAll.value.email), {
        submitted: true
      })
      .then(() => {
        staffData.value.submitted = true
        staffData.value.meta.submit.success = true
        staffData.value.meta.submit.processing = false
        confirmInfo.value = false
      })
    } else {
      staffData.value.meta.submit.processing = false
    }
  }

  return { navOpen, print, staffAll, staffData, saveBio, bioValidate, savePassport, passportValidate, saveAcademic, academicValidate, serviceValidate , saveService, bankValidate, saveBank, submitInfo, confirmInfo, admin }
})
