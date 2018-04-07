<template>
<div>

  <h1 class="display-3">{{hetkeKuu}}</h1>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    >
   
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }} 
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
       
      <td>{{ props.item.nimetus}}</td>
      <td >{{ props.item.kategooria }}</td>
      <td>{{ props.item.hind }} €</td>
      <td>{{props.item.kuupaev }}</td>
      <td >
          
          <v-btn icon class="right mx-0" @click="kustutaToode(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
    
    </template>

    <template slot="no-data"><span style="margin:0 auto;"> Selle kuu andmed puuduvad!</span> </template>
  </v-data-table>
  </div>
</template>
 
<script>
import { tooteBus } from "../../main";
import axios from "axios";
import moment from "moment/src/moment";
export default {
  data() {
    return {
      headers: [
        {
          text: "Nimetus",
          align: "left",
          value: "nimetus"
        },
        { text: "Kategooria", value: "kategooria" },
        { text: "Hind", value: "hind" },
        { text: "Kuu", value: "kuu", sortable: true },
        { text: "Kustuta", value: "kustuta" }
      ],
      items: [],

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
      query: "",
      hetkeKuu: "",
      hetkeKuuNumber: "",
      sorteeriKategooria: ""
    };
  },
  created() {
    let currentKuu = new Date().getMonth();
    let token = JSON.parse(localStorage.getItem("token"));
    let owner =
      token.userId != "5a9ec7f09d58995f40877545" ? '"Jane"' : '"Ermo"';
    this.query = encodeURIComponent(
      `{"where":{"omanik":${owner}, "kuu": ${currentKuu} }}`
    );
    this.hetkeKuu = this.kuud[currentKuu].toUpperCase();

    tooteBus.$on("misKuu", data => {
      this.hetkeKuu = this.kuud[data].toUpperCase();
      this.hetkeKuuNumber = data;

      this.query =
        this.sorteeriKategooria.length > 1
          ? encodeURIComponent(
              `{"where":{"omanik":${owner},"kuu": ${data},"kategooria":"${
                this.sorteeriKategooria
              }" }}`
            )
          : encodeURIComponent(
              `{"where":{"omanik":${owner}, "kuu": ${data} }}`
            );
      this.items = [];
      this.getData(this.query, token);
    });
    tooteBus.$on("misKategooria", data => {
      let kuu =
        this.hetkeKuuNumber.length > 0
          ? this.hetkeKuuNumber
          : new Date().getMonth();

      this.sorteeriKategooria = data;
      this.query = encodeURIComponent(
        `{"where":{"omanik":${owner},"kuu": ${kuu},"kategooria":"${data}" }}`
      );
      this.items = [];
      this.getData(this.query, token);
    });

    let vm = this;
    // tooteBus.$on("toode", toode => {
    //   let query = encodeURIComponent(
    //           `{"where":{"omanik":${owner}, "kuu": ${data} }}`
    //         );
    // });
  },
  methods: {
    consoleLog() {
      console.log(this.items);
    },
    korrasDate(data) {
      let date = new Date(data);

      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let dt = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      let dateFull = dt + "." + month + "." + year;
      return dateFull;
    },
    getData(query, token) {
      let vm = this;
      axios
        .get(
          "http://192.168.0.199:3000/api/tooteds?filter=" +
            query +
            "&access_token=" +
            token.id
        )
        .then(response => {
          // console.log(response.data[0])
          for (let i = 0; i < response.data.length; i++) {
            let formatedDate = vm.korrasDate(response.data[i].date);
            //console.log(formatedDate)

            let toode = {
              date: formatedDate,
              hind: response.data[i].hind,
              kategooria: response.data[i].kategooria,
              kuu: vm.kuud[response.data[i].kuu],
              nimetus: response.data[i].nimetus,
              id: response.data[i].id,
              kuupaev: vm.korrasDate(response.data[i].kuupaev)
            };

            vm.items.push(toode);
          }
        })
        .catch(error => {
          vm.items = [];
        });
    },
    kustutaToode(id) {
      
      let token = JSON.parse(localStorage.getItem("token"));
      const index = this.items.map(function(e) {return e.id;}).indexOf(id);

      let confirm = confirm("Kindel, et tahad kustutada ?");
      if(confirm){
         this.items.splice(index, 1)
          axios.delete(
        "http://192.168.0.199:3000/api/tooteds/" +
          id +
          "?access_token=" +
          token.id
      );
      
      }
     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainContent {
  padding-left: 10px;
}
</style>
