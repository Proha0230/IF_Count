<template>
<div class="mainRaitGame" v-if="Info">
    <div class="raitGame">

         <div class="raitPlayerCount">
            <h3>Счет игрока</h3>
            <h4>{{Info.Count.toFixed(Info.Count > 1 ? 1 : 5)}}</h4>
        </div>
        <div class="raitPlayerPerCount">
            <h3>Заработок игрока в сек</h3>
            <h4>{{ Info.InvestProcent > 0 ? (Info.PerCount + (Info.PerCount * Info.InvestProcent)).toFixed(Info.PerCount > 1 ? 1 : 5) :
            Info.PerCount.toFixed(Info.PerCount > 1 ? 1 : 5) }}$</h4>
        </div>
        <div class="raitPlayerName">
            <h3>Имя игрока</h3>
            <h4>{{Info.playerMail.split('@')[0].slice(0,12)}}</h4>
        </div>

    <form @submit.prevent="countMoney ? sub() : ''">
        <div class="login">
            <label for="login">Перевести этому игроку $</label>
            <input id="login" type="number" v-model="countMoney" autocomplete="off" >
            <h4 class="ErrorMessage" v-if="ErrorMessage">{{ ErrorMessage }}</h4>
        </div>
        <button>Сделать Перевод</button>
    </form>
    
        <button @click="goRaitingList()">Вернуться назад</button>
    
    </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default{
    setup(){

const store = useStore()
const router = useRouter()
const Info = ref()
const countMoney = ref(Number)
const ErrorMessage = ref()


async function sub() {
    if(store.state.Count >= countMoney.value && Info.value.PlayerId != store.state.TokenID && countMoney.value > 0) {
    store.state.Count -= countMoney.value
    const str = JSON.stringify({
    Count: Info.value.Count + countMoney.value,
    })
    await axios.patch(`https://if-count-default-rtdb.firebaseio.com/DataPlayer/${Info.value.PlayerId}.json`, str)
    store.commit('SaveProgress')
    router.push('/home')
    } else if(Info.value.PlayerId === store.state.TokenID) {
    ErrorMessage.value = 'Нельзя пересылать деньги самому себе'
    } else if(store.state.Count < countMoney.value) {
    ErrorMessage.value = 'У вас недостаточно денег для перевода'
    }
}

const goRaitingList = async ()=> {
    store.state.loading = true
    router.push('/playerRait')
    }

setTimeout( async ()=>{
Info.value = store.state.ObjectOnePlayer
store.state.loading = false   
}, 1000)

    return{Info, goRaitingList, sub, countMoney, ErrorMessage}
}
}

</script>

<style scoped>

.ErrorMessage{
    color: red;
    width: 14rem;
}

.raitPlayerCount{
    display: flex;
    align-items: center;
    margin-left: 1rem;
}
.raitPlayerCount h4{
    margin-left: 3rem;
    font-size: 1.5rem;
}

.raitPlayerPerCount{
    display: flex;
    align-items: center;
    margin: -2rem;
}
.raitPlayerPerCount h3{
    margin-left: 1.5rem;
    width: 9.5rem;
}
.raitPlayerPerCount h4{
    margin-left: 2rem;
    font-size: 1.5rem;
}

.raitPlayerName{
    display: flex;
    align-items: center;
    margin-left: 1rem;
}
.raitPlayerName h4{
    margin-left: 3rem;
    font-size: 1.5rem;
}

.login label {
    margin: 1rem;
    font-family: system-ui;
    font-size: 1.2rem;
}

</style>