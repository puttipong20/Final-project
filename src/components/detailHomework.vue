<template>
  <div class="container">
    <div class="cd">
      <q-card class="my-card" v-for="item in listData" :key="item.data.subject">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">วิชา : {{ item.data.subject }}</div>
          <div class="sub">
            <div class="text-subtitle2">{{ item.data.title }}</div>
            <div class="text-subtitle2">ราคา : {{ item.data.price }} บาท</div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="doH(item.id)">รับทำ</q-btn>
          <q-btn flat @click="Det()">รายละเอียด</q-btn>
          <div v-if="status" class="det">
            <p>{{ item.data.detail }}</p>
          </div>
        </q-card-actions>
      </q-card>
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
import { db } from "../plugins/config-db";
export default {
  mounted() {
    this.readData();
  },
  data: () => ({
    listData: [],
    status: false,
  }),
  methods: {
    Det() {
      this.status = !this.status;
    },
    async readData() {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.listData = [];
        querySnapshot.forEach((doc) => {
          this.listData.push({ id: doc.id, data: doc.data() });
          console.log(unsubscribe);
        });
      });
    },
    async doH(id) {
      try {
        await deleteDoc(doc(db, "users", id));
        console.log("You taking homework");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.sub {
  display: flex;
  justify-content: space-between;
}
.cd {
  margin: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: start;
  justify-content: center;
}
.my-card {
  min-width: 240;
  width: 250px;
  margin: 10px;
}
.container {
  min-height: 90vh;
}
.det {
  background-color: #a3ab78;
  width: 100%;
  text-align: left;
  border: 1px solid #10454f;
  padding: 10px;
  border-radius: 10px;
}
</style>
