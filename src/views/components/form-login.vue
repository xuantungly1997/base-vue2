<template>
  <div>
    <div class="d-grid">
      <h2>test store: {{ nameUser }}</h2>
      <b-button class="ml-3" @click="changeStore">Change store</b-button>
    </div>
    <div class="w800px">
      <h3 class="py-4">Form Vee-validate example</h3>
      <ValidationObserver ref="formChangePassword">
        <form class="mx-4 mb-4" @submit.prevent="onSubmit">
          <ValidationProvider
            name="New password"
            rules="required|min:6"
            vid="password"
          >
            <div class="form-group row" slot-scope="{ errors }">
              <label for="inputPassword3" class="col-sm-4 col-form-label"
                >New Password (min 6 char)</label
              >
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Mật khẩu"
                  v-model="credentials.newPassword"
                  vid="password"
                />
                <div v-if="errors" class="validate-error-msg">
                  {{ errors[0] }}
                </div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Confirm password"
            rules="required|confirmed:password"
          >
            <div class="form-group row" slot-scope="{ errors }">
              <label for="inputPassword4" class="col-sm-4 col-form-label"
                >Confirm password</label
              >
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Xác nhận mật khẩu"
                  v-model="passwordConfirm"
                />
                <div v-if="errors" class="validate-error-msg">
                  {{ errors[0] }}
                </div>
              </div>
            </div>
          </ValidationProvider>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormLogin",
  data() {
    return {
      isCallingApi: false,
      credentials: {
        oldPassword: null,
        newPassword: null,
      },
      passwordConfirm: null,
    };
  },
  computed: {
    nameUser() {
      return this.$store.getters["getStoreUser"]
    },
    ...mapGetters(["getStoreUser"]),
  },
  methods: {
    async onSubmit() {
      let result = await this.$refs.formChangePassword.validate();

      if (result) {
        if (this.isCallingApi) {
          return;
        }
        this.isCallingApi = true;

        try {
          debugger;
          let resChangePassword = await this.$api.put(
            this.$constant.API.CHANGE_PASSWORD,
            {
              ...this.credentials,
            }
          );
          console.log(resChangePassword);
          this.isCallingApi = false;
        } catch (error) {
          this.isCallingApi = false;
          console.error(error);
        }
      }
    },

    changeStore() {
      this.$store.commit("setStoreUser", "Bạn vừa thay đổi store đấy");
    },
  },
};
</script>

<style scoped>
.mt-10px {
  margin-top: 10px;
}
.w800px {
  width: 800px;
}
</style>
