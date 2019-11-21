<template>
  <div>
    <b-card
      title="User Login"
      class="text-center"
      style="width: 50%; margin: 5% auto; box-shadow: 5px 10px 8px #888888;"
    >
      <div>
        <b-form @submit.prevent="loginUser">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              type="password"
              id="input-2"
              v-model="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
        <p style="margin-top: 2%;">Or</p>
        <b-button type="button" to="/register" variant="primary">Register</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "@/apis/server.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      sending: false
    };
  },
  methods: {
    loginUser() {
      this.sending = true;
      axios({
        url: "/users/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$awn.success("Welcome back 😀", {
            durations: { success: 1000 }
          });
          localStorage.setItem("token", data.token);
          this.$router.push("/");
          this.$store.commit("USER_LOGIN", true);
          this.email = "";
          this.password = "";
          this.sending = false;
        })
        .catch(err => {
          this.$awn.alert("message", { durations: { alert: 2000 } });
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style>
</style>
