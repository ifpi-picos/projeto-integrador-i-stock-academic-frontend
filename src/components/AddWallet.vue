<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="700px"
      >
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
            </v-row>

            <v-row v-if="user.wallet">
              <v-col>
                <span>
                  O número da sua carteira é:<br /><code class="pl-0">{{ user.wallet.wallet_code }}</code>
                </span>
              </v-col>
            </v-row>

            <v-form>
              <div v-if="user.wallet.wallet_code">
                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-file-input
                      label="Foto do usuário"
                      accept="image/png, image/jpeg, image/bmp, image/jpg"
                      prepend-inner-icon="mdi-camera"
                      v-model="user.userPhoto"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.fullname"
                      label="Nome Completo*"
                      placeholder="Informe seu nome"
                      required
                    >
                      <v-icon slot="prepend-inner" color="#5EBC64">
                        mdi-account-tie
                      </v-icon>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.cpfCnpj"
                      label="CPF ou CNPJ"
                      placeholder="Informe seu cpfCnpj"
                      prepend-inner-icon="mdi-card-account-details"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      required
                      color="terciary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.phoneNumber"
                      label="Telefone*"
                      placeholder="Informe seu Telefone"
                      prepend-inner-icon="mdi-whatsapp"
                      v-mask="'##-#####-####'"
                      required
                      color="terciary"
                    />
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="12" sm="6" class="py-0">
                    <v-text-field
                      v-model="user.address.CEP"
                      label="CEP*"
                      placeholder="Informe seu CEP"
                      prepend-inner-icon="mdi-mailbox"
                      v-mask="'#####-###'"
                      required
                      color="terciary"
                    />
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.city"
                      label="Cidade"
                      placeholder="Informe sua cidade"
                      prepend-inner-icon="mdi-city"
                      color="terciary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.state"
                      label="Estado"
                      placeholder="Informe seu estado"
                      prepend-inner-icon="mdi-billboard"
                      color="terciary"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.district"
                      label="Bairro"
                      placeholder="Informe o bairro"
                      prepend-inner-icon="mdi-home-group"
                      color="terciary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.publicPlace"
                      label="Logradouro"
                      placeholder="Informe a descrição logradouro"
                      prepend-inner-icon="mdi-home-city-outline"
                      color="terciary"
                    />
                  </v-col>  
                </v-row>

                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.complement"
                      label="Complemento"
                      placeholder="Informe o complemento"
                      prepend-inner-icon="mdi-notebook-edit"
                      color="terciary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.number"
                      label="Número"
                      placeholder="Informe o número da residência ou ap"
                      prepend-inner-icon="mdi-billboard"
                      color="terciary"
                    />
                  </v-col>
                </v-row>

                <small>* Campos obrigatórios!</small>
              </div>
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
                    :disabled="!user.fullname || !user.wallet"
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
            </v-form>
          </v-card-text>
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
      user: {
        wallet: '',
        userPhoto: undefined,
        fullname: '',
        cpfCnpj: '',
        phoneNumber: '',
        address: {
          CEP: '',
          cyty: '',
          state: '',
          district: '',
          publicPlace: '',
          number: null,
          complement: '',
        }
      }
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
        this.user.wallet = data.wallet

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
        const { data } = await this.$axios.post('/users', {name: this.user.fullname})
        const userId = data.id

        await this.$axios.patch('/wallet/bindUser', {user_id: userId, wallet_id: this.user.wallet.id})

        this.user.wallet = ''
        this.user.fullname = ''
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
