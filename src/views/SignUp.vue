<template>
  <v-container fluid >
        <v-card
          class="px-3 py-16"
          elevation="4">
          <v-card-title class="justify-center"><h1> SignUp </h1></v-card-title>
          <v-form v-model="valid" class="mt-10">
            <v-row class="justify-center">
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  label="Sobrenome"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="justify-center mb-10">
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12"
                md="4">
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
                  :counter="8"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="3">
                <v-hover
                  v-slot="{ hover }">
                  <v-btn
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    block
                    color="success"
                    class="mr-4 justify-center"
                    @click="validate"
                    to="/home"
                  >
                    Cadastrar
                  </v-btn>
                </v-hover>
              </v-col>

               <v-col cols="3">
                <v-hover
                  v-slot="{ hover }">
                  <v-btn
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    block
                    color="error"
                    class="mr-4 justify-center"
                    @click="validate"
                    to="/"
                  >
                    Cancelar
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-form> 
        </v-card>
  </v-container>  
</template>

<script>

export default {
  name: 'SignUp',
  data () {
    return {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
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

.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align:middle;
  display:table-cell;
}

</style>