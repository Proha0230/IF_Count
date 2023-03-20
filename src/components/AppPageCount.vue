<template>

<div>
    <div class="FullApp">
        <h4 class="LableInGame" v-if="!$store.state.loading">IF_Count</h4>

    <Menu v-if="!$store.state.loading"></Menu>
        
    <div class="counterMoney" v-if="$store.state.loading === false">
            <h2>{{ Counter }}</h2>
    </div>

    <h4 class="PerCount" v-if="$store.state.loading === false">
        Зарабатываем: {{ PerCountSec }} $/sec
    </h4> 

        <div>
            <div v-if="!$store.state.loading" class="mainShopMenu">
            <button class="MenuBtnShop" @click="ShopStatus()"></button>
            <h5 class="FullApph5">МАГАЗИН</h5>
            </div>
            <div v-if="ShopOpen && !ShopVideoOpen && !ShopInvestOpen" class="ShopList">
                <div class="ShopItem">
                    <button class="MenuBtnShopVideoCard" @click="ShopVideo()"></button>
                    <h5 class="FullApph5">Видеокарты</h5>
                </div>
                <div class="ShopItem">
                    <button class="MenuBtnShopInvest" @click="ShopInvest()"></button>
                    <h5 class="FullApph5">Инвестиции</h5>
                </div>
            </div>
            <div v-if="ShopVideoOpen" style="margin-top: -0.5rem;">
                <upgradeButtonList></upgradeButtonList>
            </div>
            <div v-if="ShopInvestOpen" style="margin-top: -0.5rem;">
                <upgradeInvestListVue></upgradeInvestListVue>
            </div>
        </div>
    </div>

</div>


</template>
    
    
<script>
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import upgradeButtonList from './upgradeButtonList.vue';
import upgradeInvestListVue from './upgradeInvestList.vue';
import Menu from './Menu.vue';


export default{

setup(){

const store = useStore()
const dollarCount = ref(store.state.Count)
const ShopOpen = ref(false)
const ShopVideoOpen = ref(false)
const ShopInvestOpen = ref(false)

const GameTimer = setInterval(()=>{
store.commit('dollarPerClick')
dollarCount.value = store.state.Count
}, 1000)

const SaveGame = setInterval(()=>{
store.commit('SaveProgress')
}, 60000)

setTimeout(()=>{
store.state.loading = false
}, 1000)

onBeforeMount(()=>{
    store.state.loading = true
    GameTimer
    SaveGame
})

onBeforeUnmount(()=>{
    clearTimeout(GameTimer)
    clearTimeout(SaveGame)
})

const Counter = computed(()=>{
    let i = dollarCount.value
    if(i >= 1 && i <= 9){
       return dollarCount.value.toFixed(2)
    }else if(i >= 10 && i < 100){ 
        return dollarCount.value.toFixed(1)
    }else if(i >= 100){ 
        return dollarCount.value.toFixed(0)
    }else{
        return dollarCount.value.toFixed(5)
    }
})

const PerCountSec = computed(()=>{
    let i = store.getters.PerCountInv
    if(i >= 1 && i <= 9){
        return store.getters.PerCountInv.toFixed(2)
    }else if(i >= 10 && i < 100){ 
        return store.getters.PerCountInv.toFixed(1)
    }else if(i >= 100){ 
        return store.getters.PerCountInv.toFixed(0)
    }else{
        return store.getters.PerCountInv.toFixed(6)
    }
})

function ShopStatus() {
    if(!ShopVideoOpen.value && !ShopOpen.value && !ShopInvestOpen.value){
       ShopOpen.value = true
    } else if(ShopVideoOpen.value && ShopOpen.value){
        ShopVideoOpen.value = false
        ShopOpen.value = false
        ShopInvestOpen.value = false
    } else if(!ShopVideoOpen.value && ShopOpen.value && !ShopInvestOpen.value){
        ShopOpen.value = false
    } else if(ShopInvestOpen.value && ShopOpen.value){
        ShopVideoOpen.value = false
        ShopOpen.value = false
        ShopInvestOpen.value = false
    }
}

const ShopVideo = ()=>{
    store.state.loading = true
    ShopVideoOpen.value = true
}

const ShopInvest = ()=>{
    store.state.loading = true
    ShopInvestOpen.value = true
}

//     watch(() => 
// store.state.taskOpen,
// () => {
// setTimeout(Update, 1000)
// })

return{Counter, PerCountSec, ShopOpen, ShopVideoOpen, ShopStatus, ShopVideo, ShopInvestOpen, ShopInvest}

},

components:{Menu, upgradeButtonList, upgradeInvestListVue}

}

