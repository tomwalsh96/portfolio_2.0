<template>
  <v-container>
    <v-expansion-panels
      hover
      popout
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3
          class="
          font-weight-black
          display-1
          my-5
          "
          >
            Projects
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            justify="start"
          >
            <NewProjectModal @reload="loadProjects"/>
          </v-row>
          <v-row>
            <v-col
              v-for="(project, index) in projects"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card>
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
                        link
                      >
                        <EditProjectModal
                          :id="project.id"
                          :oldName="project.name"
                          :oldShortDesc="project.shortDesc"
                          :oldLive="project.live"
                          :oldCode="project.code"
                          :oldFeatured="project.featured"
                        />
                      </v-list-item>
                      <v-list-item
                        link
                      >
                        <DeleteModal @del="deleteProject(project.id)"/>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <v-img
                  :src="project.thumbUrl"
                  aspect-ratio="2"
                >
                  <v-btn
                    :to="'/admin/' + project.id"
                    class="readMore"
                  >
                    Read More
                  </v-btn>
                </v-img>
                <v-card-title>
                  {{ project.name }}
                </v-card-title>
                <v-card-text
                  style="height:80px"
                >
                  {{ project.shortDesc }}
                </v-card-text>
                <v-card-actions>
                <v-row>
                  <v-btn
                    text
                    :href="project.live"
                    target="_blank"
                  >
                    Live Demo
                  </v-btn>
                  <v-btn
                    text
                    :href="project.code"
                    target="_blank"
                  >
                    Source Code
                  </v-btn>
                </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3
          class="
          font-weight-black
          display-1
          my-5
          "
          >
            Skills
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            justify="end"
          >
            <NewProjectModal @reload="loadProjects"/>
          </v-row>
          <v-row>
            <v-col
              v-for="(project, index) in projects"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card>
                <v-img
                  :src="project.thumbUrl"
                  aspect-ratio="2"
                ></v-img>
                <v-card-title>
                  {{ project.name }}
                </v-card-title>
                <v-card-text>
                  {{ project.shortDesc }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import NewProjectModal from '../../components/admin/NewProjectModal'
import EditProjectModal from '../../components/admin/EditProjectModal'
import DeleteModal from '../../components/admin/DeleteModal'
import { loadProjects } from '../../mixins/loadData'

export default {
  mixins: [loadProjects],
  components: {
    NewProjectModal,
    EditProjectModal,
    DeleteModal
  },
  name: 'admin',
  data: () => ({
  }),
  // loads firebase data on created using mixin functions
  created: function () {
    this.loadProjects()
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
.readMore {
  position: absolute;
  left: 5px;
  bottom: 5px;
  opacity: 0.9;
}
</style>
