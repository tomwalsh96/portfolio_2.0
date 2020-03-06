<template>
  <v-app id="app">
    <AppBar />
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import AppBar from './components/app/AppBar'
import BottomNav from './components/app/BottomNav'

export default {
  components: {
    AppBar,
    BottomNav
  },
  name: 'App',
  data: () => ({
  })
}
</script>
