<template>
  <v-app>
    <Navbar></Navbar>
    <router-view/>
    <Footerbar class="fixed"></Footerbar>
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
    background-color: #f1f0de; 
}
</style>