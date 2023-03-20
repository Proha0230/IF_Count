<template>
    <div>
        <div class="selectMenu" v-if="!$store.state.loading">

    <div class="NavButtonHeader" v-if="$store.state.loading === false">
        <button class="MenuBtnRaiting" @click="GoRaitingList()"></button>
        <h5 class="FullApph5">РЕЙТИНГ</h5>
    </div>
    <div class="NavButtonHeader" v-if="$store.state.loading === false">
        <button class="MenuBtnChat" @click="GoChatPlayer()"></button>
        <h5 class="FullApph5">ЧАТ</h5>
    </div>
    <div class="NavButtonHeader" v-if="$store.state.loading === false">
        <button class="MenuBtnHelp" @click="goHelp()"></button>
        <h5 class="FullApph5">ПОМОЩЬ</h5>
    </div>
    <div class="NavButtonHeader" v-if="$store.state.loading === false">
        <button class="MenuBtnExit" @click="logout()"></button>
        <h5 class="FullApph5">ВЫЙТИ</h5>
    </div>
            
        </div>
    </div>

</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default{
    setup(){

    const store = useStore()
    const router = useRouter()

    const logout = async ()=> {
    store.dispatch('Logout')
    router.push('/')
    }  

    const goHelp = async ()=> {
    store.state.loading = true
    store.state.menuOpen = false
    router.push('/help')   
    }

    const GoRaitingList = async ()=> {
    store.commit('LoadingRait')
    store.state.loading = true
    store.state.menuOpen = false
    router.push('/playerRait')
    }

    const GoChatPlayer = async ()=> {
    store.state.loading = true
    store.state.menuOpen = false
    router.push('/chat')
    }

    return{logout, GoRaitingList, goHelp, GoChatPlayer}
    }
}

</script>

<style>

.selectMenu {
display: inline-flex;
margin: 1rem;
}

.selectMenu button{
    margin: -1rem 1rem;
    border-radius: 10px;
    cursor: pointer;
}

.MenuBtnRaiting{
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Rating.png);
}

.MenuBtnChat{
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Chat.png);
}

.MenuBtnHelp{
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Help.png);
}

.MenuBtnExit{
    border-radius: 10px;
    padding: 1.5rem;
    background-size: contain;
    cursor: pointer;
    background-image: url(../assets/Exit.png);
}

</style>