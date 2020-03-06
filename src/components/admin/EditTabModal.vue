<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-list-item-title v-on="on">Rename</v-list-item-title>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Rename Tab</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              align="center"
            >
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-text-field
                  label="Name"
                  :rules="nameRules"
                  v-model="newName"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false; $refs.form.reset()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="emitName"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'editTabModal',
  props: [ 'id', 'name' ],
  data: () => ({
    dialog: false,
    valid: true,
    newName: name,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 15) || 'Name must be less than 15 characters'
    ]
  }),
  methods: {
    // emit new tab elements for processing in parent component
    emitName () {
      this.$emit('newName', this.id, this.newName)
      // close modal and reset form
      this.dialog = false
      this.$refs.form.reset()
    }
  }
}
</script>
