import { API_QUERY_USER, API_SUSPEND_USER } from "@/configs/api.js";

export default {
  data() {
    return {
      users: [],
      usersCurrentPage: 1,
      usersPageSize: this.$constant.PAGE_SIZE,
      usersCache: [], // cache user list by format - user_id => user
    };
  },
  methods: {
    async getUsers(params, headers, config) {
      try {
        let response = await this.$api.post(
          API_QUERY_USER,
          params,
          headers,
          config
        );
        if (response.data.code === 200) {
          return response.data.user_info;
        }
      } catch (e) {
        console.$log(e);
      }

      return [];
    },
    async deleteUser(params, headers, config) {
      try {
        let response = await this.$api.post(
          API_SUSPEND_USER,
          params,
          headers,
          config
        );
        if (response.data.code === 200) {
          return response;
        }
      } catch (e) {
        console.$log(e);
      }

      return false;
    },
    async getUserCache(userId) {
      if (this.usersCache[userId]) {
        return this.usersCache[userId];
      }

      let user = await this.getUsers(
        {
          created_at_ym: "dummy",
          user_id: userId,
        },
        {},
        { showLoading: false }
      );
      if (Array.isArray(user) && user.length) {
        this.usersCache[userId] = user[0];
        return user[0];
      }

      return null;
    },
    async getUserCacheByMail(mail) {
      let user = null;
      for (const key in this.usersCache) {
        const u = this.usersCache[key];
        if (u.mail === mail) {
          user = u;
          break;
        }
      }

      if (user) {
        return user;
      }

      user = await this.getUsers(
        {
          created_at_ym: "dummy",
          mail: mail,
        },
        {},
        { showLoading: false }
      );
      if (Array.isArray(user) && user.length) {
        this.usersCache[user[0].user_id] = user[0];
        return user[0];
      }

      return null;
    },
  },
  computed: {
    sortUsers() {
      if (!Array.isArray(this.users)) {
        return [];
      }

      return [...this.users].sort((a, b) => {
        return b.created_at - a.created_at;
      });
    },
    usersPageCount() {
      return Math.ceil(this.sortUsers.length / this.usersPageSize);
    },
    usersTableData() {
      return this.sortUsers.slice(
        this.usersPageSize * (this.usersCurrentPage - 1),
        this.usersPageSize * this.usersCurrentPage
      );
    },
  },
};
