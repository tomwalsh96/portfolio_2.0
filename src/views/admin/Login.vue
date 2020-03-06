<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
      style="height: 70vh;"
    >
      <v-col
        align="center"
        justify="center"
      >
      <v-card
        width="50%"
        min-width="300"
      >
        <v-card-title class="mb-5"><h3>Login</h3></v-card-title>
        <v-card-text>
            <v-text-field
              v-model="email"
              placeholder="email address"
              type="text"
              outlined
              required
              class="my-2"
            ></v-text-field>
            <v-text-field
              v-model="password"
              placeholder="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              outlined
              required
              class="my-2"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn @click="login">Enter</v-btn>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: () => ({
    show1: false,
    email: '',
    password: ''
  }),
  methods: {
    // firebase auth login
    login () {
      // attempt login
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('/admin')
      }).catch(() => {
        // catch any errors and alert prompts retry
        alert('Username/password are incorrect, or you are not connected to the internet. Please retry.')
      })
    }
  }
}
</script>
