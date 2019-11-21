<template>
  <div>
    <b-jumbotron
      class="text-center"
      style="background: url('https://css-tricks.com/wp-content/uploads/2017/09/linear-gradient.png') center center no-repeat fixed; height: 80vh;"
    >
      <div
        class="text"
        style="margin: 6% auto; width: 50%; line-height: 35px; font-family: 'Calistoga', cursive; word-spacing: 2px;"
      >
        <h2>We <3 people who code</h2>
        <p>We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
      </div>
      <b-button class="btnhover" variant="info" href="#" to="/article">Browse Articles</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Calistoga&display=swap");

.btnhover {
  transition: 1s;
}

.btnhover:hover {
  border-radius: 18px;
  transition: 0.3s;
}
</style>