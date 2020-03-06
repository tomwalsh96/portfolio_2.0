<template>
  <v-container
    fluid
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
      >
        <v-container>
          <v-card>
            <v-card-title
              class="display-1 font-weight-bold"
            >
              Projects
            </v-card-title>
            <hr>
            <v-card-text>
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
                    >
                      <v-btn
                        :to="'/projects/' + project.id"
                        class="readMore"
                      >
                        Read More
                      </v-btn>
                    </v-img>
                    <v-card-title>
                      {{ project.name }}
                    </v-card-title>
                    <v-card-text
                      style="overflow-y: auto; height:80px"
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
              <!-- <v-row>
                <v-col
                  v-for="(project, index) in projects"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                      :to="project.more"
                    >
                      <v-img
                        :src="project.image"
                        aspect-ratio="3"
                      ></v-img>
                      <v-card-title class="title">{{ project.name }}</v-card-title>
                      <v-card-text>{{ project.description }}</v-card-text>
                      <v-card-actions>
                        <v-col>
                          <v-row
                            justify="center"
                          >
                            <v-btn
                              text
                            >
                              Read More
                            </v-btn>
                          </v-row>
                          <v-row
                            justify="space-around"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text href="project.live" target="_blank">Live Demo</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text href="project.code" target="_blank">Source Code</v-btn>
                            <v-spacer></v-spacer>
                          </v-row>
                        </v-col>
                      </v-card-actions>
                    </v-card>
                </v-col>
              </v-row> -->
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { loadData } from '../mixins/data'
import { loadProjects } from '../mixins/loadData'

export default {
  mixins: [loadData, loadProjects],
  data: () => ({
  }),
  created: function () {
    this.loadProjects()
  }
}
</script>

<style>
.readMore {
  position: absolute;
  left: 5px;
  bottom: 5px;
  opacity: 0.9;
}
</style>
