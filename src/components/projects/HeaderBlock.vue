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
          <h1>{{ content }}</h1>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'HeaderBlock',
  props: [ 'i', 'content' ],
  data: () => ({
  })
}
</script>