</script>

<style>

.mainShopMenu{
    margin-top: -0.5rem;
}

.ShopItem{
    margin: 1rem;
}

.ShopList{
    display: flex;
    justify-content: center;
}

.MenuBtnShopInvest{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Invest.png);
    margin-bottom: -1rem;
}

.MenuBtnShopVideoCard{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/videoCard.png);
    margin-bottom: -1rem;
}

.MenuBtnShop{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Shop.png);
    margin-bottom: -1rem;
}

.FullApph5{
    margin-bottom: 0.2rem;
    font-family: system-ui;
}

.LableInGame{
    font-size: 3rem;
    font-family: monospace;
    color: gold;
    margin: 2.5rem 0rem;
}

.PerCount{
    font-family: system-ui;
    margin-top: 0.5rem;
}

.FullApp{
    text-align: -webkit-center;
}

.UpgradeBtnsHomePage{
    justify-content: center;
    display: flex;
    height: 13rem;
    margin-top: 1rem;
}

.btnPerClick{
    text-align: center;
}

.btnPerClick button{
    margin: 1rem;
}

.counterMoney{
    text-align: center;
}

.counterMoney{
    padding-top: 7rem;
    padding-bottom: 3.5rem;
    background-image: url(../assets/HomePage.png);
    background-repeat: round;
    max-width: 11rem;
    max-height: 5rem;
}

.counterMoney h2{
    margin-top: -5rem;
    font-family: monospace;
}

.btnUpgradeNavigate button{
    max-height: 4rem;
    width: 4rem;
    align-self: center;
    margin: 1rem;
    border-radius: 26px;
    cursor: pointer;
}

.btnUpgradeNavigate{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1.5rem;
}

.btnUpgradeNavigate h2{
font-family: monospace;
}


.lvl1{
    background-image: url(../assets/lvl1.png);
}
.lvl2{
    background-image: url(../assets/lvl2.png);
}
.lvl3{
    background-image: url(../assets/lvl3.png);
}
.lvl4{
    background-image: url(../assets/lvl4.png);
}
.lvl5{
    background-image: url(../assets/lvl5.png);
}
.lvl6{
    background-image: url(../assets/lvl6.png);
}
.lvl7{
    background-image: url(../assets/lvl7.png);
}
.lvl8{
    background-image: url(../assets/lvl8.png);
}
.lvl9{
    background-image: url(../assets/lvl9.png);
}
.lvl10{
    background-image: url(../assets/lvl10.png);
}
.lvl11{
    background-image: url(../assets/lvl11.png);
}
.lvl12{
    background-image: url(../assets/lvl12.png);
}
.lvl13{
    background-image: url(../assets/lvl13.png);
}
.lvl14{
    background-image: url(../assets/lvl14.png);
}
.lvl15{
    background-image: url(../assets/lvl15.png);
}
.lvl16{
    background-image: url(../assets/lvl16.png);
}
.lvl17{
    background-image: url(../assets/lvl17.png);
}
.lvl18{
    background-image: url(../assets/lvl18.png);
}
.lvl19{
    background-image: url(../assets/lvl19.png);
}
.lvl20{
    background-image: url(../assets/lvl20.png);
}
.lvl21{
    background-image: url(../assets/lvl21.png);
}
.lvl22{
    background-image: url(../assets/lvl22.png);
}
.lvl23{
    background-image: url(../assets/lvl23.png);
}
.lvl24{
    background-image: url(../assets/lvl24.png);
}




</style>