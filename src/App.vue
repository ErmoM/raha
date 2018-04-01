<template>
  <v-app>
    <navs></navs>
    <transition name="fade-transition" mode="out-in">
      <router-view/>
    </transition>
    
  </v-app>
</template>

<script>
import navs from "./components/navs";
export default {
  components:{
    navs
  },
  name: 'App'
}
</script>

<style>

</style>
