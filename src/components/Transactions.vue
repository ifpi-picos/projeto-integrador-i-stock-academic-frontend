<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
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
          <div v-if="isLoading" style="min-height: 4px">
            <v-progress-linear
              indeterminate
              color="#5EBC64"
            ></v-progress-linear>
          </div>
          <v-card-title>
            <span v-if="dataChangeBalance.typeChange === 'deposit'" class="text-h5"
              >Adicionar Saldo</span
            >
            <span v-else class="text-h5">Retirar Saldo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <span>
                    {{
                      dataChangeBalance.typeChange === "deposit"
                        ? "Adicionando"
                        : "Removendo"
                    }}
                    {{ collect.deposit }} créditos na sua carteira <br>
                    <code>{{
                      dataChangeBalance.wallet
                        ? dataChangeBalance.wallet.wallet_code
                        : ""
                    }}</code>
                  </span>
                </v-col>
              </v-row>

              <v-form onsubmit="">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="collect.employeeName"
                      :error-messages="employeeNameErrors"
                      label="Nome do funcionário*"
                      placeholder="Nome do funconário que está preenchendo"
                      color="primary"
                      prepend-inner-icon="mdi-account-outline"
                      required
                      @change="$v.collect.employeeName.$touch()"
                      @blur="$v.collect.employeeName.$touch()"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-select
                      v-model="collect.material"
                      :error-messages="materialErrors"
                      :items="materialsList"
                      label="Material*"
                      color="primary"
                      prepend-inner-icon="mdi-recycle"
                      required
                      @change="$v.collect.material.$touch()"
                      @blur="$v.collect.material.$touch()"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="collect.kgPrice"
                      :error-messages="kgPriceErrors"
                      label="Preço por Kg*"
                      placeholder="Informe o preço do material"
                      prepend-inner-icon="mdi-currency-brl"
                      type="number"
                      color="primary"
                      required
                      @change="$v.collect.kgPrice.$touch()"
                      @blur="$v.collect.kgPrice.$touch()"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="collect.kgQuantity"
                      :error-messages="kgQuantityErrors"
                      label="Kg recolhidos*"
                      placeholder="Informe a quantidade em Kg"
                      prepend-inner-icon="mdi-weight-kilogram"
                      type="number"
                      color="primary"
                      required
                      @change="$v.collect.kgQuantity.$touch()"
                      @blur="$v.collect.kgQuantity.$touch()"
                    />
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="collect.deposit"
                      :label="
                        dataChangeBalance.typeChange === 'deposit'
                          ? 'Valor de depósito'
                          : 'Valor de retirada'
                      "
                      prepend-inner-icon="mdi-currency-brl"
                      type="number"
                      color="primary"
                      :readonly="dataChangeBalance.typeChange === 'deposit'"
                      required
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>

            <small>* Campos Obrigatórios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-hover v-slot="{ hover }">
              <v-btn
                small
                :elevation="hover ? 16 : 0"
                :outlined="hover ? false : true"
                color="success"
                tile
                class="mr-4 justify-center"
                :disabled="$v.collect.$error"
                @click.native="saveTransation()"
              >
                Salvar
              </v-btn>
            </v-hover>
            <v-hover v-slot="{ hover }">
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
import { validationMixin } from 'vuelidate'

import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddWallet',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    dataChangeBalance: {
      type: Object,
      default: {
        wallet: {},
        typeChange: '',
      },
    },
  },

  mixins: [validationMixin],

  validations: {
    collect: {
      employeeName: {
        required,
        minLength: minLength(10),
      },
      material: { required },
      kgPrice: { required },
      kgQuantity: { required },
    }
  },

  data () {
    return {
      isLoading: false,
      
      collect: {
        employeeName: '',
        material: '',
        kgPrice: undefined,
        kgQuantity: undefined,
        deposit: 0,
      },
      materialsList: ['Ferro', 'Alumínio', 'Cobre', 'Pet', 'Leitoso', 'Papelão'],
      
    };
  },

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("changeValue", newValue)
      },
    },

    employeeNameErrors () {
      const errors = []
      if (!this.$v.collect.employeeName.$dirty) return errors
      !this.$v.collect.employeeName.required && errors.push('O nome completo é obrigatório.')
      !this.$v.collect.employeeName.minLength && errors.push('Infome ao menos 10 letras para o nome.')
      return errors
    },

    materialErrors () {
      const errors = []
      if (!this.$v.collect.material.$dirty) return errors
      !this.$v.collect.material.required && errors.push('O material é obrigatório.')
      return errors
    },
    
    kgPriceErrors () {
      const errors = []
      if (!this.$v.collect.kgPrice.$dirty) return errors
      !this.$v.collect.kgPrice.required && errors.push('O Preço por quilo é obrigatório.')
      return errors
    },

    kgQuantityErrors () {
      const errors = []
      if (!this.$v.collect.kgQuantity.$dirty) return errors
      !this.$v.collect.kgQuantity.required && errors.push('A quantidade de quilos é obrigatório.')
      return errors
    }
  },

  watch: {
    'collect.kgPrice': 'calcDeposit',
    'collect.kgQuantity': 'calcDeposit',
  },

  methods: {
    calcDeposit () {
      this.collect.deposit = this.collect.kgPrice * this.collect.kgQuantity
    },

    async saveTransation () {
      this.$v.$touch()
      if (!this.$v.$error) {
        try {
          await this.$axios.post('/transactions', {
            type_operation: this.dataChangeBalance.typeChange,
            wallet_id: this.dataChangeBalance.wallet.id,
            total_value: this.collect.deposit,
            responsible: this.collect.employeeName,
            kgs: this.collect.kgQuantity,
            price_kg: this.collect.kgPrice,
            type_material: this.collect.material,
          })

          this.$emit('updateBalance')
          this.dialog = false
        } catch (err) {
          console.error(err)
        }
      }
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin-right: 0.5rem;
  margin-left: -0.5rem;
}

.change-btn-color {
  color: #fff !important;
  background-color: #5ebc64;
  border-color: #5ebc64;
  position: relative;
  bottom: 2px;
}

code {
  color: #887725 !important;
  background-color: #fff !important;
  font-size: 20px !important;
}
</style>
