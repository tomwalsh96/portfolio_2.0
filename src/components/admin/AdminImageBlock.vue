<template>
  <v-card
    height="100%"
    flat
    outlined
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
            link
          >
            <DeleteModal @del="$emit('delete', i)"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-img
      :src="content"
    ></v-img>
  </v-card>
</template>

<script>
import DeleteModal from './DeleteModal'

export default {
  name: 'AdminImageBlock',
  props: [ 'i', 'content' ],
  components: {
    DeleteModal
  },
  data: () => ({
  })
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
