<template>
  <!-- <div class="container">
    <h3>Admin page</h3>
    <div>
      <form action="">
        <input v-model="email" type="text" placeholder="username" />
        <input v-model="password" type="password" placeholder="password" />
      </form>
      <button @click="login()">login</button>
    </div>
  </div> -->
  <div class="q-pa-md container">
    <h3>log in with admin only</h3>
    <q-form class="q-gutter-md fm">
      <q-input standout v-model="email" label="Email" />
      <q-input standout v-model="password" label="Password" type="password" />
    </q-form>
    <q-btn
      outline
      style="color: #45c4b0"
      label="Log in"
      class="btn"
      @click="loginA()"
    />
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../plugins/config-db";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const adminEmail = ref("admin@gmail.com");
    const adminPassword = ref("3216547");
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    return {
      adminEmail,
      adminPassword,
      email,
      password,
      async loginA() {
        if (
          this.email == this.adminEmail &&
          this.password == this.adminPassword
        ) {
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user.uid);
              router.push("/detailForadmin");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode + errorMessage);
            });
        } else {
          alert("Please login with admin account.");
        }
      },
    };
  },
};
</script>

<style></style>
