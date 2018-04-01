<template >
<div v-if="isAuth">
   <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="routeName(appNimim)" to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Pealeht</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="routeName(appNimim)" to="/kulud">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
                Kulud
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="routeName(appNimim)" to="/kalender">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Kalender</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark  app >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{appNimim}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
          <v-btn flat>{{logija}}</v-btn>
        </v-toolbar-items>
      <v-toolbar-items >
          <v-btn flat @click="logOut()">Logi välja</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    </div>
</template>


<script>
import {tooteBus} from '../main'
  export default {
   
    data(){
      return{
        drawer: false,
        isAuth : false,
        appNimim : this.$route.name.toUpperCase(),
        logija:""
      }
    },
    props: {
      source: String
    },
    created(){
      let vm = this;
       tooteBus.$on('asukoht', (asukoht) =>{
         this.appNimim = asukoht;
       }),
       tooteBus.$on('login',()=>{
         vm.isAuth = true;
       })
        
        let token  = JSON.parse(localStorage.getItem('token'));
      if(token){
        vm.isAuth = true;
      }else{
        vm.$router.push('/login');
      }
        
        this.logija = token.userId == '5a9ec7f09d58995f40877545' ? "Ermo" : "Jane";
      
        
    },
    methods:{
      logOut(){
        tooteBus.$emit("logout","out");
        let vm = this;
        vm.isAuth = false;
        localStorage.removeItem('token');

        vm.$router.push('/login');
      },
      routeName(appNimim){  
          this.appNimim = this.appNimim
      }
    }
  }
</script>


