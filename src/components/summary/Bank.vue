<script setup>
import { useStore } from '../../stores/global'

const x = useStore()
</script>

<template>
  <div class="summhead">Bank Details</div>
  <table class="summtbl">
    <tr>
      <td class="one">IPPIS No</td>
      <td class="two">{{x.staffData.bank.ippis}}</td>
    </tr>
    
    <tr>
      <td class="one">Full Name</td>
      <td class="two">{{x.staffData.bank.name}}</td>
    </tr>
    
    <tr>
      <td class="one">Email</td>
      <td class="two">{{x.staffData.bank.email}}</td>
    </tr>
    
    <tr>
      <td class="one">Name of Bank</td>
      <td class="two">{{x.staffData.bank.bankname}}</td>
    </tr>
    
    <tr>
      <td class="one">Account No</td>
      <td class="two">{{x.staffData.bank.account}}</td>
    </tr>
    
    <tr>
      <td class="one">PFA Name</td>
      <td class="two">{{x.staffData.bank.pfa}}</td>
    </tr>
    
    <tr>
      <td class="one">PFA Pin</td>
      <td class="two">{{x.staffData.bank.pfapin}}</td>
    </tr>
    
    <tr>
      <td class="one">NIN No</td>
      <td class="two">{{x.staffData.bank.nin}}</td>
    </tr>
    
    <tr>
      <td class="one">BVN No</td>
      <td class="two">{{x.staffData.bank.bvn}}</td>
    </tr>
    
    <tr>
      <td class="one">Next of Kin</td>
      <td class="two">{{x.staffData.bank.kin}}</td>
    </tr>
    
    <tr>
      <td class="one">Phone</td>
      <td class="two">{{x.staffData.bank.phone}}</td>
    </tr>
    
    <tr>
      <td class="one">Relationship</td>
      <td class="two">{{x.staffData.bank.relationship}}</td>
    </tr>
    
    <tr>
      <td class="one">Kin Address</td>
      <td class="two">{{x.staffData.bank.address}}</td>
    </tr>
  </table>
</template>