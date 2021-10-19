<template>
  <v-app class="background">
    <v-main>
      <Navbar style="margin-bottom: 128px"></Navbar>
      <router-view/>
      <Footerbar class="fixed-bottom"></Footerbar>
    </v-main>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Footerbar from '@/components/Footerbar'

  export default {
    name: 'Home',

    components: {
      Navbar,
      Footerbar
    },
  }
</script>

<style scoped>
.background {
  background-color: #f1f0de !important; 
}
</style>