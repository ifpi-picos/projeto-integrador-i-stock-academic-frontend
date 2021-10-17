<template>
  <v-app>
    <v-main class="background">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.background {
  background-color: #F1F0DE;
}
</style>
