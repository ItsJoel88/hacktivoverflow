<template>
  <div>
    <div class="comment" v-if="comments.length > 0">
      <b-card
        v-for="comment in comments"
        :key="comment._id"
        style="text-align:left; margin-bottom: 2%;"
      >
        <button
          v-if="!status"
          type="submit"
          style="background-color: skyblue; float:right; border-radius:12px; border:none;"
          @click="markAnswered(comment._id)"
        >Mark as answered</button>
        <p v-if="status && comment.answer" style="float:right; color:green;">Answer</p>
        <b-card-text style="color:grey;">Commented By : {{comment.user.name}}</b-card-text>
        <hr />
        <b-card-text>Comment :</b-card-text>
        <b-card-text v-html="comment.description"></b-card-text>
        <hr />
        <b-card-text style="color:grey;">Commented On : {{formatDate(comment.createdAt)}}</b-card-text>
      </b-card>
    </div>
    <h3 v-if="comments.length < 1">Be the first one to comment !</h3>
  </div>
</template>

<script>
export default {
  props: ["status"],
  methods: {
    markAnswered(id) {
      if (localStorage.getItem("token")) {
        this.$store
          .dispatch("MARK_ANSWER", {
            params: this.$route.params.id,
            comment: id
          })
          .then(({ data }) => {
            this.$store.dispatch(
              "FETCH_DETAIL_QUESTION",
              this.$route.params.id
            );
            this.$store.dispatch("FETCH_COMMENT", this.$route.params.id);
          })
          .catch(err => {
            console.log(err);
          });
      } else this.$awn.alert("Please login first");
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch("FETCH_COMMENT", this.$route.params.id);
    }
  }
};
</script>

<style>
</style>
