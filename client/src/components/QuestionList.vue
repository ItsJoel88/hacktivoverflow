<template>
  <b-container fluid style="margin-top: 6%;">
    <hr />
    <b-row>
      <div class="col-md-2">
        <Sidebar @getnew="newest" @getold="oldest" />
      </div>
      <div class="list col-md-10 text-center" style="max-width: 82%;" v-if="!detailPage">
        <h3>All Questions</h3>
        <Question :questions="questionList" />
      </div>
      <div class="list col-md-10 text-center" style="max-width: 82%;" v-if="detailPage">
        <Detail />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Question from "@/components/QuestionCard.vue";
import Detail from "@/components/QuestionDetail.vue";

export default {
  data() {
    return {
      sortNew: false
    };
  },
  components: {
    Sidebar,
    Question,
    Detail
  },
  methods: {
    newest(str) {
      this.sortNew = true;
    },
    oldest() {
      this.sortNew = false;
    }
  },
  computed: {
    questionList() {
      if (this.sortNew) {
        this.$store.dispatch("FETCH_QUESTION", "new");
        return this.$store.state.question;
      } else {
        this.$store.dispatch("FETCH_QUESTION", "");
        return this.$store.state.question;
      }
    },
    detailPage() {
      return this.$store.state.detailPage;
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$store.commit("SHOW_DETAIL", true);
    }
    this.$store.dispatch("FETCH_QUESTION", "");
  }
};
</script>

<style>
</style>
