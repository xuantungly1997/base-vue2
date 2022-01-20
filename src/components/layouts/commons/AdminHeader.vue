<template>
  <header>
    <div v-if="!userName">
      Admin Layout |
      <a href="javascript:void(0);" @click="$router.push({ name: 'Index' })"
        >Home</a
      >
      |Unauthorized
    </div>
    <div v-if="userName">
      <div>user state > {{ userName }}</div>
      <router-link
        to="javascript:void(0)"
        class="btn-logout"
        @click.prevent="logout"
        >Logout</router-link
      >
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdminHeader",
  computed: {
    ...mapGetters({
      //sessionId: 'getSessionId',
      userName: "getUserName",
    }),
  },
  methods: {
    async logout() {
      let res = await this.$api.post(this.$constant.API.LOGOUT);
      if (res.data.code === 200) {
        this.$store.dispatch("logout");
      }
    },
  },
};
</script>

<style scoped>
header {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
  background-color: #5a6268;
  padding: 0 2rem;
}
</style>
