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
            <span class="text-h5">Criar Carteira</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-alert
                :value="alert"
                border="left"
                color="#5EBC64"
                dense
                outlined
                prominent
                text
                type="success"
                transition="scale-transition">
                {{ message }}
              </v-alert>
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
                    O número da sua carteira é <code>{{ wallet }}</code>
                  </span>
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
                class="mr-4 justify-center"
                @click="dialog = false"
              >
                Cadastrar
              </v-btn>
            </v-hover>
            <v-hover
              v-slot="{ hover }">
              <v-btn
                small
                :elevation="hover ? 16 : 0"
                :outlined="hover ? false : true"
                color="error"
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
      message: '',
      wallet: '',
      alert: false
    }
  },

  methods: {
    generateWallet () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.message = 'Sua carteira foi cadastrada com sucesso!'
        this.wallet = 'sdadasdsadas das da'
        this.alert = true
      }, 5000)
      this.alert = false
      
    } 
  }
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
