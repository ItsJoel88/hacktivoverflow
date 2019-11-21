<template>
  <div>
    <h4 style="text-align:left;">Question ❓</h4>
    <b-card
      :title="detailContent.article.title"
      :sub-title="'posted by:' + detailContent.article.user.name"
    >
      <div
        class="up"
        style="float:left; margin-top: -6.5%;"
        @click="upvote(detailContent.article._id,detailContent.article.user.email)"
      >
        <img src="../assets/up-arrow.png" alt="up" />
      </div>
      <div
        class="point"
        style="float:left; margin-top: -3%; margin-left: 0.8%;"
      >{{detailContent.article.upVote.length - detailContent.article.downVote.length}}</div>
      <div class="down" style="float:left;" @click="downvote(detailContent.article._id)">
        <img src="../assets/arrow.png" alt="down" />
      </div>
      <b-card-text v-html="detailContent.article.description"></b-card-text>

      <b-card-text
        style="margin-left: 80%; color:grey;"
      >Posted on : {{formatDate(detailContent.article.createdAt)}}</b-card-text>
    </b-card>
    <hr />
    <h4 style="text-align:left;">Comments 💬</h4>
    <div class="login" v-if="!userLogin">
      <b-button variant="primary">Login to comment</b-button>
    </div>
    <form v-if="userLogin" @submit.prevent="createComment">
      <b-form-group id="input-group-1" label="Comment :" label-for="input-2">
        <vue-editor v-model="content"></vue-editor>
      </b-form-group>
      <b-button type="submit" variant="info">Create</b-button>
    </form>
    <br />
    <Comments :status="detailContent.article.answered" />
  </div>
</template>

<script>
import Comments from "@/components/CommentCard.vue";

export default {
  name: "detail",
  data() {
    return {
      content: ""
    };
  },
  components: {
    Comments
  },
  methods: {
    upvote(id, email) {
      if (localStorage.getItem("token")) {
        this.$router.push("/");
        this.$store.dispatch("UPVOTE", { id, email });
        this.$store.dispatch("FETCH_DETAIL_QUESTION", this.$route.params.id);
        console.log(id);
      } else this.$awn.alert("You need to login first");
    },
    downvote(id) {
      if (localStorage.getItem("token")) {
        this.$router.push("/");
        this.$store.dispatch("DOWNVOTE", id);
        this.$store.dispatch("FETCH_DETAIL_QUESTION", this.$route.params.id);
        console.log(id);
      } else this.$awn.alert("You need to login first");
    },
    createComment() {
      let article = this.$route.params.id;
      let token = localStorage.getItem("token");
      let description = this.content;
      this.$store
        .dispatch("CREATE_COMMENT", { token, article, description })
        .then(article => {
          this.content = "";
          this.$store.dispatch("FETCH_DETAIL_QUESTION", this.$route.params.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    }
  },
  computed: {
    userLogin() {
      return this.$store.state.isLogin;
    },
    detailContent() {
      return this.$store.state.singleQuestion;
    }
  },
  watch: {
    detailContent(val) {
      console.log(val);
    }
  },
  created() {
    this.$store.dispatch("FETCH_DETAIL_QUESTION", this.$route.params.id);
  }
};
</script>

<style>
.up:hover,
.down:hover {
  background: whitesmoke;
  cursor: pointer;
}
</style>
