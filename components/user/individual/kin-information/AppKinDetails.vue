<template>
  <div>
    <div>
      <div>
        <div class="columns">
          <div class="column is-4">
            <AppSelect
              v-model="kinInfoObject.title"
              :remote="false"
              label="Title"
              placeholder="Select"
              :data="['Miss', 'Mrs', 'Mister']"
            />
          </div>
          <div class="column is-8">
            <AppInput
              v-model="kinInfoObject.surname"
              label="Surname"
              placeholder="Type Surname"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <AppInput
              v-model="kinInfoObject.firstName"
              label="First Name"
              placeholder="First Name"
            />
          </div>
          <div class="column">
            <AppInput
              v-model="kinInfoObject.middleName"
              label="Middle Name"
              placeholder="Middle Name"
            />
          </div>
        </div>
        <div>
          <AppSelect
            v-model="kinInfoObject.relationship"
            :remote="false"
            label="Relationship"
            placeholder="Select your relationship with this person"
            :data="['Single', 'Divorced', 'Married', 'Widowed']"
          />
        </div>
        <div class="columns">
          <div class="column">
            <AppSelect
              v-model="kinInfoObject.maritalStatus"
              :remote="false"
              label="Marital Status"
              placeholder="Select Option"
              :data="['Single', 'Divorced', 'Married', 'Widowed']"
            />
          </div>
          <div class="column">
            <AppSelect
              v-model="kinInfoObject.gender"
              :remote="false"
              label="Gender"
              placeholder="Select Option"
              :data="['Male', 'Female']"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <AppInput
              v-model="kinInfoObject.dob"
              label="Date of Birth"
              placeholder="Select Date"
              type="date"
            />
          </div>
          <div class="column">
            <AppInput
              v-model="kinInfoObject.bvn"
              label="BVN"
              placeholder="Enter BVN"
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="kinDetailsHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppKinDetails',
  components: {
    AppSelect,
    AppInput,
    AppButton,
  },
  data() {
    return {
      kinInfoObject: {},
    }
  },
  methods: {
    kinDetailsHandler() {
      console.log('KINS')
    },
  },
}
</script>
