<template>
  <v-layout class="justify-center align-center">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card elevation="6"
            class="card-border">
            <v-card-title
              class="justify-center mb-3 ">
              <h1 style="color: #887725">Lista de Carteiras</h1>
            </v-card-title>

            <v-simple-table
              fixed-header
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left title-color">
                      <h2 class="-color">Nome</h2>
                    </th>
                    <th class="text-left title-color">
                      <h2 class="-color">Carteira</h2>
                    </th>
                    <th class="text-left title-color">
                      <h2 class="-color">Saldo</h2>
                    </th>
                    <th class="text-center title-color">
                      <h2 class="-color">Ações</h2>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in desserts"
                    :key="item.name"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.idwallets }}</td>
                    <td>{{ item.idwallets }}</td>
                    <td class="text-center">
                      <v-hover
                        v-slot="{ hover }">
                        <v-tooltip top color="#887725">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              x-small
                              :elevation="hover ? 16 : 0"
                              outlined
                              :class="hover ? 'change-btn-color' : ''"
                              dark
                              color="#887725"
                              class="mr-4 justify-center py-3 px-1"
                              @click="setBalance('add')"
                            >
                              <v-icon>mdi-plus</v-icon>
                              Saldo
                            </v-btn>
                          </template>
                          <span>Adicionar Créditos</span>
                        </v-tooltip>
                      </v-hover>

                      <v-hover
                        v-slot="{ hover }">
                        <v-tooltip top color="#887725">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              x-small
                              :elevation="hover ? 16 : 0"
                              :outlined="hover ? false : true"
                              dark
                              color="error"
                              class="mr-4 justify-center py-3 px-1"
                              @click="setBalance('minus')"
                            >
                              <v-icon>mdi-minus</v-icon>
                              Saldo
                            </v-btn>
                          </template>
                          <span>Sacar</span>
                        </v-tooltip>
                      </v-hover>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>

</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            idwallets: 159,
          },
          {
            name: 'Ice cream sandwich',
            idwallets: 237,
          },
          {
            name: 'Eclair',
            idwallets: 262,
          },
          {
            name: 'Cupcake',
            idwallets: 305,
          },
          {
            name: 'Gingerbread',
            idwallets: 356,
          },
          {
            name: 'Jelly bean',
            idwallets: 375,
          },
          {
            name: 'Lollipop',
            idwallets: 392,
          },
          {
            name: 'Honeycomb',
            idwallets: 408,
          },
          {
            name: 'Donut',
            idwallets: 452,
          },
          {
            name: 'KitKat',
            idwallets: 518,
          },
        ],
      }
    },

    methods: {
      setBalance (action) {
        this.$router.push('/balance')
        this.$store.dispatch('ADD_BALANCE', action)
      },
    }
  }
</script>

<style scoped>
.change-btn-color {
  color: #fff !important;
  background-color: #5EBC64;
  border-color: #5EBC64;
  position: relative;
  bottom: 2px;
}

.-color {
  color:#C3AB6A;
}

.btn-balance:hover {
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;
}

</style>