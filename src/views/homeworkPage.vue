<template>
  <div class="container">
    <h4>Home work page</h4>
    <div class="subClass">
      <button @click="Do()" class="b1">Add Homework</button>
      <button @click="detail()" class="n">Take Homework</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/config-db";
export default {
  mounted() {
    this.check();
  },
  methods: {
    Do() {
      this.$router.push("/do");
    },
    detail() {
      this.$router.push("/detail");
    },
    check() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          // ...
        } else {
          alert("Please login");
          this.$router.push("/login");
          // User is signed out
          // ...
        }
      });
    },
  },
};
</script>

<style>
.b1 {
  background-color: #062173;
  color: white;
  width: 90%;
}
.n {
  background-color: #1b33bf;
  color: whitesmoke;
  margin-left: 10px;
  width: 90%;
}
.b1,
.n {
  border-radius: 10px;
  height: 45px;
  box-shadow: 0 0 5px 1px #062173;
}
.subClass {
  width: 100%;
  display: flex;
}
</style>
