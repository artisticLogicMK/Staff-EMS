<script setup>
import { useStore } from '../../stores/global'

const x = useStore()
</script>

<template>
  <div class="summhead">Bio Data</div>
  <table class="summtbl">
    <tr>
      <td class="one">Title</td>
      <td class="two">{{x.staffData.biodata.title}}</td>
    </tr>
    
    <tr>
      <td class="one">Full Name</td>
      <td class="two">{{x.staffData.biodata.name}}</td>
    </tr>
    
    <tr>
      <td class="one">Email</td>
      <td class="two">{{x.staffData.biodata.email}}</td>
    </tr>
    
    <tr>
      <td class="one">Gender</td>
      <td class="two">{{x.staffData.biodata.gender}}</td>
    </tr>
    
    <tr>
      <td class="one">Religion</td>
      <td class="two">{{x.staffData.biodata.religion}}</td>
    </tr>
    
    <tr>
      <td class="one">Status</td>
      <td class="two">{{x.staffData.biodata.status}}</td>
    </tr>
    
    <tr>
      <td class="one">Phone No 1</td>
      <td class="two">{{x.staffData.biodata.phone1}}</td>
    </tr>
    
    <tr>
      <td class="one">Phone No 2</td>
      <td class="two">{{x.staffData.biodata.phone2}}</td>
    </tr>
    
    <tr>
      <td class="one">Date of Birth</td>
      <td class="two">{{x.staffData.biodata.dob}}</td>
    </tr>
    
    <tr>
      <td class="one">State</td>
      <td class="two">{{x.staffData.biodata.state}}</td>
    </tr>
    
    <tr>
      <td class="one">LGA</td>
      <td class="two">{{x.staffData.biodata.lga}}</td>
    </tr>
    
    <tr>
      <td class="one">Address</td>
      <td class="two">{{x.staffData.biodata.address}}</td>
    </tr>
  </table>
</template>