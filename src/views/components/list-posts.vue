<template>
  <div>
    <h3 class="py-2">Test API: ListPosts</h3>
    <template>
      <el-table :data="listPosts" style="width: 100%">
        <el-table-column prop="id" label="STT" width="180"> </el-table-column>
        <el-table-column prop="title" label="title" width="180">
        </el-table-column>
        <el-table-column prop="body" label="body"> </el-table-column>
      </el-table>
      <div class="m-auto d-flex justify-content-center">
        <el-pagination
          class="mt-10px"
          background
          layout="prev, pager, next"
          :total="100"
        />
      </div>
    </template>
    <b-button class="ml-3" @click="getProps">Change</b-button>
    {{ dataProp }}
    {{dateExpect}}
  </div>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      listPosts: [],
    };
  },
  props: {
    dataProp: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    dateExpect() {
      if (this.dataProp.name === "hello") {
        return "Nguyen Xuan Tung";
      } else {
        return "Tung Xuan Nguyen";
      }
    },
  },
  methods: {
    getProps() {
      this.dataProp.name = "hello";
    },
    async getPost() {
      try {
        const response = await this.$api.get(this.$constant.API.GET_POSTS);

        if (response.status === 200) {
          console.log(response.data);
          this.listPosts = response.data.slice(0, 5);
        }
      } catch (error) {
        console.log("catchhhhhhhh");
        console.error(error);
      }
    },
  },
  created() {
    this.getPost();
  },
};
</script>

<style scoped>
.mt-10px {
  margin-top: 10px;
}
</style>
