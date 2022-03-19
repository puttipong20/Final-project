<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Home Work </q-toolbar-title>
        <div>
          <q-btn @click="logout()">Log out</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable tag="a" to="/admin">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>For Admin</q-item-label>
            <q-item-label caption>Admin page.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Home page view.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/about">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption>About page view.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/profile">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Profile page view.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/homework">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>Home Work</q-item-label>
            <q-item-label caption>Go to Home work page </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/login">
          <q-item-section avatar> </q-item-section>
          <q-item-section>
            <q-item-label>Log in</q-item-label>
            <q-item-label caption>Go to Log in </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { db, auth } from "./plugins/config-db";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

export default {
  mounted() {
    this.readData();
    this.Status();
  },
  name: "LayoutDefault",
  setup() {
    const router = useRouter();
    const status = ref(true);
    return {
      leftDrawerOpen: ref(false),
      status,

      logout() {
        signOut(auth)
          .then(() => {
            router.push("/login");
            alert("Sign out complete");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      },
      async readData() {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          this.email = doc.data().email;
          this.status = false;
        });
      },
      Status(id) {
        console.log("status : ", id);
        this.status = id;
      },
    };
  },
};
</script>
