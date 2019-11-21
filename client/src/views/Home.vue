<template>
  <div>
    <Header />
    <Welcome />
  </div>
</template>

<script>
import Header from "@/components/IntroductionBase.vue";
import Welcome from "@/components/WelcomeBase.vue";

export default {
  name: "home",
  components: {
    Header,
    Welcome
  }
};
</script>
