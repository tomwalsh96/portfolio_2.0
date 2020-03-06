<template>
  <v-bottom-navigation
    app
    fixed
    grow
  >
    <v-btn
      to="/projects"
    >
      <span>Projects</span>
      <v-icon>folder</v-icon>
    </v-btn>

    <v-btn
      to="/"
    >
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn
      to="/skills"
    >
      <span>Skills</span>
      <v-icon>pan_tool</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'bottomNav',
  data: () => ({
  })
}
</script>

<style>
#app .v-bottom-navigation .v-btn {
  height: inherit !important;
}
</style>
