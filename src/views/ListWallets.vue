<template>
  <v-layout fill-height class="justify-center align-center">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 1"
              class="card-border">
              <v-card-title class="">Carteiras</v-card-title>

              <v-simple-table
                fixed-header
                height="300px"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Nome
                      </th>
                      <th class="text-left">
                        ID Carteira
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
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-hover>
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