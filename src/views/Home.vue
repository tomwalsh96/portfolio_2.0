<template>
  <v-container
    fluid
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        justify="center"
        align="center"
      >
        <h1 class="display-2 font-weight-bold mb-3">
          Developer Portfolio
        </h1>
        <p class="subheading font-weight-regular">
          This website is intended as a demonstration of my software development skills
          <br> and a compilation of all projects I have undertaken.
        </p>
        <v-row
        justify="center"
        >
          <v-btn
            class="ma-2"
            fab
            href="https://www.linkedin.com/in/tomwalsh96/"
            target="_blank"
          >
            <v-avatar>
              <img
                src="../assets/linkedin.png"
                alt="LinkedIn"
              >
            </v-avatar>
          </v-btn>
          <v-btn
            class="ma-2"
            fab
            href="https://github.com/tomwalsh96"
            target="_blank"
          >
            <v-avatar>
              <img
                src="../assets/github.png"
                alt="GitHub"
              >
            </v-avatar>
          </v-btn>
          <v-btn
            class="ma-2"
            fab
            href="https://stackoverflow.com/users/9464117/tom-walsh"
            target="_blank"
          >
            <v-avatar>
              <img
                src="../assets/stackoverflow.png"
                alt="StackOverflow"
              >
            </v-avatar>
          </v-btn>
          <v-btn
            class="ma-2"
            fab
            href="https://Kaggle.com/tomwalsh96"
            target="_blank"
          >
            <v-avatar>
              <img
                src="../assets/kaggle.png"
                alt="Kaggle"
              >
            </v-avatar>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        justify="center"
        align="center"
      >
        <v-container>
          <v-card>
            <v-row
              justify="center"
            >
              <v-card-title
                class="display-1 font-weight-bold"
              >
                Featured Projects
              </v-card-title>
            </v-row>
            <hr>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(project, index) in featuredProjects"
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
                      <v-row
                        justify="space-around"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text href="project.live" target="_blank">Live Demo</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text href="project.code" target="_blank">Source Code</v-btn>
                        <v-spacer></v-spacer>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        justify="center"
        align="center"
      >
        <v-container>
          <v-card>
            <v-row
              justify="center"
            >
              <v-card-title
                class="display-1 font-weight-bold"
              >
                Featured Skills
              </v-card-title>
            </v-row>
            <hr>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(skill, index) in featuredSkills"
                  :key="index"
                  cols="4"
                  sm="3"
                  md="2"
                >
                  <div>
                    <v-img
                      :src="skill.img_src"
                      height="100px"
                      contain
                    ></v-img>
                    {{ skill.name }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { loadData } from '../mixins/data'

export default {
  mixins: [loadData],
  name: 'home',
  data: () => ({
  })
}
</script>
