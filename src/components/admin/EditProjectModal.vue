<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-list-item-title
        v-on="on"
      >
        Edit
      </v-list-item-title>
    </template>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Edit Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                align="center"
              >
                <croppa
                  v-model="myCroppa"
                  :width="400"
                  :height="200"
                  :prevent-white-space="true"
                ></croppa>
                <v-text-field
                  label="Name"
                  :rules="nameRules"
                  v-model="name"
                ></v-text-field>
                <v-textarea
                  label="Short Description"
                  :rules="shortDescRules"
                  v-model="shortDesc"
                ></v-textarea>
                <v-text-field
                  label="Link to live site"
                  :rules="urlRules"
                  v-model="live"
                ></v-text-field>
                <v-text-field
                  label="Link to code"
                  :rules="urlRules"
                  v-model="code"
                ></v-text-field>
                <v-switch
                  label="Featured?"
                  v-model="featured"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editProject"
            :disabled="!valid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import firebase from '@/firebase/init'

import Vue from 'vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)

export default {
  name: 'editProjectModal',
  props: [ 'id', 'oldName', 'oldShortDesc', 'oldLive', 'oldCode', 'oldFeatured' ],
  data: () => ({
    myCroppa: {},
    dialog: false,
    valid: true,
    name: null,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 40) || 'Name must be less than 40 characters'
    ],
    shortDesc: null,
    shortDescRules: [
      v => !!v || 'Short Description is required',
      v => (v && v.length <= 200) || 'Name must be less than 200 characters'
    ],
    live: 'http://',
    code: 'http://',
    urlRules: [
      v => !!v || 'Url is required',
      v => /http:+\/\/+.+\../.test(v) || 'Url must follow format http://example.com'
    ],
    featured: true
  }),
  created: function () {
    this.name = this.oldName
    this.shortDesc = this.oldShortDesc
    this.live = this.oldLive
    this.code = this.oldCode
    this.featured = this.oldFeatured
  },
  methods: {
    // update project with new inputs
    editProject () {
      if (this.$refs.form.validate()) {
        // temporarily unvalidate form so it can't be submitted more than once
        this.valid = false
        var dbRef = firebase.firestore().collection('projects').doc(this.id)
        var storageRef = firebase.storage().ref('projects/' + this.id + '/thumbnail')
        this.myCroppa.generateBlob(
          blob => {
            if (blob) {
              // put image into storage reference
              storageRef.put(blob).then((snapshot) => {
                // get storage path and Url to update project document
                snapshot.ref.getDownloadURL().then((url) => {
                  dbRef.update({
                    thumbUrl: url,
                    thumbFullPath: storageRef.fullPath,
                    name: this.name,
                    shortDesc: this.shortDesc,
                    live: this.live,
                    code: this.code,
                    featured: this.featured,
                    updated: Date.now()
                  }).then(() => {
                    // close modal and reset form
                    this.dialog = false
                    this.valid = true
                  })
                })
              })
            }
          },
          'image/jpeg',
          0.8
        )
      }
    }
  }
}
</script>
