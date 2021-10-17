<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="align-center justify-center align-content-center ">
        <v-img class="image-leaf" src="../../public/img/leaf.jpeg"></v-img>
      </v-col>
      <v-col cols="12" md="6" class="align-center justify-center  px-3 py-16 login">
        <v-card
          elevation="0">
          <v-card-title class="justify-center"><h1> Login </h1></v-card-title>
          <v-form
            class="mt-16"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-col cols="8" class="mx-auto">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>

             <v-col cols="8" class="mx-auto">
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                v-model="sigin"
                name="input-10-2"
                label="Senha"
                hint="At least 8 characters"
                class="input-group--focused"
                @click:append="show = !show"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="8" class="mx-auto text-right">
              <router-link to="signup">
                ou Cadastre-se
              </router-link>
            </v-col>

             <v-col cols="8" class="mx-auto">
              <v-hover
                class="button"
                v-slot="{ hover }">
                <v-btn
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                  block
                  :disabled="!valid"
                  color="success"
                  @click="validate"
                  to="/"
                >
                  Entrar
                </v-btn>
              </v-hover>
             </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      sigin: '',
      show: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
    }
  },
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
</style>