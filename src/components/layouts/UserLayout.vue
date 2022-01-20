<template>
  <section>
    <UserHeader />
    <main>
      <router-view
        :key="componentKey"
        @reRenderComponent="reRenderComponent"
        @changeTitle="onChangeTitle"
      ></router-view>
    </main>
    <Footer />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import UserHeader from "@/components/layouts/commons/UserHeader";
import Footer from "@/components/layouts/commons/Footer";

export default {
  name: "UserLayout",
  components: { Footer, UserHeader },
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    reRenderComponent() {
      this.componentKey += 1;
    },
    onChangeTitle(title) {
      document.title = title;
    },
  },
};
</script>
