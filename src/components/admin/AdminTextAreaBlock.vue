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
            @click="isEditing = !isEditing; newContent = content; $emit('editing'); $emit('content', newContent, i)"
          >
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
          >
            <DeleteModal @del="$emit('delete', i)"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-card-text>
      <v-row>
        <v-col
          justify="center"
          align="center"
        >
          <p v-if="!isEditing">{{ content }}</p>
          <v-textarea
            v-else
            @keydown.enter="isEditing = !isEditing; $emit('editing'); $emit('content', newContent, i)"
            @blur="isEditing = !isEditing; $emit('editing'); $emit('content', newContent, i)"
            v-model="newContent"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteModal from './DeleteModal'

export default {
  name: 'AdminTextAreaBlock',
  props: [ 'i', 'content' ],
  components: {
    DeleteModal
  },
  data: () => ({
    isEditing: false,
    newContent: null
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
