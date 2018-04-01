<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Logi sisse</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Kasutajanimi" type="text" v-model="user"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Parool" id="password" v-model="pass" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import {tooteBus} from "../main"
  export default {
    data: () => ({
      drawer: null,
      user:"",
      pass:""
    }),
    props: {
      source: String
    },
    created(){
      let vm =this;
      if(localStorage.getItem('token')){
        vm.$router.push('/');
      }
    },
    methods:{
        capitalize(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        login(){
          let vm = this;
          
            axios.post('http://192.168.0.199:3000/api/users/login', {username: this.capitalize(this.user), password: this.pass}).then((result)=>{
                //console.log(result.data)
               /* let token =  result.data.id;
                let userId = result.data.userId;
                let created = result.data.created;
                let ttl = result.data.ttl; */
                
                localStorage.setItem('token' , JSON.stringify(result.data));
                tooteBus.$emit('login', 'loggedIn');
                vm.$router.push('/');

            })
        }
    }
  }
</script>