<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand>HacktivOverflow</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" to="/">Home</b-nav-item>
          <b-nav-item href="#" to="/about">About</b-nav-item>
          <b-nav-item href="#" to="/article" @click.prevent="goToArticle">Article</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-if="this.$route.path === '/article'" @submit.prevent="searchArticle">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-if="userLogin" href="#" to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-if="!userLogin" href="#" to="/login">Login</b-dropdown-item>
            <b-dropdown-item v-if="userLogin" href="#" @click.prevent="userOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchArticle() {
      this.$store.commit("SEARCH_ARTICLE", this.search);
      this.search = "";
    },
    goToArticle() {
      this.$store.commit("SHOW_DETAIL", false);
    },
    userOut() {
      this.$awn.success("Byeee 👋", {
        durations: { alert: 1000 }
      });
      localStorage.clear();
      this.$store.commit("USER_LOGIN", false);
      this.$router.push("/login");
    },
    goTo(str) {
      if (str === "home") {
        str = "";
      }
      this.$router.push(`/${str}`);
    }
  },
  computed: {
    userLogin() {
      return this.$store.state.isLogin;
    },
    isActive() {
      if (this.$route.path !== "/") {
        return this.$route.path.slice(1);
      } else {
        return "home";
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("USER_LOGIN", true);
    } else {
      this.$store.commit("USER_LOGIN", false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.router-link-exact-active {
  color: grey !important;
}
</style>
