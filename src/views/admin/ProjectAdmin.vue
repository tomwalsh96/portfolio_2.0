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
            <div
              class="fab"
            >
              <NewTabModal :id="$route.params.id"/>
            </div>
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
          <div
            class="fab"
          >
            <v-menu
              offset-x
            >
              <template
                v-slot:activator="{ on }"
              >
                <v-btn
                  fab
                  small
                  elevation="2"
                  v-on="on"
                >
                  <v-icon>more_horiz</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="renameTab"
                >
                  <EditTabModal :id="tab.id" :name="tab.name" @newName="renameTab"/>
                </v-list-item>
                <v-list-item
                  link
                >
                  <DeleteModal @del="deleteTab(tab.id)"/>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          {{ tab.name }}
        </v-tab>
        <v-tab-item
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <AdminGridLayout :name="tab.name" :id="tab.id" @layout="updateTabLayout"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import firebase from '@/firebase/init'
import AdminGridLayout from '../../components/admin/AdminGridLayout'
import EditTabModal from '../../components/admin/EditTabModal'
import NewTabModal from '../../components/admin/NewTabModal'
import DeleteModal from '../../components/admin/DeleteModal'

export default {
  name: 'projectAdmin',
  components: {
    AdminGridLayout,
    EditTabModal,
    NewTabModal,
    DeleteModal
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
  },
  methods: {
    // save local tabs array to firebase
    saveTabs () {
      firebase.firestore().collection('projects').doc(this.$route.params.id)
        .update({
          tabs: this.tabs,
          updated: Date.now()
        })
    },
    // delete tab with given id field in local array then save
    deleteTab (id) {
      var index = this.tabs.indexOf(this.tabs.filter(function (item) { return (item.id === id) })[0])
      this.tabs.splice(index, 1)
      this.saveTabs()
    },
    // rename tab with given id field and new name in local array then save
    renameTab (id, name) {
      var oldTab = this.tabs.filter((element) => element.id === id)[0]
      var index = this.tabs.findIndex((element) => element === oldTab)
      var updatedTab = { name: name, id: id, layout: this.tabs[index].layout }
      this.tabs.splice(index, 1, updatedTab)
      this.saveTabs()
    },
    // when AdminGridLayout is updated, it emits a call to this function
    // given name, id, and new layout value the local tabs array is updated then saved
    updateTabLayout (name, id, layout) {
      var oldTab = this.tabs.filter((element) => element.id === id)[0]
      var index = this.tabs.findIndex((element) => element === oldTab)
      var updatedTab = { name: name, id: id, layout: layout }
      this.tabs.splice(index, 1, updatedTab)
      this.saveTabs()
    }
  }
}
</script>

<style>
.fab {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: +1;
}
</style>
