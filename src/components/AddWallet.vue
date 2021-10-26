<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Criar
          </v-btn>
        </template> -->
        <v-card>
          <div v-if="isLoading" style="min-height: 4px;">
            <v-progress-linear
              indeterminate
              color="#5EBC64"
            ></v-progress-linear>
          </div>
          <v-card-title>
            <span class="text-h5">Criar Carteira</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      :elevation="hover ? 12 : 0"
                      :class="hover ? 'change-btn-color ml-2' : ' ml-2'"
                      outlined
                      dark
                      large
                      color="#887725"
                      :disabled="isLoading"
                      @click="generateWallet()"
                      >
                      <v-icon v-if="!isLoading" aria-hidden="false">
                        mdi-plus
                      </v-icon>
                      <v-progress-circular
                        class="text-center"
                        v-else
                        indeterminate
                        color="#fff "
                        :size="25"
                        :width="3"
                      ></v-progress-circular>
                      Gerar nova carteira
                    </v-btn>
                  </v-hover>
                </v-col>

                <!-- <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col> -->
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col> -->
              </v-row>

              <v-row v-if="wallet">
                <v-col>
                  <span>
                    O número da sua carteira é:<br /><code class="pl-0">{{ wallet.wallet_code }}</code>
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="wallet.wallet_code">
                <v-col>
                  <v-text-field
                    v-model="fullname"
                    label="Nome Completo"
                    required
                  >
                    <v-icon slot="prepend-inner" color="#5EBC64">
                      mdi-account-outline
                    </v-icon>
                  </v-text-field>
                </v-col>
              </v-row>

            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-hover
              v-slot="{ hover }">
              <v-btn
                small
                :elevation="hover ? 16 : 0"
                :outlined="hover ? false : true"
                color="success"
                tile
                class="mr-4 justify-center"
                @click="saveWallet()"
              >
                Salvar
              </v-btn>
            </v-hover>
            <v-hover
              v-slot="{ hover }">
              <v-btn
                small
                :elevation="hover ? 16 : 0"
                :outlined="hover ? false : true"
                color="error"
                tile
                class="mr-4 justify-center"
                @click="dialog = false"
              >
                Cancelar
              </v-btn>
            </v-hover>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'AddWallet',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isLoading: false,
      wallet: '',
      fullname: ''
    }
  },

  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('changeValueDialog', newValue)
      }
    }
  },

  methods: {
    async generateWallet () {
      this.isLoading = true

      try {
        const { data } = await this.$axios.post('/wallet')
        this.wallet = data.wallet

      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }

      /* setTimeout(() => {
      }, 5000) */
    },

    async saveWallet () {
      try {
        const { data } = await this.$axios.post('/users', {name: this.fullname})
        const userId = data.id

        await this.$axios.patch('/wallet/bindUser', {user_id: userId, wallet_id: this.wallet.id})

      } catch (err) {
        console.error(err)
      } finally {
        this.dialog = false
        this.$store.dispatch('CHANGE_ALERT', true)
      }

      setTimeout(() => {
        this.$store.dispatch('CHANGE_ALERT', false)
      }, 5000)
    }
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin-right: 0.5rem;
  margin-left: -0.5rem;
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
  font-size: 20px !important;
}
</style>
