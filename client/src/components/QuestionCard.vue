<template>
  <div>
    <div v-for="question in filterList" :key="question._id" style="margin-bottom: 3%;">
      <b-card :title="question.title" style="border: 2px solid">
        <b-card-text>Posted on : {{formatDate(question.createdAt)}}</b-card-text>
        <b-card-text>Posted by : {{question.user.name}}</b-card-text>
        <b-button variant="info" @click="goTo(question._id)">Detail</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array
  },
  computed: {
    filterList() {
      let searchVal = this.$store.state.searching;
      if (searchVal) {
        return this.questions.filter(item => {
          return item.title.includes(searchVal);
        });
      } else {
        return this.questions;
      }
    }
  },
  methods: {
    formatDate(date) {
      let newDate = new Date(date).toISOString().split("T");
      let yymmdd = newDate[0];
      let time = newDate[1].slice(0, 5);
      return yymmdd + " " + time;
    },
    goTo(id) {
      this.$store.dispatch("FETCH_DETAIL_QUESTION", id);
      this.$store.dispatch("FETCH_COMMENT", id);
    }
  }
};
</script>

<style>
</style>
