<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.background {
  background-color: #F1F0DE;
}

</style>
