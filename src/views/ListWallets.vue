<template>
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
          <td>{{ item.idWallets }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            idWallets: 159,
          },
          {
            name: 'Ice cream sandwich',
            idWallets: 237,
          },
          {
            name: 'Eclair',
            idWallets: 262,
          },
          {
            name: 'Cupcake',
            idWallets: 305,
          },
          {
            name: 'Gingerbread',
            idWallets: 356,
          },
          {
            name: 'Jelly bean',
            idWallets: 375,
          },
          {
            name: 'Lollipop',
            idWallets: 392,
          },
          {
            name: 'Honeycomb',
            idWallets: 408,
          },
          {
            name: 'Donut',
            idWallets: 452,
          },
          {
            name: 'KitKat',
            idWallets: 518,
          },
        ],
      }
    },
  }
</script>