<template>
  <section class="p-3">
    <Posts :dataProp="data" />
    <hr />
    <FormLogin />
    <hr />
    <div class="d-flex align-items-center ml-2">
      <h3 class="py-4">Font Awesome example</h3>
      <fa icon="envelope" class="mr-2" />
      <fa icon="phone-alt" class="mr-2" />
      <fa icon="caret-down" class="mr-2" />
      <fa icon="user-lock" class="mr-2" />
    </div>
    <hr />
    <h3 class="py-4">Bootstrap Vue</h3>
    <div>
      <b-progress :value="value" :max="max" show-progress animated></b-progress>
      <b-progress class="mt-2" :max="max" show-value>
        <b-progress-bar
          :value="value * (6 / 10)"
          variant="success"
        ></b-progress-bar>
        <b-progress-bar
          :value="value * (2.5 / 10)"
          variant="warning"
        ></b-progress-bar>
        <b-progress-bar
          :value="value * (1.5 / 10)"
          variant="danger"
        ></b-progress-bar>
      </b-progress>
      <b-button class="mt-3" @click="randomValue">Click me</b-button>
    </div>
    <hr />
  </section>
</template>

<script>
import Posts from "@/views/components/list-posts";
import FormLogin from "@/views/components/form-login";
export default {
  name: "Index",
  components: { Posts, FormLogin },
  data() {
    return {
      value: 45,
      max: 100,
      data: {
        name: "Tung",
        age: 26,
      },
    };
  },
  methods: {
    randomValue() {
      this.value = Math.random() * this.max;
    },
    open() {
      this.$alert("This is a message", "Title", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>

<style scoped></style>
