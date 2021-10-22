<template>
  <v-layout class="justify-center align-center">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card elevation="6"
            class="card-border">
            <v-card-title class="">Lista de Carteiras</v-card-title>

            <v-simple-table
              fixed-header
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Nome
                    </th>
                    <th class="text-left">
                      Carteira
                    </th>
                    <th class="text-left">
                      Saldo
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
  }
</script>