<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-list-item-title
        v-on="on"
      >
        Delete
      </v-list-item-title>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Are you sure you want to delete?</span>
      </v-card-title>
      <v-card-text>
        <p>Data will be permanently removed.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="$emit('del'); dialog = false"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'deleteModal',
  data: () => ({
    dialog: false
  }),
  methods: {
  }
}
</script>
