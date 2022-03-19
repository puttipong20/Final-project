<template>
  <div class="q-pa-md container">
    <h3>log in page</h3>
    <q-form class="q-gutter-md fm">
      <q-input standout v-model="email" label="Email" />
      <q-input standout v-model="password" label="Password" type="password" />
    </q-form>
    <q-btn
      outline
      style="color: #45c4b0"
      label="Log in"
      class="btn"
      @click="login()"
    />
    <q-btn
      outline
      style="color: #03a64a"
      label="Register"
      class="btn"
      @click="register()"
    />
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../plugins/config-db";
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.uid);
          this.$router.push("/homework");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Email or password fail.");
          console.log(
            "this = " + errorCode + "AND THIS ERROR : " + errorMessage
          );
        });
    },
  },
};
</script>

<style>
body {
  font-family: "Chakra Petch", sans-serif;
}
.btn {
  margin: 10px 5px;
}
.fm {
  display: flex;
  justify-content: center;
}
.container {
  text-align: center;
  box-shadow: 0 10px 10px 10px rgb(111, 161, 255);
}
</style>
