<template>
  <v-container>
    <v-card
      v-if="project"
    >
      <v-card-title>
        <v-row
          align="end"
        >
          <v-col
            cols="12"
            md="6"
          >
            <v-img
              :src="project.thumbUrl"
              aspect-ratio="2"
              class="mx-3"
            >
            </v-img>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-row
              justify="center"
            >
              <h1
                class="display-3 font-weight-bold my-5"
              >
                {{ project.name }}
              </h1>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                :href="project.live"
                target="_blank"
                class="mx-2 mt-5 mb-2"
              >
                Live Demo
              </v-btn>
              <v-btn
                :href="project.code"
                target="_blank"
                class="mx-2 mt-5 mb-2"
              >
                Source Code
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-tabs
        fixed-tabs
        centered
      >
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
        >
          {{ tab.name }}
        </v-tab>
        <v-tab-item
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <GridLayout :name="tab.name" :id="tab.id" @layout="updateTabLayout"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import firebase from '@/firebase/init'
import GridLayout from '../components/projects/GridLayout'

export default {
  name: 'projectAdmin',
  components: {
    GridLayout
  },
  data: () => ({
    project: null,
    tabs: []
  }),
  created: function () {
    // load firebase data into local project object
    firebase.firestore().collection('projects').doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.project = {
          id: doc.id,
          name: doc.data().name,
          thumbUrl: doc.data().thumbUrl,
          shortDesc: doc.data().shortDesc,
          live: doc.data().live,
          code: doc.data().code,
          featured: doc.data().featured,
          created: doc.data().created,
          updated: doc.data().updated
        }
        // if tabs field exists, load into local tabs array
        if (doc.data().tabs) {
          this.tabs = doc.data().tabs
        }
      })
  }
}
</script>

<style>
</style>
