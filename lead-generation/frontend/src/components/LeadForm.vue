<template>
  <div>
    <div class="container mt-5">
      <h1>Lead Capture Form</h1>
      <button @click="refreshPage" class="btn btn-secondary mb-3">Refresh Page (remove in production)</button>
      <div v-if="formSubmitted" class="alert alert-success">
        <h4>Thank you for your submission!</h4>
        <p>We have received your information and will be in touch soon.</p>
        <p>There will also be some simple console logs within Docker and in the browser</p>
        <p>There would also be a script that cleans up code for production that removes unwanted console logs etc.</p>

      </div>
      <form v-else @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="form.firstName"
            :class="{
              'is-invalid': v$.firstName.$invalid && v$.firstName.$dirty,
              'is-valid': !v$.firstName.$invalid && v$.firstName.$dirty,
            }"
          />
          <div class="invalid-feedback" v-if="v$.firstName.$error">
            First Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="form.lastName"
            :class="{
              'is-invalid': v$.lastName.$invalid && v$.lastName.$dirty,
              'is-valid': !v$.lastName.$invalid && v$.lastName.$dirty,
            }"
          />
          <div class="invalid-feedback" v-if="v$.lastName.$error">
            Last Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            :class="{
              'is-invalid': v$.email.$invalid && v$.email.$dirty,
              'is-valid': !v$.email.$invalid && v$.email.$dirty,
            }"
          />
          <div class="invalid-feedback" v-if="v$.email.$error">
            Email is required
          </div>
        </div>

        <div class="form-group">
          <label for="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            class="form-control"
            id="mobileNumber"
            v-model="form.mobileNumber"
            :class="{
              'is-invalid': v$.mobileNumber.$invalid && v$.mobileNumber.$dirty,
              'is-valid': !v$.mobileNumber.$invalid && v$.mobileNumber.$dirty,
            }"
          />
          <div class="invalid-feedback" v-if="v$.mobileNumber.$error">
            Mobile Number is required
          </div>
        </div>

        <div class="form-group">
          <label for="country">Country</label>
          <select
            class="form-control"
            id="country"
            v-model="form.country"
            :class="{
              'is-invalid': v$.country.$invalid && v$.country.$dirty,
              'is-valid': !v$.country.$invalid && v$.country.$dirty,
            }"
          >
            <option value="" disabled>Select your country</option>
            <option v-for="country in countries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
          <div class="invalid-feedback" v-if="v$.country.$error">
            Country is required
          </div>
        </div>

        <div class="form-group">
          <label for="marketingReferralData">How did you hear about us?</label>
          <input
            type="text"
            class="form-control"
            id="marketingReferralData"
            v-model="form.marketingReferralData"
          />
        </div>

        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea class="form-control" id="notes" v-model="form.notes"></textarea>
        </div>

        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="acceptTerms"
            v-model="form.acceptTerms"
            :class="{
              'is-invalid': v$.acceptTerms.$invalid && v$.acceptTerms.$dirty,
              'is-valid': !v$.acceptTerms.$invalid && v$.acceptTerms.$dirty,
            }"
          />
          <label class="form-check-label" for="acceptTerms">I accept the terms and conditions</label>
          <div class="invalid-feedback" v-if="v$.acceptTerms.$error">
            You must accept the terms.
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <div v-if="formSubmitted">
        <h2>Submitted Data</h2>
        <pre>{{ JSON.stringify(sanitizedData, null, 2) }}</pre>
      </div>

      <div v-if="serverResponse">
        <h2>Server Response</h2>
        <pre>{{ JSON.stringify(serverResponse, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';

export default {
  setup() {
    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      acceptTerms: false,
      mobileNumber: '',
      country: '',
      marketingReferralData: '',
      notes: '',
    });

    const formSubmitted = ref(false);
    const error = ref(null);
    const serverResponse = ref(null);
    const sanitizedData = ref(null);

    const rules = {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      acceptTerms: { required },
      mobileNumber: { required },
      country: { required },
    };

    const v$ = useVuelidate(rules, form);

    const onSubmit = async () => {
      console.log('Starting form submission');
      console.log('Form data at submission start:', JSON.stringify(form));
      error.value = null;
      try {
        console.log('Validating form');
        const isFormCorrect = await v$.value.$validate();
        console.log('Validation result:', isFormCorrect);
        if (!isFormCorrect) {
          console.log('Form has errors:', v$.value.$errors);
          error.value = 'Please correct the validation errors.';
          return;
        }

        const requiredFields = [
          'firstName',
          'lastName',
          'email',
          'mobileNumber',
          'acceptTerms',
        ];
        const allFieldsFilled = requiredFields.every((field) => {
          if (field === 'acceptTerms') {
            return form[field] === true;
          }
          return form[field].trim() !== '';
        });

        console.log('All fields filled check:', allFieldsFilled);
        if (!allFieldsFilled) {
          error.value = 'All required fields must be filled.';
          return;
        }

        sanitizedData.value = {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          acceptTerms: form.acceptTerms,
          mobileNumber: form.mobileNumber.trim(),
          country: form.country.trim(),
          marketingReferralData: form.marketingReferralData.trim(),
          notes: form.notes.trim(),
        };

        const endpointUrl = `${process.env.VUE_APP_API_BASE_URL}/api/v1/leadGeneration`;
        console.log('Sending data to server at:', endpointUrl);
        console.log('Sanitized data:', sanitizedData.value);

        const response = await axios.post(endpointUrl, sanitizedData.value);

        console.log('Form submitted successfully:', response);
        formSubmitted.value = true;
        serverResponse.value = response.data;
      } catch (err) {
        console.error('Error in form submission process:', err);
        error.value = 'An error occurred while submitting the form. Please try again later.';
      }
    };

    const refreshPage = () => {
      window.location.reload();
    };

    onMounted(() => {
      console.log('Component mounted');
    });

    const countries = [
      'United States',
      'Canada',
      'United Kingdom',
      'Australia',
      'New Zealand',
      'India',
      'Germany',
      'France',
      'China',
      'Japan'
    ];

    return {
      ...toRefs({ form, formSubmitted, error, serverResponse, sanitizedData }),
      v$,
      onSubmit,
      countries,
      refreshPage,
    };
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: #dc3545;
}
.is-valid {
  border-color: #28a745;
}
.invalid-feedback {
  display: block;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 15px;
  border-radius: 4px;
}
</style>