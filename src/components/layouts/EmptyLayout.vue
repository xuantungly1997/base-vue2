<template>
  <section>
    <router-view
      :key="componentKey"
      @reRenderComponent="reRenderComponent"
      @changeTitle="onChangeTitle"
    ></router-view>
  </section>
</template>

<script>
export default {
  name: "EmptyLayout",
  data() {
    return {
      componentKey: 0,
    };
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
