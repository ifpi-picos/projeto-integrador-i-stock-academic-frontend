<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-dialog
          persistent
          transition="dialog-top-transition"
          max-width="800"
          v-model="showInfo"
        >
          <template v-slot:default="showInfo">
            <v-card>
              <v-toolbar
                color="#887725"
                dark
              >
              <v-card-title>
                Detalhes da carteira <i class="ml-1"> {{ userInfo.wallet.wallet_code }} </i>
              </v-card-title>
            </v-toolbar>
              <v-card-text class="py-6">
                <v-row>
                  <v-col cols="12" class="text-center">
                    <span class="text-h5">Dados Pessoais</span>
                  </v-col>
                </v-row>

                <v-divider class="my-1"></v-divider>

                <v-row>
                  <v-col cols="12" md="6">
                    <span class="text-h6 ">
                      <span class="color">Nome:</span>
                      {{ userInfo.name }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="6">
                    <span class="text-h6 ">
                      <span class="color">CPF/CNPJ:</span>
                      {{ userInfo.cpf_or_cnpj }}
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <span class="text-h6 ">
                      <span class="color">Celular:</span>
                      {{ userInfo.phone }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="3">
                    <span class="text-h6 ">
                      <span class="color">Tipo Pix:</span>
                      {{ userInfo.type_key_pix }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="3">
                    <span class="text-h6 ">
                      <span class="color">Pix:</span>
                      {{ userInfo.key_pix }}
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="text-center">
                    <span class="text-h5">Endereço</span>
                  </v-col>
                </v-row>

                <v-divider class="my-1"></v-divider>

                <v-row>
                  <v-col cols="12" md="4">
                    <span class="text-h6 ">
                      <span class="color">CEP:</span>
                      {{ userInfo.zip_code}}
                    </span>
                  </v-col>

                  <v-col cols="12" md="6">
                    <span class="text-h6 ">
                      <span class="color">Cidade:</span>
                      {{ userInfo.city }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="2">
                    <span class="text-h6 ">
                      <span class="color">Estado:</span>
                      {{ userInfo.state }}
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <span class="text-h6 ">
                      <span class="color">Bairro:</span>
                      {{ userInfo.district}}
                    </span>
                  </v-col>

                  <v-col cols="12" md="6">
                    <span class="text-h6 ">
                      <span class="color">Logradouro:</span>
                      {{ userInfo.public_place }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="2">
                    <span class="text-h6 ">
                      <span class="color">Número:</span>
                      {{ userInfo.state }}
                    </span>
                  </v-col>

                  <v-col cols="12">
                    <span class="text-h6 ">
                      <span class="color">Completento:</span>
                      {{ userInfo.complement }}
                    </span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    color="#5ebc64"
                    dark
                    :outlined="!hover"
                    :elevation="hover ? 4 : 0"
                    @click="showInfo = false"
                  >
                    OK
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'InfoModal',
  props: {
    showInfo: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: [],
      default: '',
    }
  },

  computed: {
    /* showInfo: {
      get() {
        return this.openInfo
      },
      set(newValue) {
        this.$emit('changeStateModal', newValue)
      },
    }, */
  },
}
</script>