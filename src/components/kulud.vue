<template>
  <v-app  id="inspire" style="background-color:#f1efef">
   
    <v-content>
      <v-container grid-list-xl>
        
        <v-layout v-bind="binding">
          <v-flex xs12 sm12 md9  style="margin-right:10px;">
            <tabledata></tabledata>
          </v-flex>
          <v-flex xs12 sm12 md3>
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