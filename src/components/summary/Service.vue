<script setup>
import { useStore } from '../../stores/global'

const x = useStore()
</script>

<template>
  <div class="summhead">Service Record</div>
  <table class="summtbl">
    <tr>
      <td class="one">Job Category</td>
      <td class="two">{{x.staffData.service.job}}</td>
    </tr>
    
    <tr>
      <td class="one">Appointment Category</td>
      <td class="two">{{x.staffData.service.appointment}}</td>
    </tr>
    
    <tr>
      <td class="one">Present Rank</td>
      <td class="two">{{x.staffData.service.rank}}</td>
    </tr>
    
    <tr>
      <td class="one">Grade/Level</td>
      <td class="two">{{x.staffData.service.grade}}</td>
    </tr>
    
    <tr>
      <td class="one">First Appointment Date</td>
      <td class="two">{{x.staffData.service.first}}</td>
    </tr>
    
    <tr>
      <td class="one">Last Promotion Date</td>
      <td class="two">{{x.staffData.service.last}}</td>
    </tr>
  </table>
</template>