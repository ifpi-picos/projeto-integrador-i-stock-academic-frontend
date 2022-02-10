<template>
  <div>
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card elevation="6">
            <v-card-title class="justify-center mb-3">
              <h1 style="color: #887725">Lista de Carteiras</h1>
            </v-card-title>

            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left title-color">
                      <h2 class="color">Nome</h2>
                    </th>
                    <th class="text-left title-color">
                      <h2 class="color">Carteira</h2>
                    </th>
                    <th class="text-left title-color">
                      <h2 class="color">Saldo</h2>
                    </th>
                    <th class="text-center title-color">
                      <h2 class="color">Ações</h2>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="users.length > 0">
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.wallet ? user.wallet.wallet_code : "" }}</td>
                    <td>{{ getBalance(user.wallet.wallet_transactions) }}</td>
                    <td class="text-center">
                      <v-hover v-slot="{ hover }">
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
                              class="justify-center py-3 px-1"
                              @click="
                                dataChangeBalance.wallet = user.wallet
                                dataChangeBalance.typeChange = 'deposit'
                                setBalance()
                              "
                            >
                              <v-icon>mdi-plus</v-icon>
                              Saldo
                            </v-btn>
                          </template>
                          <span>Adicionar Créditos</span>
                        </v-tooltip>
                      </v-hover>

                      <v-hover v-slot="{ hover }">
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
                              class="mx-2 justify-center py-3 px-1"
                              @click="
                                dataChangeBalance.wallet = user.wallet
                                dataChangeBalance.typeChange = 'withdraw'
                                setBalance()
                              "
                            >
                              <v-icon>mdi-minus</v-icon>
                              Saldo
                            </v-btn>
                          </template>
                          <span>Sacar</span>
                        </v-tooltip>
                      </v-hover>

                      <v-hover v-slot="{ hover }">
                        <v-tooltip top color="#887725">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              x-small
                              :elevation="hover ? 16 : 0"
                              :outlined="hover ? false : true"
                              dark
                              icon
                              @click="
                                userInfo = user
                                moreInfo = !moreInfo"
                            >
                              <v-icon color="info" size="30" >mdi-information-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Mais informações</span>
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

    <InfoModal :showInfo="moreInfo" :userInfo="userInfo"/>
    <!-- <InfoModal v-model="moreInfo" :userInfo="userInfo" @changeStateModal="moreInfo = $event" /> -->

    <Transactions
      v-model="modalChangeWalletBalance"
      :dataChangeBalance="dataChangeBalance"
      @changeValue="modalChangeWalletBalance = $event"
      @updateBalance="getData()"
    />
  </div>
</template>

<script>
import Transactions from '@/components/Transactions.vue'
import InfoModal from '@/components/InfoModal.vue'

export default {
  components: {
    Transactions,
    InfoModal,
  },

  data() {
    return {
      users: [],
      modalChangeWalletBalance: false,
      dataChangeBalance: {
        wallet: {},
        typeChange: "",
      },
      moreInfo: false,
      userInfo: [],
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        const { data: { data } } = await this.$axios.get("/users")
        this.$store.dispatch('CHANGE_LIST_WALLETS', data)

        this.users = data
      } catch (err) {
        console.error(err)
      }
    },

    getBalance (transactions) {
      let balance = 0

      if (transactions.length === 0) {
        return balance
      }

      for (const transact in transactions) {
       transactions[transact].type_operation === 'deposit' ?
          balance += transactions[transact].total_value : balance -= transactions[transact].total_value
      }

      return balance
    },

    setBalance() {
      this.modalChangeWalletBalance = !this.modalChangeWalletBalance
    },
  },
};
</script>

<style scoped>
.change-btn-color {
  color: #fff !important;
  background-color: #5ebc64;
  border-color: #5ebc64;
  position: relative;
  bottom: 2px;
}

.color {
  color: #c3ab6a;
}

.btn-balance:hover {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
}
</style>