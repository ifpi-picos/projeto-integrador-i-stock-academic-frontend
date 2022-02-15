<template>
  <v-app class="background">
    <Navbar />

    <v-main>
      <v-container fluid>
        <Alert />
        <router-view />
      </v-container>
    </v-main>

    <Footerbar />
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Footerbar from '@/components/Footerbar'

  import Alert from '@/components/Alert'

  export default {
    name: 'Home',

    components: {
      Navbar,
      Footerbar,
      Alert
    },
  }
</script>

<style scoped>
.background {
  background-color: #f1f0de !important;
  height: 100%;
  max-width: 100vw !important;
}

.fixed-bottom {
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
}
</style>