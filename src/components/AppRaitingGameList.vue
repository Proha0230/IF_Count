<template>
<div class="mainRaitGame" v-if="!$store.state.loading">
    <div class="raitGame">
    <AppRaitingGameItem 
    v-for="(player, id) in HightRaitPlayer()" :key="player"
    :raitingPlayer="id+1" 
    :namePlayer="player.name" 
    :countPlayer="player.count"
    :idPlayer="player.idPlayer"
    ></AppRaitingGameItem>
    <router-link to='/home'>
    <button>Вернуться назад</button>   
    </router-link>
    </div>
</div>

</template>

<script>
import { ref, computed} from 'vue'
import { useStore } from 'vuex'
import AppRaitingGameItem from './AppRaitingGameItem.vue'

export default{
components:{AppRaitingGameItem},
setup(){

const store = useStore()
const ObjPlayer = ref()


const ArrayAllPlayers = computed(()=>{ 
    try{
    return [...ObjPlayer.value].map(item => {
        const container = {}
        container.name = item.playerMail.split('@')[0].slice(0,12)
        container.count = item.Count.toFixed(item.Count > 1 ? 1 : 5)
        container.idPlayer = item.PlayerId
        return container
    })
    } catch(e){}
}) 

function HightRaitPlayer() {
    try{
   return ArrayAllPlayers.value.sort(( a, b ) =>  b.count - a.count)
    } catch (e){}
}
// это сортировка в порядке убывания (от большего к меньшему)
//.sort(( a, b ) =>  b - a)

// это сортировка в порядке возрастания (от меньшего к большему)
//.sort(( a, b ) =>  a - b)


setTimeout( async ()=>{ 
ObjPlayer.value = Object.values(store.state.ObjectAllPlayer)
store.state.loading = false
}, 1000)

return{HightRaitPlayer}
}

}

</script>

<style>
.raitGame{
    font-family: system-ui;
    border: solid;
    border-radius: 25px;
    width: 20rem;
}

.raitGame button {
    cursor: pointer;
    margin: 1rem;
    border-radius: 15px;
    padding: 0.4rem;
    width: 13rem;
}

.mainRaitGame{
    text-align: -webkit-center;
}

.raitPlayer{
    display: flex;
    justify-content: center;
}

.raitPlayer h4 {
    margin: 1rem;
}

.counterRait{
    text-align: center;
}

.nameRait{
    text-align: center;
}

.numberRait{
    text-align: center;
}

table{
    table-layout: fixed;
    width: 100%;
}

</style>