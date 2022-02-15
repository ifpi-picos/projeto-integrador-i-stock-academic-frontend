<template>
  <v-container v-if="success" class="alert" fluid>
    <v-row>
      <v-col cols="12" md="5" class="ml-auto">
        <v-alert
          :value="success"
          border="left"
          color="#5EBC64"
          dense
          :outlined="$vuetify.breakpoint.mdAndUp"
          prominent
          :text="$vuetify.breakpoint.mdAndUp"
          type="success"
          transition="scale-transition"
          dismissible
        >
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      message: 'Sua carteira foi cadastrada com sucesso!',
      success: null,
    }
  },

  computed: {
    alert () {
      return this.$store.getters.alert
    }
  },

  watch: {
    alert () {
      this.success = this.$store.getters.alert
    }
  }
}
</script>

<style scoped>
.alert {
  position: absolute;
  right: .3rem;
  top: 0;
  z-index: 1;
}
</style>