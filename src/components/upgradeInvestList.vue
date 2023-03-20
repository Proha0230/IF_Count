<template >
    
    <carousel :items-to-show="3" :itemsToScroll="3" v-if="$store.state.loading === false">
      <slide v-for="item in UpgradeInvest" :key="item" :slide-width='100' >
          <upgradeButton
          :priceUpgrade="item.priceUpgrade"
          :nameUpgrade="item.nameUpgrade"
          :classUpgrade="item.classUpgrade"
          :btnOff ="btnOff(item.id)"
          @upgrade="investUpgrade(item.funcParam1, item.funcParam2, item.id)"
          ></upgradeButton> 
      </slide>
  
      <template #addons>
        <navigation />
      </template>
    </carousel>
  
  
  </template>
  
  <script>
  import upgradeButton from './upgradeButton.vue';
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  
  
  export default{
  setup(){
  
  const store = useStore()
  const dollarCount = ref()
  
  
  
  const UpgradeInvest = ref([
  {id:0, priceUpgrade:'500000 $', nameUpgrade:'+10% $/sec', classUpgrade:'Invest1', funcParam1: 500000, funcParam2: 0.1, clicked: false},
  {id:1, priceUpgrade:'1 млн $', nameUpgrade:'+20% $/sec', classUpgrade:'Invest2', funcParam1: 1000000, funcParam2: 0.2, clicked: false},
  {id:2, priceUpgrade:'2 млн $', nameUpgrade:'+30% $/sec', classUpgrade:'Invest3', funcParam1: 2000000, funcParam2: 0.3, clicked: false},
  {id:3, priceUpgrade:'4 млн $', nameUpgrade:'+40% $/sec', classUpgrade:'Invest4', funcParam1: 4000000, funcParam2: 0.4, clicked: false}, 
  {id:4, priceUpgrade:'8 млн $', nameUpgrade:'+50% $/sec', classUpgrade:'Invest5', funcParam1: 8000000, funcParam2: 0.5, clicked: false},
  {id:5, priceUpgrade:'16 млн $', nameUpgrade:'+60% $/sec', classUpgrade:'Invest6', funcParam1: 16000000, funcParam2: 0.6, clicked: false},
  {id:6, priceUpgrade:'32 млн $', nameUpgrade:'+70% $/sec', classUpgrade:'Invest7', funcParam1: 32000000, funcParam2: 0.7, clicked: false},
  {id:7, priceUpgrade:'64 млн $', nameUpgrade:'+80% $/sec', classUpgrade:'Invest8', funcParam1: 64000000, funcParam2: 0.8, clicked: false},
  {id:8, priceUpgrade:'128 млн $', nameUpgrade:'+90% $/sec', classUpgrade:'Invest9', funcParam1: 128000000, funcParam2: 0.9, clicked: false},
  {id:9, priceUpgrade:'256 млн $', nameUpgrade:'+100% $/sec', classUpgrade:'Invest10', funcParam1: 256000000, funcParam2: 1, clicked: false},
  ])
  
  function investUpgrade(money, InvestProcent, id){
      if(dollarCount.value > money){
      dollarCount.value -= money
      store.state.Count = dollarCount.value
      store.state.InvestProcent += InvestProcent
      UpgradeInvest.value[id].clicked = true
      store.state.arrayWithObjectInvestBtn = UpgradeInvest.value
      }
  }
  
  function btnOff(id){
      if(UpgradeInvest.value[id].clicked === true){
          return true
      } else {
          return false
      }
  }
  
  function loadingInvestBtn(){ 
    if(store.state.arrayWithObjectInvestBtn){
    UpgradeInvest.value = store.state.arrayWithObjectInvestBtn
    store.state.loading = false
    } else {
    store.state.loading = false
    console.log('Нет сохранений')
    }
}

  
setTimeout( async ()=>{
loadingInvestBtn()
}, 1000)
  
watch(() => 
store.state.Count,
() => {
dollarCount.value = store.state.Count
})

return{investUpgrade, UpgradeInvest, btnOff}

},
  components:{upgradeButton, Carousel, Slide, Pagination, Navigation}
  
  }
  
  </script>

<style>


.Invest1{
    background-image: url(../assets/10.png);
}
.Invest2{
    background-image: url(../assets/20.png);
}
.Invest3{
    background-image: url(../assets/30.png);
}
.Invest4{
    background-image: url(../assets/40.png);
}
.Invest5{
    background-image: url(../assets/50.png);
}
.Invest6{
    background-image: url(../assets/60.png);
}
.Invest7{
    background-image: url(../assets/70.png);
}
.Invest8{
    background-image: url(../assets/80.png);
}
.Invest9{
    background-image: url(../assets/90.png);
}
.Invest10{
    background-image: url(../assets/100.png);
}

</style>