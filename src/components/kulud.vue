<template>
  <v-app  id="inspire" >
   






    <v-content>
      <v-container fluid>
        <v-layout v-bind="binding">
          <v-flex xs12 sm12 md8 lg9 mr-2>
            <tabledata></tabledata>
          </v-flex>
          <v-flex hidden-sm-and-down  xs12 sm12 md4 lg3 style="margin-top:12px">
           <lisatoode></lisatoode>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import tabledata from "./kulud/content";
import lisatoode from "./kulud/lisatoode";
import {tooteBus} from "../main"
  export default {
    components:{
      tabledata,
      lisatoode
    },
    data(){
      return{
        drawer: null,
        appNimi : this.$route.name.toUpperCase()
      }
    },
    props: {
      source: String
    },
    computed:{
       binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.smAndDown) binding.column = true

        return binding
      }
    },
    watch:{
      isAuth: function(){
        if(!this.isAuth){
          this.$router.push("/");
        }
      }
    },
    created(){
      
      tooteBus.$emit('asukoht', this.appNimi);
  
      let vm = this;
      let token  = JSON.parse(localStorage.getItem('token'));
      if(token){
        vm.isAuth = true;
      }else{
        this.$router.push('/login');
      }
      //console.log(this.$route)
    },
    methods:{
      
      logOut(){
        let vm = this;
        localStorage.removeItem('token');
        vm.isAuth = false;
        this.$router.push('/login');
      }
    }
  }
</script>