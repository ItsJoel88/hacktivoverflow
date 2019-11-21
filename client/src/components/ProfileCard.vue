<template>
  <div>
    <b-card
      v-for="data in questionUser"
      :key="data._id"
      :footer="'Created At : ' + formatDate(data.createdAt)"
      footer-tag="footer"
      :title="data.title"
    >
      <b-card-text v-html="data.description"></b-card-text>
      <b-button type="button" variant="danger" @click="deletingArticle(data._id)">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    questionUser: Array
  },
  methods: {
    deletingArticle(id) {
      const onOk = () => {
        this.$store.dispatch("DELETE_QUESTION", id);
        this.$store
          .dispatch("FIND_USER_QUESTION")
          .then(({ data }) => {
            this.$store.commit("SET_USER_QUESTION", data);
          })
          .catch(err => {
            console.log(err);
          });
      };
      const onCancel = () => {
        console.log("ok cancel");
      };
      this.$awn.confirm("Are you sure?", onOk, onCancel);
    },
    formatDate(date) {
      let newDate = new Date(date).toISOString().split("T");
      let yymmdd = newDate[0];
      let time = newDate[1].slice(0, 5);
      return yymmdd + " " + time;
    }
  }
};
</script>

<style>
</style>
