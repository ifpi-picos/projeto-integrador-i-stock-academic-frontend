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
              color="primary"
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
                      v-model="user.fullName"
                      :error-messages="fullNameErrors"
                      label="Nome Completo*"
                      placeholder="Informe seu nome"
                      required
                      color="primary"
                      prepend-inner-icon="mdi-account-tie"
                      @change="$v.user.fullName.$touch()"
                      @blur="$v.user.fullName.$touch()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      v-model="user.cpfCnpj"
                      :error-messages="cpfCnpjErrors"
                      label="CPF ou CNPJ*"
                      placeholder="Informe seu Cpf/Cnpj"
                      prepend-inner-icon="mdi-card-account-details"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      required
                      color="primary"
                      @change="$v.user.cpfCnpj.$touch()"
                      @blur="$v.user.cpfCnpj.$touch()"
                    > 
                      <v-icon v-if="user.validcpfCnpj" slot="append" color="primary">
                        mdi-check-bold
                      </v-icon>
                      <v-icon v-if="$v.user.cpfCnpj.$error || cpfCnpjErrors.length > 0" slot="append" color="error">
                        mdi-close-thick
                      </v-icon>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      v-model="user.phoneNumber"
                      :error-messages="phoneNumberErrors"
                      label="Telefone*"
                      placeholder="(##) #####-####"
                      prepend-inner-icon="mdi-whatsapp"
                      v-mask="'(##) #####-####'"
                      required
                      color="primary"
                      @change="$v.user.phoneNumber.$touch()"
                      @blur="$v.user.phoneNumber.$touch()"
                    />
                  </v-col>

                  <v-col cols="12" md="4" class="py-0">
                    <v-select
                      v-model="pixSelected"
                      :items="pixList"
                      label="Chave Pix"
                      :disabled="!user.phoneNumber || !user.cpfCnpj || $v.user.phoneNumber.$error || cpfCnpjErrors.length > 0"
                      placeholder="Selecione a sua chave pix"
                      prepend-inner-icon="mdi-key-variant"
                      color="primary"
                    />
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="12" sm="6" class="py-0">
                    <v-text-field
                      v-model="user.address.CEP"
                      :error-messages="CepErrors"
                      label="CEP*"
                      placeholder="Informe o seu CEP"
                      prepend-inner-icon="mdi-mailbox"
                      v-mask="'#####-###'"
                      required
                      color="primary"
                      @change="$v.user.address.CEP.$touch()"
                      @blur="$v.user.address.CEP.$touch()"
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
                      color="primary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                     <v-select
                      v-model="user.address.state"
                      :items="statesList"
                      label="Estado"
                      placeholder="Selecione o seu estado"
                      prepend-inner-icon="mdi-billboard"
                      color="primary"
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
                      color="primary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.publicPlace"
                      label="Logradouro"
                      placeholder="Informe a descrição logradouro"
                      prepend-inner-icon="mdi-home-city-outline"
                      color="primary"
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
                      color="primary"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="user.address.number"
                      label="Número"
                      placeholder="Informe o número da residência ou ap"
                      prepend-inner-icon="mdi-billboard"
                      color="primary"
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
                    :disabled="!user.fullName || !user.wallet || !user.cpfCnpj || !user.phoneNumber || !user.address.CEP"
                    class="mr-4 justify-center"
                    @click="saveUser()"
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
import { validationMixin } from 'vuelidate'

import { required, minLength } from 'vuelidate/lib/validators'

import { cpf } from 'cpf-cnpj-validator'
import { cnpj } from 'cpf-cnpj-validator'

