<template>
  <v-card
    height="100%"
    flat
  >
    <v-img
      :src="content"
    ></v-img>
  </v-card>
</template>

<script>

export default {
  name: 'ImageBlock',
  props: [ 'i', 'content' ],
  data: () => ({
  })
}
</script>

<style>
</style>
