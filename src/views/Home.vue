<template>
  <v-layout fill-heigh>
    <v-container fluid>
      <v-row>
        <v-col class="text-center" >
          <h1>Bem vindo ao Leaf</h1>
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 1"
              class="card-border">
              <v-card-title class="">Criar carteiras</v-card-title>

              <v-card-text>Crie aqui uma nova <code>Carteira</code></v-card-text>
              <v-card-actions>
                <v-hover v-slot="{ hover }">
                  <v-btn
                    :elevation="hover ? 12 : 0"
                    :class="hover ? 'change-btn-color ml-2' : ' ml-2'"
                    outlined
                    dark
                    large
                    color="#887725"
                    >
                    <v-icon aria-hidden="false">
                      mdi-plus
                    </v-icon>
                    Carteira
                  </v-btn>
                </v-hover>
                <AddWallet/>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 1"
              class="card-border">
              <v-card-title class="">Carteiras</v-card-title>

              <v-card-text>Veja aqui a lista de <code>Carteiras</code></v-card-text>
              <v-card-actions>
                <v-hover v-slot="{ hover }">
                  <v-btn
                    :elevation="hover ? 12 : 0"
                    :class="hover ? 'change-btn-color ml-2' : ' ml-2'"
                    outlined
                    dark
                    large
                    color="#887725">
                    <v-icon aria-hidden="false">
                      mdi-format-list-bulleted
                    </v-icon>
                    Carteiras
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import AddWallet from '@/components/AddWallet'

  export default {
    name: 'Home',

    components: {
      AddWallet
    },
  }
</script>

<style scoped>
.card-border {
  border-top: 3px solid #C3AB6A !important;
}

.change-btn-color {
  color: #fff !important;
  background-color: #5EBC64;
  border-color: #5EBC64;
  position: relative;
  bottom: 2px;
}

code {
  color: #887725 !important;
  background-color: #fff !important;
}

</style>
