<template >
    
  <carousel :items-to-show="3" :itemsToScroll="3" v-if="$store.state.loading === false">
    <slide v-for="item in UpgradesBtn" :key="item" :slide-width='100' >
        <upgradeButton
        :priceUpgrade="item.priceUpgrade"
        :nameUpgrade="item.nameUpgrade"
        :classUpgrade="item.classUpgrade"
        :btnOff ="btnOff(item.id)"
        @upgrade="countUpgrade(item.funcParam1, item.funcParam2, item.id)"
        ></upgradeButton> 
    </slide>

    <template #addons>
      <navigation />
      <pagination :items-to-show="3"/>
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



const UpgradesBtn = ref([
{id:0, priceUpgrade:'0.003 $', nameUpgrade:'+0.000025 $/sec', classUpgrade:'lvl1', funcParam1:0.00300, funcParam2:0.000025, clicked: false},
{id:1, priceUpgrade:'0.006 $', nameUpgrade:'+0.00005 $/sec', classUpgrade:'lvl2', funcParam1:0.00600, funcParam2:0.00005, clicked: false},
{id:2, priceUpgrade:'0.012 $', nameUpgrade:'+0.0001 $/sec', classUpgrade:'lvl3', funcParam1:0.01200, funcParam2:0.00010, clicked: false},
{id:3, priceUpgrade:'0.060 $', nameUpgrade:'+0.0002 $/sec', classUpgrade:'lvl4', funcParam1:0.06000, funcParam2:0.00020, clicked: false}, 
{id:4, priceUpgrade:'0.120 $', nameUpgrade:'+0.0004 $/sec', classUpgrade:'lvl5', funcParam1:0.12000, funcParam2:0.00040, clicked: false},
{id:5, priceUpgrade:'0.240 $', nameUpgrade:'+0.0008 $/sec', classUpgrade:'lvl6', funcParam1:0.24000, funcParam2:0.00080, clicked: false},
{id:6, priceUpgrade:'0.480 $', nameUpgrade:'+0.0016 $/sec', classUpgrade:'lvl7', funcParam1:0.48000, funcParam2:0.00160, clicked: false},
{id:7, priceUpgrade:'0.960 $', nameUpgrade:'+0.0032 $/sec', classUpgrade:'lvl8', funcParam1:0.96000, funcParam2:0.00320, clicked: false},
{id:8, priceUpgrade:'1.92 $', nameUpgrade:'+0.0064 $/sec', classUpgrade:'lvl9', funcParam1:1.92000, funcParam2:0.00640, clicked: false},
{id:9, priceUpgrade:'3.84 $', nameUpgrade:'+0.0128 $/sec', classUpgrade:'lvl10', funcParam1:3.84000, funcParam2:0.01280, clicked: false}, 
{id:10, priceUpgrade:'7.68 $', nameUpgrade:'+0.0256 $/sec', classUpgrade:'lvl11', funcParam1:7.68000, funcParam2:0.02560, clicked: false},
{id:11, priceUpgrade:'15.36 $', nameUpgrade:'+0.0512 $/sec', classUpgrade:'lvl12', funcParam1:15.36000, funcParam2:0.05120, clicked: false},
{id:12, priceUpgrade:'30.72 $', nameUpgrade:'+0.1024 $/sec', classUpgrade:'lvl13', funcParam1:30.72000, funcParam2:0.10240, clicked: false}, 
{id:13, priceUpgrade:'61.44 $', nameUpgrade:'+0.2048 $/sec', classUpgrade:'lvl14', funcParam1:61.44000, funcParam2:0.20480, clicked: false},
{id:14, priceUpgrade:'122.88 $', nameUpgrade:'+0.4096 $/sec', classUpgrade:'lvl15', funcParam1:122.88, funcParam2:0.40960, clicked: false},
{id:15, priceUpgrade:'245.76 $', nameUpgrade:'+0.8192 $/sec', classUpgrade:'lvl16', funcParam1:245.76, funcParam2:0.81920, clicked: false},
{id:16, priceUpgrade:'491.52 $', nameUpgrade:'+1.6384 $/sec', classUpgrade:'lvl17', funcParam1:491.52, funcParam2:1.63840, clicked: false},
{id:17, priceUpgrade:'983.04 $', nameUpgrade:'+3.2768 $/sec', classUpgrade:'lvl18', funcParam1:983.04, funcParam2:3.27680, clicked: false}, 
{id:18, priceUpgrade:'2949 $', nameUpgrade:'+6.5536 $/sec', classUpgrade:'lvl19', funcParam1:2949, funcParam2:6.5536, clicked: false},
{id:19, priceUpgrade:'8847 $', nameUpgrade:'+13.100 $/sec', classUpgrade:'lvl20', funcParam1:8847, funcParam2:13.10, clicked: false},
{id:20, priceUpgrade:'26542 $', nameUpgrade:'+26.210 $/sec', classUpgrade:'lvl21', funcParam1:26542, funcParam2:26.21, clicked: false},
{id:21, priceUpgrade:'79626 $', nameUpgrade:'+52.420 $/sec', classUpgrade:'lvl22', funcParam1:79626, funcParam2:52.42, clicked: false},
{id:22, priceUpgrade:'238878 $', nameUpgrade:'+104.80 $/sec', classUpgrade:'lvl23', funcParam1:238878, funcParam2:104.8, clicked: false}, 
{id:23, priceUpgrade:'716636 $', nameUpgrade:'+209.70 $/sec', classUpgrade:'lvl24', funcParam1:716636, funcParam2:209.7, clicked: false}
])

function countUpgrade(money, count, id){
    if(dollarCount.value > money){
    dollarCount.value -= money
    store.state.Count = dollarCount.value
    store.state.PerCount += count
    UpgradesBtn.value[id].clicked = true
    store.state.arrayWithObjectUpgradesBtn = UpgradesBtn.value
    }
}

function btnOff(id){
    if(UpgradesBtn.value[id].clicked === true){
        return true
    } else {
        return false
    }
}

function loadingBtn(){ 
    if(store.state.arrayWithObjectUpgradesBtn){
    UpgradesBtn.value = store.state.arrayWithObjectUpgradesBtn
    store.state.loading = false
    } else {
    store.state.loading = false
    console.log('Нет сохранений')
    }
}

setTimeout( async ()=>{
loadingBtn()
}, 1000)

watch(() => 
store.state.Count,
() => {
dollarCount.value = store.state.Count
})

return{countUpgrade, UpgradesBtn, btnOff}

},
components:{upgradeButton, Carousel, Slide, Pagination, Navigation}

}

</script>

<style>

.carousel__item{
    width: 2rem !important;
}
.carousel{
    width: 21rem;
}
.carousel__pagination {
    justify-content: center;
    width: 18.5rem;
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(11, 25px);
}

.carousel__pagination-button::after{
    height: 10px;
    border-radius: 10px;
}

.carousel__next {
    right: -2rem;
}

.carousel__prev {
    left: -2rem;
}

.carousel__slide{
    width: 7rem !important;
}


</style>