<template>
  <div>
    <div>
      <div>
        <AppSelect
          v-model="personalInfoObject.nationality"
          :remote="false"
          label="Nationality"
          placeholder="Select Nationality"
          :data="['LOCAL', 'FOREIGN']"
        />
      </div>
      <div v-if="personalInfoObject.nationality === 'LOCAL'">
        <div class="columns">
          <div class="column">
            <AppSelect
              v-model="personalInfoObject.state"
              :remote="false"
              label="State of Origin"
              placeholder="Select Option"
              :data="['Lagos']"
            />
          </div>
          <div class="column">
            <AppSelect
              v-model="personalInfoObject.lga"
              :remote="false"
              label="LGA"
              placeholder="Select Option"
              :data="['Lagos Island']"
            />
          </div>
        </div>
        <div>
          <AppSelect
            v-model="personalInfoObject.religion"
            :remote="false"
            label="State of Origin"
            placeholder="Select Option"
            :data="['Christainity']"
          />
        </div>
      </div>
      <div v-else>
        <div>
          <AppInput
            v-model="personalInfoObject.residentPermitNo"
            label="Resident Permit No"
            placeholder="Type Number"
          />
        </div>
        <div class="columns">
          <div class="column"></div>
          <div class="column"></div>
        </div>
        <div>
          <AppInput
            v-model="personalInfoObject.taxpayerId"
            label="Tax Payer's ID"
            placeholder="Enter ID"
          />
        </div>

        <div class="columns">
          <div class="column">
            <div>
              <AppSelect
                v-model="personalInfoObject.dualCitizenship"
                :remote="false"
                label="Dual Citizenship?"
                placeholder="Select Option"
                :data="['True', 'False']"
              />
            </div>
          </div>
          <div class="column">
            <AppSelect
              v-model="personalInfoObject.specifyCitizenship"
              :remote="false"
              label="If Yes, Specify?"
              placeholder="Select Option"
              :data="['True', 'False']"
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="submitNationalityInfoHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppNationalityInformation',
  components: {
    AppInput,
    AppButton,
    AppSelect,
  },
  props: {
    personalInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submitNationalityInfoHandler() {
      this.$emit('nationalityHandler')
    },
  },
}
</script>
