<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script>
import EmptyLayout from "@/components/layouts/EmptyLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserLayout from "@/components/layouts/UserLayout";

export default {
  name: "App",
  /* Register layout */
  components: {
    EmptyLayout,
    AdminLayout,
    UserLayout,
  },
  computed: {
    /**
     * Setting layout
     * @returns {string}
     */
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
    /**
     * Setting static page title
     * @returns {VueI18n.TranslateResult|string}
     */
    pageTitle() {
      return this.$route.meta && this.$route.meta.pageTitle
        ? this.$t(this.$route.meta.pageTitle) + this.$constant.BASE_TITLE
        : this.$constant.BASE_TITLE;
    },
  },
  watch: {
    /**
     * Change static page title
     */
    $route: function () {
      document.title = this.pageTitle;
    },
  },
};
</script>
