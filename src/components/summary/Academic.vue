<script setup>
import { useStore } from '../../stores/global'

const x = useStore()
</script>

<template>
  <div class="summhead">Academic Record</div>
  <table class="summtbl">
    <tr>
      <td class="one">Staff Type</td>
      <td class="two">{{x.staffData.academic.stafftype}}</td>
    </tr>
    
    <tr>
      <td class="one">Highest Qualification</td>
      <td class="two">{{x.staffData.academic.qualification}}</td>
    </tr>
    
    <tr>
      <td class="one">Descipline</td>
      <td class="two">{{x.staffData.academic.descipline}}</td>
    </tr>
  </table>
</template>