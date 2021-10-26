<template>
  <v-app class="background">
    <v-main>
      <Navbar style="margin-bottom: 128px"></Navbar>
      <Alert />
      <router-view>
      </router-view>
      <Footerbar class="fixed-bottom"></Footerbar>
    </v-main>
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
}

.fixed-bottom {
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
}
</style>