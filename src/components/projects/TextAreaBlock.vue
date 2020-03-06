<template>
  <v-card
    height="100%"
    flat
  >
    <v-card-text>
      <v-row>
        <v-col
          justify="center"
          align="center"
        >
          <p>{{ content }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'TextAreaBlock',
  props: [ 'i', 'content' ],
  data: () => ({
  })
}
</script>