export default {
  name: 'AddWallet',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  mixins: [validationMixin],

  validations: {
    user: {
      fullName: {
        required,
        minLength: minLength(10),
      },
      cpfCnpj: {
        required,
        minLength: minLength(14)
      },
      phoneNumber: {
        required,
        minLength: minLength(15),
      },
      address: {
        CEP: { required },
      },
    }
  },

  data () {
    return {
      isLoading: false,
      user: {
        fullName: '',
        wallet: {},
        userPhoto: undefined,
        cpfCnpj: '',
        validcpfCnpj: undefined,
        phoneNumber: '',
        pix: '',
        address: {
          CEP: '',
          city: '',
          state: '',
          district: '',
          publicPlace: '',
          number: null,
          complement: '',
        }
      },
      pixSelected: '',
      pixList: [
        'Telefone',
        'CPF/CNPJ',
      ],
      statesList: [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ],
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
    },

    cpfCnpjErrors () {
      const errors = []
      if (!this.$v.user.cpfCnpj.$dirty) return errors
      !this.user.validcpfCnpj && this.$v.user.cpfCnpj.required && errors.push('O CPF/CNPJ informado não é válido.')
      !this.$v.user.cpfCnpj.required && errors.push('O CPF/CNPJ é obrigatório.')
      !this.$v.user.cpfCnpj.minLength && errors.push('Infome ao menos 14 números.')

      return errors
    },

    fullNameErrors () {
      const errors = []
      if (!this.$v.user.fullName.$dirty) return errors
      !this.$v.user.fullName.required && errors.push('O nome completo é obrigatório.')
      !this.$v.user.fullName.minLength && errors.push('Infome ao menos 10 letras para o nome.')
      return errors
    },
    
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.user.phoneNumber.$dirty) return errors
      !this.$v.user.phoneNumber.required && errors.push('O Telefone é obrigatório.')
      !this.$v.user.phoneNumber.minLength && errors.push('Infome ao menos 2 números para o código e 9 para o telefone.')
      return errors
    },

    CepErrors () {
      const errors = []
      if (!this.$v.user.address.CEP.$dirty) return errors
      !this.$v.user.address.CEP.required && errors.push('O CEP é obrigatório.')
      return errors
    },
  },

  watch: {
    'user.cpfCnpj': 'cpfCnpjValidate',
    'user.phoneNumber': 'changePixKey',
    'user.address.CEP': 'getInfoCep',
    pixSelected: 'verifyPixKey',
  },

  methods: {
    async generateWallet () {
      this.isLoading = true

      try {
        const { data: { data } } = await this.$axios.post('/wallet')
        this.user.wallet = data

      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    cpfCnpjValidate () {

      this.changePixKey()

      if (this.user.cpfCnpj.length < 14) {
        this.user.validcpfCnpj = false

      } else if (this.user.cpfCnpj.length === 14) {
        this.user.validcpfCnpj = cpf.isValid(this.user.cpfCnpj)


      } else if (this.user.cpfCnpj.length > 14 && this.user.cpfCnpj.length === 18) {
        this.user.validcpfCnpj = cnpj.isValid(this.user.cpfCnpj)
      }
    },

    async getInfoCep () {
      this.clearAddress()

      if (this.user.address.CEP.length === 9) {
        let cep = this.user.address.CEP.replace(/[^0-9]/, '')

        const { data } = await this.$axios2.get(`${cep}.json`)

        const searchedCep = data

        if (searchedCep?.status >= 200 && searchedCep?.status <= 207) {
          this.user.address.city = searchedCep.city
          this.user.address.state = searchedCep.state
          this.user.address.publicPlace = searchedCep.address
          this.user.address.district = searchedCep.district
        }
      }
    },

    clearAddress () {
      this.user.address.city = ''
      this.user.address.state = ''
      this.user.address.publicPlace = ''
      this.user.address.district = ''
    },

    changePixKey () {
      this.user.pix = ''
      this.pixSelected = ''
    },

    verifyPixKey () {
      if (this.pixSelected === 'Telefone') {
        this.user.pix = this.user.phoneNumber
      } else if (this.pixSelected === 'CPF/CNPJ') {
        this.user.pix = this.user.cpfCnpj
      }
    },

    async saveUser () {
      this.$v.$touch()

      if (!this.$v.$error) {
        try {
          const res = await this.$axios.post('/users', {
            "name": this.user.fullName,
            "nickname": "Beowolf",
            "phone": this.user.phoneNumber,
            "type_key_pix": this.user.pixSelected,
            "key_pix": this.user.pix,
            "cpf_or_cnpj": this.user.cpfCnpj,
            "wallet_id": this.user.wallet.id,
          })

          this.user.wallet = ''
          this.user.fullName = ''

          this.clearAddress()
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
