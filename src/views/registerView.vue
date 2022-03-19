<template>
  <div class="container">
    <div class="form">
      <h3>Sign up</h3>
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Username *"
            hint="1.Username"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter username',
            ]"
          />
          <q-input
            filled
            v-model="password"
            label="Password *"
            type="Password"
            hint="2.Password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 6) || 'Please enter your password',
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="phone"
            label="Your phont number *"
            hint="3.Phone Number"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type your phone num ber',
              (val) => val.length > 9 || 'Please type a real age',
            ]"
          />

          <q-input
            filled
            v-model="email"
            label="Email *"
            type="Email"
            hint="4.Email"
            required
          />

          <div>
            <q-btn @click="signUp()" label="Sign Up" color="primary" />
            <q-btn
              outline
              style="color: #45c4b0"
              label="Log in"
              class="btn"
              @click="login()"
            />
            <q-btn
              outline
              style="color: #45c4b0"
              label="Reset"
              class="btn"
              type="reset"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { auth } from "../plugins/config-db";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../plugins/config-db";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const id = ref(null);
    const name = ref(null);
    const password = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const accept = ref(false);

    return {
      id,
      name,
      password,
      phone,
      email,
      accept,

      login() {
        router.push("/login");
      },
      async signUp() {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.id = user.uid;
            // alert(this.email + " Sign Up Complete.");
            // ...
            //add Data
            const docRef = await addDoc(collection(db, "listUsers"), {
              name: this.name,
              uid: this.id,
              phone: this.phone,
              email: this.email,
              password: this.password,
            });
            router.push("/login");
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
            // ..
          });
      },
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        password.value = null;
        phone.value = null;
        email.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style>
.container {
  width: 100%;
}
.form {
  width: 80%;
  margin: 0 auto;
}
</style>
