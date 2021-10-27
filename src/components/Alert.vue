<template>
  <v-container class="alert">
    <v-row>
      <v-col cols="5" class="ml-auto">
        <v-alert
          :value="success"
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
  left: 7.5rem;
  top: 0;
  z-index: 1;
}
</style>