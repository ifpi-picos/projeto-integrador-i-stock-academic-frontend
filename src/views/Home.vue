<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Bem vindo ao Leaf</h1>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="4">
        <v-card elevation="6">
          <v-card-title class="justify-center">Cadastrar nova carteira</v-card-title>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card elevation="6">
          <v-card-title class="justify-center">
            Carteiras cadastradas
            <v-icon aria-hidden="false">
              mdi-account
            </v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    components: {
    },
  }
</script>

<style scoped>

</style>
