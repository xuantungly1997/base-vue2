<template>
  <header>
    <div class="w100px">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#"><router-link :to="{ name: 'Dashboard' }">Admin layout</router-link></b-nav-item>
            <b-nav-item href="#"> <router-link :to="{ name: 'Login' }">Login</router-link></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "UserHeader",
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    // ...mapGetters({
    //   sessionId: 'getSessionId',
    //   userName: "getUserName",
    // }),
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
.w100px {
  width: 100%;
  height: 50px;
}
.nav-item a{
  color: white;
}
header {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
  padding: 0 2rem;
}
</style>
