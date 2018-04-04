<template>
  <div style="margin-top:10px;">
      <v-card >
          <v-flex xs12>
            <v-card-title> <h4>Kulud kokku : {{ kuuNimetus }}</h4></v-card-title>
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
import { tooteBus } from "../../main";
export default {
  data() {
    return {
      andmed: {},
      kuu: parseInt(""),
      kuud: [
        "Jaanuar",
        "Veebruar",
        "Märts",
        "Aprill",
        "Mai",
        "Juuni",
        "Juuli",
        "August",
        "September",
        "November",
        "Detsember"
      ],
      kuuNimetus : ""
    };
  },
  created() {
    let vm = this;
    let token = JSON.parse(localStorage.getItem("token"));
    let owner = token.userId != "5a9ec7f09d58995f40877545" ? "Jane" : "Ermo";
    let currentMonth =
      new Date().getDate() < 8
        ? new Date().getMonth() - 1
        : new Date().getMonth();
    this.kuu = currentMonth;
    this.kuuNimetus = this.kuud[currentMonth];

    axios
      .get(
        "http://192.168.0.199:3000/api/tooteds/summa?owner=" +
          owner +
          "&kuu=" +
          vm.kuu +
          "&access_token=" +
          token.id
      )
      .then(response => {
        this.andmed = response.data.kokku;
      });
    tooteBus.$on("misKuu", data => {
      vm.andmed = [];
      vm.kuu = data;
      vm.getData(token, vm.kuu, owner);
    });
  },
  methods: {
    getData(token, kuu, owner) {
    this.kuuNimetus = this.kuud[kuu]
      axios
        .get(
          "http://192.168.0.199:3000/api/tooteds/summa?owner=" +
            owner +
            "&kuu=" +
            kuu +
            "&access_token=" +
            token.id
        )
        .then(response => {
          this.andmed = response.data.kokku;
        });
    }
  }
};
</script>
