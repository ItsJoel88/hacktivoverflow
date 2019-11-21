<template>
  <div style="margin-top: 5%;">
    <div class="container">
      <div style="border: 2px solid;;" class="text-center">
        <img
          style="margin-top: 1%"
          src="https://image.flaticon.com/icons/png/128/149/149071.png"
          alt="icon"
        />
        <hr />
        <b-form-group class="mb-0" label="Name" label-for="input-formatter">
          <b-form-input id="input-formatter" disabled :value="dataUser.name"></b-form-input>
        </b-form-group>
        <b-form-group class="mb-0" label="Email" label-for="input-formatter">
          <b-form-input id="input-formatter" disabled :value="dataUser.email"></b-form-input>
        </b-form-group>
        <b-form-group class="mb-0" label="Total Questions" label-for="input-formatter">
          <b-form-input id="input-formatter" disabled :value="userQuestion.length"></b-form-input>
        </b-form-group>
      </div>
      <hr />
      <br />
      <ProfileCard :questionUser="userQuestion" />
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard.vue";

export default {
  name: "profile",
  data() {
    return {
      dataUser: {}
    };
  },
  components: {
    ProfileCard
  },
  // methods: {
  //   deletingArticle(id) {
  //     this.$store.dispatch("DELETE_QUESTION", id);
  //     this.$store
  //       .dispatch("FIND_USER_QUESTION")
  //       .then(({ data }) => {
  //         this.$store.commit("SET_USER_QUESTION", data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // },
  computed: {
    userQuestion() {
      return this.$store.state.userQuestion;
    }
  },
  watch: {
    userQuestion(val) {
      this.$store.commit("SET_USER_QUESTION", val);
    }
  },
  created() {
    this.$store
      .dispatch("FIND_USER")
      .then(({ data }) => {
        this.dataUser = data;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("FIND_USER_QUESTION")
      .then(({ data }) => {
        this.$store.commit("SET_USER_QUESTION", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
