<template>
  <v-app>
    <v-main>
      <v-container fluid style="padding: 0">
        <v-row  no-gutters>
          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="6" class="align-center justify-center align-content-center ">
            <v-img class="image-leaf" src="../../public/img/leaf.jpeg"></v-img>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :class="$vuetify.breakpoint.smAndDown ? 'bg-login-mobile' : ''"
          >
            <v-card
              class="login px-6 py-16"
              :class="$vuetify.breakpoint.smAndDown ? 'background-form' : ''"
              elevation="0"
            >
              <div class="">
                <v-card-title style="color: #887725 " class="justify-center"><h1> Login </h1></v-card-title>

                <v-form
                  @submit.stop.prevent="login()"
                  class="mt-16"
                  ref="form"
                  lazy-validation
                >
                  <v-col cols="12" md="8"  class="mx-auto">
                    <v-text-field
                      autocomplete="false"
                      v-model="email"
                      label="E-mail"
                      required>
                      <v-icon
                        slot="prepend-inner"
                        color="#5EBC64">
                        mdi-at
                      </v-icon>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="8"  class="mx-auto">
                    <v-text-field
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      v-model="password"
                      name="input-10-2"
                      label="Senha"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="show = !show"
                      required>
                      <v-icon
                        slot="prepend-inner"
                        color="#5EBC64">
                        mdi-lock-outline
                      </v-icon>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="8" class="mx-auto text-right" v-if="false">
                    <router-link style="color: #887725" to="signup">
                      ou Cadastre-se
                    </router-link>
                  </v-col>

                  <v-col cols="12" md="8" class="mx-auto px-0">
                    <v-card-actions>
                      <v-hover
                        class="button"
                        v-slot="{ hover }">
                        <v-btn
                          type="submit"
                          large
                          :elevation="hover ? 16 : 2"
                          :outlined="hover ? false : true"
                          block
                          color="success"
                        >
                          Entrar
                        </v-btn>
                      </v-hover>
                    </v-card-actions>
                  </v-col>
                </v-form>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },

  methods: {
    async login () {
      try {
        const { data: { data } } = await this.$axios.post('/admin/auth', { email: this.email, password: this.  password })

        this.$storage.setItem(
          "application-token",
          data.token
        );

        this.$router.push({name: 'Default'})
      } catch (err) {
        console.error(err.data.data.message)
      }
    }
  }
}
</script>


<style scoped>
.my-class {
  background-color: #000;
  font-size: 14px;
}

.login {
  min-height: 100vh;
}

.button {
  display: flex;
  position: relative;
  top: 5rem;
}

.image-leaf {
  object-fit: contain;
  min-height: 100vh;
}

a {
  text-decoration: none;
}

.theme--light.v-input, .theme--light.v-input input, .theme--light.v-input textarea {
  color: #5EBC64 !important;
}

.bg-login-mobile {
  background: url("../../public/img/leaf.jpeg");
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
}

.background-form {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
}
</style>