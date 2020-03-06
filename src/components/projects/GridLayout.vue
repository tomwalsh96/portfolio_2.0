<template>
<v-row
  justify="center"
>
  <v-col>
    <v-row>
      <v-col>
        <grid-layout
          :layout="layout"
          :col-num="12"
          :row-height="30"
          :is-draggable="false"
          :is-resizable="false"
          :vertical-compact="false"
          :responsive="true"
          :margin="[10, 10]"
          :use-css-transforms="true"
          @layout-updated="save"
        >
          <grid-item
            class="item"
            v-for="item in layout"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :minW="item.minW"
            :h="item.h"
            :minH="item.minH"
            :i="item.i"
            :key="item.i"
          >
            <ImageBlock
              class="hidden-md-and-down"
              v-if="item.type =='image'"
              :i="item.i"
              :content="item.content"
            />
            <TextAreaBlock
              v-else-if="item.type =='textarea'"
              :i="item.i"
              :content="item.content"
            />
            <HeaderBlock
              v-else-if="item.type =='header'"
              :i="item.i"
              :content="item.content"
            />
          </grid-item>
        </grid-layout>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import firebase from '@/firebase/init'
import VueGridLayout from 'vue-grid-layout'
import ImageBlock from './ImageBlock'
import TextAreaBlock from './TextAreaBlock'
import HeaderBlock from './HeaderBlock'

export default {
  name: 'AdminGridLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    HeaderBlock,
    TextAreaBlock,
    ImageBlock
  },
  props: [ 'name', 'id' ],
  data: () => ({
    layout: []
  }),
  created: function () {
    // load firebase data into local
    firebase.firestore().collection('projects').doc(this.$route.params.id)
      .onSnapshot((doc) => {
        if (doc.data().tabs) {
          var tabs = doc.data().tabs
          this.layout = tabs.filter(this.checkId)[0].layout
        }
      })
  },
  methods: {
    // function for filtering out object from tabs array given ID
    checkId (tab) {
      return tab.id === this.id
    }
  }
}
</script>

<style>
</style>
