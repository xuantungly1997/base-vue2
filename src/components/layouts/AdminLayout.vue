<template>
  <section>
    <AdminHeader />
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
import AdminHeader from "@/components/layouts/commons/AdminHeader";
import Footer from "@/components/layouts/commons/Footer";

export default {
  name: "AdminLayout",
  components: { Footer, AdminHeader },
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
