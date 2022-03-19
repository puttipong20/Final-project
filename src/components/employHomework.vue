<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="subject"
        label="Subject *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="title"
        label="Title *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="detail"
        label="Detail *"
        type="textArea"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="price"
        label="Price *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn @click="addData()" label="Add Homework" color="primary" />
        <q-btn
          label="Reset"
          @click="Reset()"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../plugins/config-db";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const subject = ref(null);
    const title = ref(null);
    const price = ref(null);
    const detail = ref(null);
    const accept = ref(false);

    return {
      subject,
      title,
      price,
      detail,
      accept,

      async addData() {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            subject: this.subject,
            title: this.title,
            price: this.price,
            detail: this.detail,
          });
          this.subject = "";
          this.title = "";
          this.price = "";
          this.detail = "";
          console.log("Document written with ID: ", docRef.id);
          router.push("/detail");
          alert("Add complete.");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },

      Reset() {
        this.subject = null;
        this.title = null;
        this.detail = null;
        this.price = null;
      },
    };
  },
};
</script>

<style></style>
