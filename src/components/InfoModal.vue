<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-dialog
          v-model="showInfo"
          persistent
          transition="dialog-top-transition"
          max-width="800"
          :fullscreen="$vuetify.breakpoint.smAndDown"
        >
          <template v-slot:default="showInfo">
            <v-card>
              <v-toolbar
                color="#887725"
                dark
                :height="$vuetify.breakpoint.smAndDown ? '100' : '62'"
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

                <v-divider class="my-2"></v-divider>

                <v-row align="center" justify="center">
                  <v-col cols="12" md="6" class="pb-0">
                    <v-img
                      :src="userInfo.user_photo"
                      width="70px"
                      height="70px"
                      class=" rounded-pill elevation-10 mx-auto"
                    />
                  </v-col>
                </v-row>

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
                  <v-col cols="12" md="5">
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

                  <v-col cols="12" md="4">
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

                <v-divider class="my-2"></v-divider>

                <v-row>
                  <v-col cols="12" md="4">
                    <span class="text-h6 ">
                      <span class="color">CEP:</span>
                      {{ userInfo.address.zip_code}}
                    </span>
                  </v-col>

                  <v-col cols="12" md="5">
                    <span class="text-h6 ">
                      <span class="color">Cidade:</span>
                      {{ userInfo.address.city }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="3">
                    <span class="text-h6 ">
                      <span class="color">Estado:</span>
                      {{ userInfo.address.state }}
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <span class="text-h6 ">
                      <span class="color">Bairro:</span>
                      {{ userInfo.address.district}}
                    </span>
                  </v-col>

                  <v-col cols="12" md="5">
                    <span class="text-h6 ">
                      <span class="color">Logradouro:</span>
                      {{ userInfo.address.public_place }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="3">
                    <span class="text-h6 ">
                      <span class="color">Número:</span>
                      {{ userInfo.address.number }}
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="5">
                    <span class="text-h6 ">
                      <span class="color">Rua:</span>
                      {{ userInfo.address.street }}
                    </span>
                  </v-col>
                   
                  <v-col cols="12" md="7">
                    <span class="text-h6 ">
                      <span class="color">Complemento:</span>
                      {{ userInfo.address.complement }}
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
                    @click="showInfo.value = false"
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
    openInfo: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: [],
      default: '',
    }
  },

  computed: {
    showInfo: {
      get() {
        return this.openInfo
      },
      set(newValue) {
        this.$emit('update:openInfo', newValue)
      },
    },
  },
}
</script>

<style scoped>
.color {
  color: #c3ab6a;
}
</style>