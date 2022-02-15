<template>
  <v-card flat class="overflow-hidden">
    <v-app-bar
      app
      fixed
      top
      color="#43a047"
      dark
      tile
      prominent
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right,  rgba(94, 188, 100, .7), rgba(136, 119, 37, .7)"
        ></v-img><!-- gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)" -->
      </template>

      <v-app-bar-title>
        <router-link to="/home">
          <v-img max-width="80" class="rounded-circle" src="../../public/img/leaf.jpeg"></v-img>
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-layout row wrap justify-end align-self-end>
        <v-flex xs8 sm4 md3 lg2 mb-8>
          <v-btn color="red lighten-1" @click="$axios.logout()">Logout</v-btn>
        </v-flex>
      </v-layout>
    </v-app-bar>
  </v-card>
</template>