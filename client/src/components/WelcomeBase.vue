<template>
  <div style="margin-top : 5%;">
    <div class="header" style="width: 50%; margin: 0 auto; text-align:center;">
      <h2>For developers, by developers</h2>
      <hr />
      <p>Stack Overflow is an open community for anyone that codes. We help you get answers to your toughest coding questions, share knowledge with your coworkers in private, and find your next dream job.</p>
    </div>
    <div class="content" style="width: 70%; margin: 3% auto;">
      <b-card-group deck>
        <b-card
          class="bcard"
          border-variant="info"
          header="Ask a question"
          header-border-variant="info"
          align="center"
        >
          <b-card-text>Ask a question publicly on Article sites</b-card-text>
        </b-card>

        <b-card
          class="bcard"
          border-variant="info"
          header="Vote on everything"
          header-border-variant="info"
          align="center"
        >
          <b-card-text>Upvoting helps exceptional content rise to the top and bring awareness to useful responses.</b-card-text>
        </b-card>

        <b-card
          class="bcard"
          border-variant="info"
          header="Answer questions"
          header-border-variant="info"
          align="center"
        >
          <b-card-text>Answer a question to share your knowledge with the world or in private with your team.</b-card-text>
        </b-card>
      </b-card-group>
      <b-button
        style="margin: 3% 40%; width: 20%;"
        class="accountBtn"
        v-if="!isLogin"
        variant="info"
        href="#"
        to="/register"
      >Create an Account</b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style>
.content .bcard:hover {
  box-shadow: -2px 7px 45px -16px rgba(0, 0, 0, 0.75);
}

.accountBtn {
  transition: 1s;
}

.accountBtn:hover {
  border-radius: 18px;
  transition: 0.3s;
}
</style>