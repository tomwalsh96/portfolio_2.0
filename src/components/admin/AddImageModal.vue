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
        Image
      </v-list-item-title>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add New Image</span>
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
                <v-row
                  style="height: 350px;"
                  align="center"
                >
                  <v-col>
                    <v-row
                      justify="center"
                    >
                      <v-btn
                        @click="myCroppa.rotate()"
                        fab
                        class="mb-3"
                      >
                        <v-icon>rotate_right</v-icon>
                      </v-btn>
                    </v-row>
                  <v-row
                    justify="center"
                  >
                    <croppa
                      v-model="myCroppa"
                      :width="width"
                      :height="height"
                    ></croppa>
                  </v-row>
                  </v-col>
                </v-row>
                <v-row
                  justify="center"
                >
                  <v-col>
                    <v-slider
                      v-model="width"
                      min="100"
                      max="500"
                      label="Width"
                    ></v-slider>
                  </v-col>
                  <v-col>
                    <v-slider
                      v-model="height"
                      min="50"
                      max="250"
                      label="Height"
                    ></v-slider>
                  </v-col>
                </v-row>
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
          @click="newImage"
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

import Vue from 'vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)

export default {
  name: 'addImageModal',
  props: [ 'id' ],
  data: () => ({
    myCroppa: {},
    dialog: false,
    valid: true,
    width: 400,
    height: 400
  }),
  methods: {
    newImage () {
      this.valid = false
      // references for storage location and firestore document
      var storageRef = firebase.storage().ref('projects/' + this.id + '/' + Date.now())
      // Grab image and generate blob using Croppa
      this.myCroppa.generateBlob(
        blob => {
          if (blob) {
            // put image into storage reference
            storageRef.put(blob).then((snapshot) => {
              // get storage path and Url to update project document
              snapshot.ref.getDownloadURL().then((url) => {
                this.$emit('url', url)
              })
            })
          }
        },
        'image/jpeg',
        0.8
      )
      this.dialog = false
      this.$refs.form.reset()
    }
  }
}
</script>
