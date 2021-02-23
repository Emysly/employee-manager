<template>
    <div id="signup-form">
        <form @submit.prevent.enter="signup" class="mt-5">
            <h2>Sign Up</h2>
            <div class="row">
                <!-- <div class="col-12 form-group mb-3">
                    <label class="col-form-label col-form-label-lg">Full Name <span class="text-danger">*</span></label>
                    <input type="text" v-model.trim="$v.fullname.$model" :class="{'is-invalid': validationStatus($v.fullname)}" class="form-control form-control-lg">
                    <div v-if="!$v.fullname.required" class="invalid-feedback">The full name field is required.</div>
                </div> -->
                <div class="col-12 form-group mb-3">
                    <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                    <input type="email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                    <div v-if="!$v.email.required" class="invalid-feedback">The email field is required.</div>
                    <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid.</div>
                </div>
                <div class="col-12 form-group mb-5">
                    <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                    <input type="password" v-model.trim="$v.password.$model" :class="{'is-invalid': validationStatus($v.password)}" class="form-control form-control-lg">
                    <div v-if="!$v.password.required" class="invalid-feedback">The password field is required.</div>
                    <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min }} letters.</div>
                    <div v-if="!$v.password.maxLength" class="invalid-feedback">You must not have greater then {{ $v.password.$params.maxLength.min }} letters.</div>
                </div>
                <div class="col-12 form-group text-center">
                    <button class="btn btn-block">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import firebase from 'firebase'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    name: 'signup-form',
    data() {
        return {
            email: "", 
            password: ""
        }
    }, 
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6), maxLength: maxLength(18)}
    },
    methods: {
        validationStatus(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        signup() {

            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                this.$router.go({path: this.$router.path})
            })
        }
    }
}
</script>