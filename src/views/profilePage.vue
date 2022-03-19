<template>
  <div class="container">
    <div class="q-pa-md">
      <q-markup-table>
        <tbody>
          <tr>
            <td class="text-left">User Name :</td>
            <td class="text-center">{{ name }}</td>
          </tr>
          <tr>
            <td class="text-left">Uid :</td>
            <td class="text-center">{{ uid }}</td>
          </tr>
          <tr>
            <td class="text-left">Email :</td>
            <td class="text-center">{{ email }}</td>
          </tr>
          <tr>
            <td class="text-left">Phone number:</td>
            <td class="text-center">{{ phone }}</td>
          </tr>
          <tr>
            <td class="text-left">Passwork</td>
            <td class="text-center">{{ password }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <q-btn color="red" class="b" @click="Deluser(docID)">Delete Account</q-btn>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../plugins/config-db";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  mounted() {
    this.profile();
    this.check();
  },
  data: () => ({
    id: "",
    name: "",
    docID: "",
    uid: "",
    email: "",
    phone: "",
    password: "",
  }),
  methods: {
    Deluser(id) {
      const user = auth.currentUser;
      deleteUser(user)
        .then(async () => {
          await deleteDoc(doc(db, "listUsers", id));
          // User deleted on authentication.
          this.$router.push("/register");

          //delete user on firestore
        })
        .catch((error) => {
          // An error ocurred
          console.log(error);
          // ...
        });
      signOut(auth)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
      alert("Delete account Complete.");
      //delete user on firestore
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
    async profile() {
      const user = auth.currentUser;
      if (user !== null) {
        this.id = user.uid;

        //assign data
        const querySnapshot = await getDocs(collection(db, "listUsers"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          if (this.id == doc.data().uid) {
            this.name = doc.data().name;
            this.docID = doc.id;
            this.uid = doc.data().uid;
            this.email = doc.data().email;
            this.phone = doc.data().phone;
            this.password = doc.data().password;
          }
        });
      }
    },
  },
};
</script>

<style>
table,
tr,
td {
  text-align: left;
  padding: 10px;
}
.b{
  margin-top: 10px;
}
</style>
