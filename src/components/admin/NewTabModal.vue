<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        v-on="on"
      >
        <v-icon>add</v-icon>
        Add Tab
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add New Tab</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              align="center"
            >
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-text-field
                  label="Name"
                  :rules="nameRules"
                  v-model="name"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false; $refs.form.reset()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="newTab"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  name: 'newTabModal',
  props: [ 'id' ],
  data: () => ({
    dialog: false,
    valid: true,
    tabs: [],
    name: null,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 15) || 'Name must be less than 15 characters'
    ]
  }),
  methods: {
    // add new tab to tabs array on project document
    newTab () {
      firebase.firestore().collection('projects').doc(this.id).get()
        .then((doc) => {
          // get any existing tabs
          if (doc.data().tabs) {
            this.tabs = doc.data().tabs
          }
          // append new tab locally
          this.tabs.push({ name: this.name, id: Date.now(), layout: [] })
          // update tabs array on firebase
          firebase.firestore().collection('projects').doc(this.id)
            .update({
              tabs: this.tabs
            })
          // close modal and reset form
          this.dialog = false
          this.$refs.form.reset()
        })
    }
  }
}
</script>
