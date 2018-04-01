<template >
  <div v-if="isAuth" >
      <v-content>
      <v-container fluid fill-height >
        <v-layout row warp xs12 >
            <v-card flat style="width:100%" >
                <v-layout xs12>
                    <v-flex xs12 sm12 md6  mr-2 text-sm-left>
                        <v-card>
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex xs3 >
                                        <v-card-media
                                        style="text-align:left;"
                                        src="https://www.asd-forum.org.uk/forum/uploads/monthly_2017_07/K.png.9ac97765444b8313203391a1356fc8ea.png"
                                        height="125px"
                                        contain
                                        ></v-card-media>
                                    </v-flex>
                                    <v-flex xs9 text-sm-left>
                                        <div >
                                        <div class="headline" >Ermo <span style="float:right; color:red"> {{ermoKokku}} €</span></div>
                                        <v-divider></v-divider>
                                         <v-layout style="width:100%">
                                            <v-flex  v-for="ermoAsjad in itemsErmo"  d-inline-flex >
                                                <v-card flat style="padding:10px;">
                                                    
                                                        <span style="color: #2196F3;">{{ermoAsjad.name}}</span>
                                                       
                                                    
                                                    <div text-color-primary style=" text-align:center;">
                                                        <h4 >{{ermoAsjad.hind}}€</h4>
                                                    </div>
                                                </v-card>
                                            </v-flex>
                                        
                                       </v-layout>
                                         
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                    <!--<v-flex xs12 sm12 md2 mr-2 text-sm-center>
                        
                            <v-card  color="blue-grey darken-2">
                                <v-container fluid grid-list-lg>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            Tere
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                            <v-card  >
                                <v-container mt-2 fluid grid-list-lg>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            Tere
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                    </v-flex> -->
                    <v-flex xs12 sm12 md6 text-sm-right>
                        <v-card>
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                <v-flex xs9>
                                    <div style="text-align:left;">
                                    <div class="headline">Jane  <span style="float:right; color:red"> {{janeKokku}} €</span></div>
                                        <v-divider></v-divider>
                                        <v-layout style="width:100%">
                                            <v-flex  v-for="item in itemsJane" d-inline-flex >
                                                <v-card flat style="padding:10px;">
                                                   
                                                        <span style="color: #2196F3;">{{item.name}}</span>
                                                       
                                                    
                                                    <div text-color-primary style=" text-align:center;">
                                                        <h4 >{{item.hind}}€</h4>
                                                    </div>

                                                </v-card>
                                            </v-flex>
                                            
                                            
                                       </v-layout>
                                       
                                               
                                    </div>
                                </v-flex>
                                <v-flex xs3>
                                    <v-card-media
                                    src="https://www.asd-forum.org.uk/forum/uploads/monthly_2017_07/K.png.9ac97765444b8313203391a1356fc8ea.png"
                                    height="125px"
                                    contain
                                    ></v-card-media>
                                </v-flex>
                                </v-layout>
                            
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import axios from "axios";
import {tooteBus} from '../main';
export default {
  data(){
      return{
          isAuth:true,
          appNimi : this.$route.name.toUpperCase(),
          itemsErmo:[  
          ],
          ermoKokku:"",
          janeKokku:"",
          itemsJane:[

          ]
          
    }
  },
  created(){
      let vm = this;
        //saada asukoht
        tooteBus.$on("logout", ()=>{
            vm.isAuth = false;
        })
        tooteBus.$emit('asukoht', this.appNimi); 
        //PÄRINGU JAOKS VAJALIK TOKEN JA OMANIK + PÄRING
      let token  = JSON.parse(localStorage.getItem('token'));
      let owner = token.userId != '5a9ec7f09d58995f40877545' ? "Jane" : "Ermo";
     let users  = ['Jane', 'Ermo'];
     //PÄRING 
    let currentMonth = new Date().getMonth();
     //let kategooriad = ['auto','Meelelahutus','Toidukaup', 'Muu', 'Korter/kommunaalid'];
     for(let i = 0; i< users.length;i++ ){
         axios.get('http://192.168.0.199:3000/api/tooteds/summa?owner='+users[i]+'&kuu='+currentMonth+'&access_token='+token.id).then((response)=>{
              
                let res  = response.data.kokku
                if(users[i] == "Ermo"){
                    vm.itemsErmo.push(
                     {hind: parseFloat(res.korter).toFixed(2), name:"KORTER"},
                     {hind: parseFloat(res.auto).toFixed(2), name:"AUTO"},
                     {hind: parseFloat(res.toit).toFixed(2), name:"TOIT"},
                     {hind: parseFloat(res.meelelahutus).toFixed(2), name:"MEELELAHUTUS"},
                     {hind: parseFloat(res.muu).toFixed(2), name:"MUU"}
                     )
                     vm.ermoKokku =  res.koguSumma;
                }else{
                    vm.itemsJane.push(
                      {hind: parseFloat(res.korter).toFixed(2), name:"KORTER"},
                     {hind: parseFloat(res.auto).toFixed(2), name:"AUTO"},
                     {hind: parseFloat(res.toit).toFixed(2), name:"TOIT"},
                     {hind: parseFloat(res.meelelahutus).toFixed(2), name:"MEELELAHUTUS"},
                     {hind: parseFloat(res.muu).toFixed(2), name:"MUU"}
                     )
                     vm.janeKokku =  res.koguSumma;
                }
                 
           
           
           
        }).catch((error)=>{
         // console.log(error)
         console.log(error)
        })
     }
        
  }
}
</script>
<style scoped>
.tooteHind{
    font-size: 1em;
}
</style>
