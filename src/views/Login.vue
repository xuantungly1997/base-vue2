<template>
  <div class="container p-3">
    <div class="form-signin px-10">
      <div class="page-title border-0">{{ $t("Login") }}</div>
      <ValidationObserver ref="formLogin" v-slot="{ handleSubmit }" tag="div">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="form-group mb-20"
          tag="div"
          :name="$t('Email')"
          mode="passive"
        >
          <input
            v-model="credentials.email"
            class="form-control"
            type="email"
            :placeholder="$t('email')"
          />
          <div v-if="errors[0]" class="error-msg">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:6|max:20"
          class="form-group mb-20"
          tag="div"
          :name="$t('Password')"
          mode="passive"
        >
          <input
            v-model="credentials.password"
            class="form-control mb-15"
            type="password"
            :placeholder="$t('password')"
          />
          <div v-if="errors[0]" class="error-msg">{{ errors[0] }}</div>
        </ValidationProvider>
        <div class="button-group text-center mt-30">
          <button
            class="btn btn-dark btn-thin mb-10"
            type="submit"
            @click.prevent="handleSubmit(onClickLogin)"
          >
            {{ $t("login") }}
          </button>
          <button
            class="btn btn-border btn-thin mb-10"
            @click.prevent="$router.push({ name: 'ServiceDescription' })"
          >
            {{ $t("register") }}
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      isCallingApi: false,
    };
  },
  methods: {
    async onClickLogin() {
      let result = await this.$refs.formLogin.validate();
      if (result) {
        if (this.isCallingApi) {
          return;
        }
        this.isCallingApi = true;

        try {
          let resLogin = await this.$api.post(this.$constant.API.LOGIN, {
            ...this.credentials,
          });
          this.isCallingApi = false;

          if (resLogin.data.code === 200) {
            this.$store.commit("auth/SET_TOKEN", {
              token: resLogin.data.data.token,
            });
            this.$store.commit("auth/SET_USER", {
              user: resLogin.data.data.user,
            });
            this.$router.push({ name: "Index" });
          }
        } catch (error) {
          this.isCallingApi = false;
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 24px;
  line-height: 32px;
}

.btn-common {
  width: 280px;
}
</style>
