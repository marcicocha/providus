<template>
  <div>
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': key == '1' }" @click="key = '1'">
          <a>Personal Info</a>
        </li>
        <li :class="{ 'is-active': key == '2' }" @click="key = '2'">
          <a>Contact Details</a>
        </li>
        <li :class="{ 'is-active': key == '3' }" @click="key = '3'">
          <a>Account Info</a>
        </li>
        <li :class="{ 'is-active': key == '4' }" @click="key = '4'">
          <a>Next of Kin Details</a>
        </li>
      </ul>
    </div>

    <!-- Tab panes -->
    <div class="content">
      <div v-show="key == '1'">
        <div class="columns is-multiline">
          <div class="column is-full">
            <AppAdminInput label="Title" placeholder="MR." />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Surname" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="First Name" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Middle Name" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Gender" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Marrital Status" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Date Of Birth" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Religion" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Nationality" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Mother's Maiden Name" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="State" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Nationality" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Tax Payer ID" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Dual Citizenship" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Country" />
          </div>
        </div>
      </div>
      <div v-show="key == '2'">
        <div class="columns is-multiline">
          <div class="column is-full">
            <AppAdminInput label="Email Address" placeholder="" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Phone Number" placeholder="" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Alternative Phone Number" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="House Number" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Street Name" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Closest Landmark" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="City/town" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="State" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Local govt Area" placeholder="" />
          </div>
        </div>
      </div>
      <div v-show="key == '3'">
        <div class="columns is-multiline">
          <div class="column is-full">
            <AppAdminInput label="BVN" placeholder="" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Account Category" placeholder="" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Account Type" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Account Currency" placeholder="" />
          </div>
        </div>
        <button class="print-btn">
          <i class="fa fa-print" style="padding: 10px"></i> Print BVN
          Information
        </button>
      </div>
      <div v-show="key == '4'">
        <div class="columns is-multiline">
          <div class="column is-full">
            <AppAdminInput label="Title" placeholder="MR." />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Surname" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="First Name" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Middle Name" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Gender" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Marrital Status" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Date Of Birth" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Relationship" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Email Address" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Phone Number" />
          </div>
          <div class="column is-half">
            <AppAdminInput label="Alternative Phone" />
          </div>
          <div class="column is-full">
            <AppAdminInput label="Country of Residence" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="House Number" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Street Name" placeholder="" />
          </div>
          <div class="column is-one-third">
            <AppAdminInput label="Closest Landmark" placeholder="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAdminInput from '@/components/UI/AppAdminInput.vue'
export default {
  name: 'AppAccountDetailsComponent',
  components: {
    AppAdminInput,
  },
  data() {
    return {
      key: '1',
    }
  },
}
</script>
<style lang="scss" scoped>
// .tab li a {
//   border: none;
// }
.tabs li {
  border: none;
  //   border-width: 5px;
  //   border-bottom: 5px solid #000;
  position: relative;
  top: 5px;
  z-index: 1000;
  padding: 10px 20px;
  a {
    border-bottom-style: none;
    font-family: 'GothamMedium', sans-serif;
    font-style: normal;
    font-weight: bold;
    transition: all 0.1s;
    opacity: 0.5;
    &:hover {
      border: none;
    }
  }
}
.is-active {
  border-width: 5px;
  border-bottom: 5px solid #fdb813 !important;
}
.tabs li.is-active a {
  color: #282828;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  animation: forwards;
  transition: all 0.1s;
  opacity: 1;
}
.tabs ul {
  border-width: 5px;
  align-items: baseline;
}
.print-btn {
  background: transparent;
  border: none;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
}
</style>
