<template>
  
      <v-layout row wrap style="margin-top:63px; ">
            <v-flex xs12>
                <v-card >
                    <v-layout style="padding-left:5px; padding-right:5px;" >
                        <v-flex xs7 md12 d-flex>
                        <v-text-field
                        style="margin-right:5px"
                        name="input-1-3"
                        label="Nimetus"
                        single-line
                        prepend-icon="fingerprint"
                        v-model="nimetus"
                        required
                        >
                    </v-text-field>
                    </v-flex> 
                    <v-flex xs5>
                        <v-text-field
                        name="input-1-3"
                        label="Hind"
                        single-line
                        type="number"
                        append-icon="euro_symbol"
                        v-model="hind"
                        required
                        >
                    </v-text-field>
                    </v-flex>
                    </v-layout>
                    <v-layout style="padding-left:5px; padding-right:5px;">
                        <v-flex xs12 md12>
                            <v-select
                                :items="kategooriad"
                                v-model="kategooriaValik"
                                label="Kategooria"
                                single-line
                                auto
                                prepend-icon="redeem"
                                hide-details
                                required
                                ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout style="padding-left:5px; padding-right:5px;">
                        <v-flex xs12>
                             <v-menu
                                ref="menu"
                                
                                :close-on-content-click="false"
                                v-model="menu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                max-width="290px"
                                min-width="290px"
                                :return-value.sync="date"
                            >
                                <v-text-field
                                slot="activator"
                                label="vali kuu"
                                v-model="date"
                                prepend-icon="event"
                                ></v-text-field>
                                <v-date-picker
                                type="month"
                                v-model="date"
                                locale="et"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Tühista</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                    <v-layout style="padding-left:5px; padding-right:5px;">
                        <v-btn v-if="saabLisada" block color="primary" @click="lisaToode()" >VALMIS</v-btn>
                        <v-btn v-else block disabled color="primary" >VALMIS</v-btn>
                    </v-layout>
                    
                </v-card>
                <v-card style="margin-top:10px;">
                    <v-flex xs12 style="padding:5px;" >
                      
                                <v-select
                                :items="kuud"
                                v-model="sorteeriKuu"
                                label="Vali kuu"
                                single-line
                                item-value="nr"
                                item-text = "nimi"
                                auto
                                prepend-icon="event"
                                hide-details
                                
                                ></v-select> 
                                <v-select
                                :items="kategooriad"
                                v-model="sorteeriKategooria"
                                label="Vali kategooria"
                                single-line
                                auto
                                prepend-icon="event"
                                hide-details
                                
                                ></v-select>
                                <v-btn block class="primary" @click="resetSortValikud()">Reseti valikud</v-btn> 
                        </v-flex>
                </v-card>
                <kokku></kokku>
            </v-flex>
        
      </v-layout>
</template>
<script>
import { tooteBus } from "../../main";
import axios from "axios";
import kokku from "./kokku"
export default {
    components:{
        kokku
    },
  data() {
    return {
      kategooriad: [
        "Auto",
        "Toidukaup",
        "Korter/kommunaalid",
        "Meelelahutus",
        "Muu",
        "Säästud"
      ],
      date: null,
      sorteeriKategooria: "",
      menu: false,
      modal: false,
      sorteeriKuu: "",
      kategooriaValik: "",
      thisMonth: "",
      hind: "",
      nimetus: "",
      date: "",
      validateToode: { nimi: false, hind: false, kategooria: false },
      kuud: [
        { nimi: "Jaanuar", nr: 0 },
        { nimi: "Veebruar", nr: 1 },
        { nimi: "Märts", nr: 2 },
        { nimi: "Aprill", nr: 3 },
        { nimi: "Mai", nr: 4 },
        { nimi: "Juuni", nr: 5 },
        { nimi: "Juuli", nr: 6 },
        { nimi: "August", nr: 7 },
        { nimi: "September", nr: 8 },
        { nimi: "Oktoober", nr: 9 },
        { nimi: "November", nr: 10 },
        { nimi: "Detsember", nr: 11 }
      ]
    };
  },
  computed: {
    saabLisada: function() {
      if (
        this.validateToode.nimi &&
        this.validateToode.hind &&
        this.validateToode.kategooria
      ) {
        return true;
      }
    }
  },
  watch: {
    nimetus: function() {
      if (this.nimetus.length > 1) {
        this.validateToode.nimi = true;
      } else {
        this.validateToode.nimi = false;
      }
    },
    hind: function() {
      if (this.hind.length > 0) {
        this.validateToode.hind = true;
      } else {
        this.validateToode.hind = false;
      }
    },
    kategooriaValik: function() {
      if (this.kategooriaValik.length > 1) {
        this.validateToode.kategooria = true;
      } else {
        this.validateToode.kategooria = false;
      }
    },
    sorteeriKuu: function() {
      this.valiKuu(this.sorteeriKuu);
    },
    sorteeriKategooria: function() {
      this.valiKategooria(this.sorteeriKategooria);
    }
  },
  created() {
    this.thisMonth = new Date().toJSON().slice(0, 7);
    let monthNumber = new Date().getDate() < 8 ? new Date().getMonth()-1 : new Date().getMonth();
    this.sorteeriKuu = this.kuud[monthNumber].nr;
  },
  methods: {
    getToken() {
      let token = JSON.parse(localStorage.getItem("token"));
      return {
        token: token.id,
        user: token.userId
      };
    },
    resetToode() {
      this.hind = "";
      this.nimetus = "";
      this.kategooriaValik = "";
    },
    lisaToode() {
      let vm = this;
      let hind = this.hind;
      let tooteNimi = this.nimetus;
      let kategooria = this.kategooriaValik;
    //   let dateStringina = new Date().toLocaleDateString("et-ET", {
    //     year: "numeric",
    //     month: "numeric",
    //     day: "numeric"
    //   });

      let kuu = this.sorteeriKuu;//new Date().getMonth();
      let owner = this.getToken().user;
      if (owner == "5a9ec7f09d58995f40877545") {
        owner = "Ermo";
      } else {
        owner = "Jane";
      }
      //console.log(owner);
      //let kuu = this.date.length > 1 ? this.date : this.thisMonth ;
      let toode = {
        hind: parseFloat(this.hind),
        nimetus: this.nimetus,
        kategooria: this.kategooriaValik,
        kuu: kuu,
        //kuupaev: dateStringina,
        omanik: owner
      };

      

      axios
        .post(
          "http://192.168.0.199:3000/api/tooteds?access_token=" +
            this.getToken().token,
          toode
        )
        .then(response => {
          vm.resetToode();

          tooteBus.$emit("misKuu", vm.sorteeriKuu );
          //console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    valiKuu(i) {
      tooteBus.$emit("misKuu", i);
    },
    valiKategooria(sordiKategooria) {
      tooteBus.$emit("misKategooria", sordiKategooria);
    },
    resetSortValikud(){
        let Month =  new Date().getDate() < 8 ? new Date().getMonth()-1 : new Date().getMonth();
        this.sorteeriKuu = this.kuud[Month];
        this.sorteeriKategooria = "";
        tooteBus.$emit("misKuu",Month);
        tooteBus.$emit("misKategooria", "")
    }
  }
};
</script>
<style scoped>

</style>
