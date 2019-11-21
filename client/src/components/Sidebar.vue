<template>
  <div class="btnBar" style="display: flex; flex-direction: column; position: fixed;">
    <b-button
      style="margin-bottom: 7%;"
      @click="newest"
      :variant="isNew? 'info':''"
      v-if="this.$route.path === '/article'"
    >Newest</b-button>
    <b-button
      style="margin-bottom: 7%;"
      @click="oldest"
      :variant="!isNew? 'info':''"
      v-if="this.$route.path === '/article'"
    >Oldest</b-button>
    <b-button v-if="userLogin" variant="primary" to="/create">Post New Article</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNew: false
    };
  },
  methods: {
    newest() {
      this.isNew = true;
      this.$emit("getnew", "new");
    },
    oldest() {
      this.isNew = false;
      this.$emit("getold");
    }
  },
  computed: {
    userLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style>
</style>
