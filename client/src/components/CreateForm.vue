<template>
  <div style="margin-top: 5%;">
    <div class="container">
      <form @submit.prevent="createArticle">
        <b-form-group id="input-group-1" label="Title :" label-for="input-1">
          <b-form-input id="input-1" v-model="title" type="text" required placeholder="Enter Title"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Description :" label-for="input-2">
          <vue-editor v-model="content"></vue-editor>
        </b-form-group>
        <b-button type="submit" variant="info">Create</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  methods: {
    createArticle() {
      let description = this.content;
      let title = this.title;
      this.$store
        .dispatch("CREATE_QUESTION", { title, description })
        .then(({ data }) => {
          this.content = "";
          this.title = "";
          this.$awn.success("Success creating new question");
          this.$router.push("/article");
          this.$store.dispatch("FETCH_QUESTION");
        })
        .catch(err => {
          this.content = "";
          this.title = "";
          this.$awn.alert("Oops an error occurred");
        });
    }
  }
};
</script>

<style>
</style>