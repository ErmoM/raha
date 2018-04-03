<template>
  <div style="margin-top:10px;">
      <v-card >
          <v-flex xs12>
            <v-card-title> <h4>Kulud kokku</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-tile v-for="(value, key) in andmed">
                    <v-list-tile-content>{{key.toUpperCase()}}</v-list-tile-content>
                    <v-list-tile-content class="align-end"> {{parseFloat(value).toFixed(2)}} €</v-list-tile-content>
                </v-list-tile>
            </v-list>
            
          </v-flex>
      </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
      return{
          andmed:{}
      }
  },
  created(){
        let token = JSON.parse(localStorage.getItem("token"));
        let owner = token.userId != "5a9ec7f09d58995f40877545" ? "Jane" : "Ermo";
        let currentMonth = new Date().getMonth() < 8 ? new Date().getMonth() -1 : new Date().getMonth() ;

        axios.get("http://192.168.0.199:3000/api/tooteds/summa?owner=" +
            owner +
            "&kuu=" +
            currentMonth +
            "&access_token=" +
            token.id).then(response => {
            this.andmed = response.data.kokku
                
            } )
  }
}
</script>
