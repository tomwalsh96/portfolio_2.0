<template>
  <v-container
    fluid
  >
    <v-row
    justify="center"
    >
      <v-col
        v-for="(category, index) in skill_list"
        :key="index"
        cols="12"
      >
        <v-container>
          <v-card>
            <v-card-title
              class="display-1 font-weight-bold"
            >
              {{ category.category }}
            </v-card-title>
            <hr>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(skill, index) in category.skills"
                  :key="index"
                  cols="4"
                  sm="3"
                  md="2"
                >
                  <div>
                    <a :href="skill.link" target="_blank" style="text-decoration:none; color:black">
                      <v-img
                        :src="skill.img_src"
                        height="100px"
                        contain
                      ></v-img>
                      <h3>{{ skill.name }}</h3>
                    </a>
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
  data: () => ({
  })
}
</script>
