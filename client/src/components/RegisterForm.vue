<template>
  <div>
    <b-card
      title="User Register"
      class="text-center"
      style="width: 50%; margin: 5% auto; box-shadow: 5px 10px 8px #888888;"
    >
      <b-form @submit.prevent="userRegister">
        <b-form-group id="input-group-1" required label="Email address:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            v-model="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
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
      name: ""
    };
  },
  methods: {
    userRegister() {
      axios({
        url: "/users/register",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
          name: this.name
        }
      })
        .then(({ data }) => {
          this.email = "";
          this.password = "";
          this.name = "";
          this.$awn.success("Successfull registration", {
            durations: { alert: 2000 }
          });
          this.$router.push("/login");
        })
        .catch(err => {
          this.email = "";
          this.password = "";
          this.name = "";
          this.$awn.alert("An error occurred", { durations: { alert: 2000 } });
        });
    }
  }
};
</script>

<style>
</style>