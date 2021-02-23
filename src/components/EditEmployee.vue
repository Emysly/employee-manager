<template>
  <div id="edit-employee">
    <h2>Edit Employee</h2>
        <form class="col-12" @submit.prevent.enter="updateEmployee">
            <div class="row">
                <div class="col-12 form-group mb-5">
                    <label for="employee_id">Employee ID</label>
                    <input disabled id="employee_id" type="text" v-model.trim="$v.employee_id.$model">
                </div>
                <div class="col-12 form-group mb-5">
                    <label for="name">Name</label>
                    <input id="name" type="text" class="validate" v-model.trim="$v.name.$model" :class="{'is-invalid': validationStatus($v.name)}">
                    <div v-if="!$v.name.required" class="invalid-feedback">Name field is required.</div>
                </div>
                <div class="col-12 form-group mb-5">
                    <label for="dept">Department</label>
                    <input id="dept" type="text" class="validate" v-model.trim="$v.dept.$model" :class="{'is-invalid': validationStatus($v.dept)}">
                    <div v-if="!$v.dept.required" class="invalid-feedback">Department field is required.</div>
                </div>
                <div class="col-12 form-group mb-5">
                    <label for="position">Position</label>
                    <input id="position" type="text" class="validate" v-model.trim="$v.position.$model" :class="{'is-invalid': validationStatus($v.position)}">
                    <div v-if="!$v.position.required" class="invalid-feedback">Position field is required.</div>
                </div>
            </div>
            <router-link to="/" class="btn grey">Cancel</router-link>
            <button class="btn green">Update</button>
        </form>
  </div>
</template>

<script>
import db from './firebaseInit'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'edit-employee',
    data() {
        return {
            employee_id: null,
            name: null,
            dept: null,
            position: null
        }
    },
    validations: {
        employee_id: {required},
        name: {required},
        dept: {required},
        position: {required}
    },
    beforeRouteEnter(to, from, next) {
      db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
          })
        })
      })
    },
    methods: {
      validationStatus: function(validation) {
        return typeof validation != "undefined" ? validation.$error : false;
      },
      updateEmployee() {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({employee_id: this.employee_id, name: this.name, dept: this.dept, position: this.position}).then(() => { 
            this.$router.push({name: 'view-employee', params: {employee_id: this.employee_id}})
          
        })
        })
      })
      }
    }
}
</script>