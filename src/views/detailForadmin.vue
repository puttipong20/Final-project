<template>
  <div class="container">
    <h4>User detail</h4>
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">Username</th>
            <th class="text-center">UID</th>
            <th class="text-center">Phone</th>
            <th class="text-center">Email</th>
            <th class="text-center">Role</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUser" :key="user.id">
            <td class="text-center">{{ user.data.name }}</td>
            <td class="text-center">{{ user.data.uid }}</td>
            <td class="text-center">{{ user.data.phone }}</td>
            <td class="text-center">{{ user.data.email }}</td>
            <td class="text-center">
              <select name="" id="">
                <option value="customer">Customer</option>
                <option value="employee">Employee</option>
              </select>
            </td>
            <td class="text-center">
              <q-btn
                color="orange"
                label="Delete"
                @click="
                  Del(user.id);
                  DelUid(user.data.uid);
                "
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import {
  collection,
  doc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../plugins/config-db";
import { deleteUser } from "firebase/auth";
export default {
  mounted() {
    this.listUser();
  },
  data: () => ({
    allUser: [],
    step: "",
  }),
  methods: {
    async Del(id) {
      await deleteDoc(doc(db, "listUsers", id));
    },
    DelUid(uid) {
      const user = auth.currentUser.uid;
      console.log(user);
      if (uid == user) {
        deleteUser(user)
          .then(() => {
            // User deleted.
            alert("Delete User ID : ", uid);
          })
          .catch((error) => {
            // An error ocurred
            // ...
            console.log(error);
          });
      }
    },
    async listUser() {
      const q = query(collection(db, "listUsers"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.allUser = [];
        this.step = unsubscribe;
        querySnapshot.forEach((doc) => {
          this.allUser.push({ data: doc.data(), id: doc.id });
        });
      });
    },
  },
};
</script>

<style></style>
