<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Criar
          </v-btn>
        </template>
        <v-card>
          <div v-if="isLoading" style="min-height: 4px;">
            <v-progress-linear
              indeterminate
              color="#5EBC64"
            ></v-progress-linear>
          </div>
          <v-card-title>
            <span class="text-h5">Adicionar Saldo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <span>
                    Adicionando {{ deposit }} créditos sua carteira <code>{{ wallet }}</code>
                  </span>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="deposit"
                    label="Valor de depósito"
                    prefix="$"
                    type="number"
                    required
                  >
                    <v-icon slot="prepend-inner" color="#5EBC64">
                      mdi-account-outline
                    </v-icon>
                  </v-text-field>
                </v-col>
                <v-col >
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
  data () {
    return {
      dialog: false,
      isLoading: false,
      wallet: 'sdadasdsadas das da',
      deposit: 0
    }
  },

  methods: {
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
