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
          :is-draggable="!isEditing"
          :is-resizable="true"
          :vertical-compact="false"
          :responsive="true"
          :margin="[10, 10]"
          :use-css-transforms="true"
          @layout-updated="save"
        >
          <grid-item
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
            <AdminImageBlock
              class="hidden-md-and-down"
              v-if="item.type =='image'"
              :i="item.i"
              :content="item.content"
              @delete="deleteElement"
            />
            <AdminTextAreaBlock
              v-else-if="item.type =='textarea'"
              :i="item.i"
              :content="item.content"
              @editing="isEditing = !isEditing"
              @content="changeContent"
              @delete="deleteElement"
            />
            <AdminHeaderBlock
              v-else-if="item.type =='header'"
              :i="item.i"
              :content="item.content"
              @editing="isEditing = !isEditing"
              @content="changeContent"
              @delete="deleteElement"
            />
          </grid-item>
        </grid-layout>
      </v-col>
    </v-row>
    <v-row
      justify="end"
      class="mr-5"
    >
      <v-menu>
        <template
          v-slot:activator="{ on }"
        >
          <v-btn
            v-on="on"
          >
            <v-icon>add</v-icon>
            Add Element
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="addHeader"
          >
            <v-list-item-title>Header</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="addTextArea"
          >
            <v-list-item-title>Text-Area</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
          >
            <AddImageModal :id="$route.params.id" @url="addImage"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import firebase from '@/firebase/init'
import VueGridLayout from 'vue-grid-layout'
import AdminImageBlock from './AdminImageBlock'
import AdminTextAreaBlock from './AdminTextAreaBlock'
import AdminHeaderBlock from './AdminHeaderBlock'
import AddImageModal from './AddImageModal'

export default {
  name: 'AdminGridLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    AdminHeaderBlock,
    AdminTextAreaBlock,
    AdminImageBlock,
    AddImageModal
  },
  props: [ 'name', 'id' ],
  data: () => ({
    layout: [],
    isEditing: false
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
    },
    // funtion to set i field of each new layout block
    // finds largest existing i value and adds 1, to ensure to duplicates
    findIndex (layout) {
      if (layout.length > 0) {
        var indexes = []
        var item
        for (item of layout) {
          indexes.push(item.i)
        }
        return (Math.max(...indexes) + 1)
      } else {
        return 0
      }
    },
    // add a custom image element to grid layout
    addImage (url) {
      this.layout.push(
        { 'x': 0, 'y': this.yVal(), 'w': 2, 'minW': 2, 'h': 4, 'minH': 4, 'i': this.findIndex(this.layout), type: 'image', isEditing: false, content: url }
      )
      this.save()
    },
    // add a custom text-area element to grid layout
    addTextArea () {
      this.layout.push(
        { 'x': 0, 'y': this.yVal(), 'w': 2, 'minW': 2, 'h': 4, 'minH': 4, 'i': this.findIndex(this.layout), type: 'textarea', isEditing: false, content: 'Insert text here...' }
      )
      this.save()
    },
    // add a custom header element to grid layout
    addHeader () {
      this.layout.push(
        { 'x': 0, 'y': this.yVal(), 'w': 2, 'minW': 2, 'h': 2, 'minH': 2, 'i': this.findIndex(this.layout), type: 'header', isEditing: false, content: 'Header' }
      )
      this.save()
    },
    // change the content of custom elements
    changeContent (content, i) {
      this.layout.filter(function (item) { return (item.i === i) })[0].content = content
      this.save()
    },
    // delete custom elements from grid layout
    deleteElement (i) {
      var index = this.layout.indexOf(this.layout.filter(function (item) { return (item.i === i) })[0])
      this.layout.splice(index, 1)
      this.save()
    },
    // find length of grid layout so new elements can be positioned at the bottom of page
    yVal () {
      var yVal = 0
      var hVal = 0
      this.layout.forEach(element => {
        if ((element.y + element.h) >= (yVal + hVal)) {
          yVal = element.y
          hVal = element.h
        }
      })
      return (yVal + hVal)
    },
    // emit layout on change so can be saved to the appropriate firbase document in parent component
    save () {
      this.$emit('layout', this.name, this.id, this.layout)
    }
  }
}
</script>

<style>
.fab {
  position: absolute;
  right: -8px;
  top: -8px;
  z-index: +1;
}
</style>
