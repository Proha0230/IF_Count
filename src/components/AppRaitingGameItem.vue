<template>
    <div>
        <div class="mainRaitItem">
            <div class="raitItemRait">
                <h4>{{raitingPlayer}}</h4>
            </div>
            <div class="raitItemName">
            <router-link :to="'/player/' + idPlayer">
             <h4 @click="goRaitPlayer()">{{namePlayer}}</h4>
            </router-link>
            </div>
            <div class="raitItemCount">
                <h4>{{countPlayer}}</h4>
            </div>
        </div>
    </div>

</template>

<script>

import { useStore } from 'vuex';

export default{
props:['raitingPlayer', 'namePlayer', 'countPlayer', 'idPlayer'],
setup(props){

const store = useStore()

const goRaitPlayer = ()=> {
store.commit('LoadOnePlayer', props.idPlayer)
store.state.loading = true
}
return{goRaitPlayer}
}

}

</script>

<style>

.mainRaitItem{
    justify-content: center;
    display: flex;
}

.raitItemCount{
    text-align: right;
    width: 33.3%;
    text-align: center;
}

.raitItemRait{
    text-align: left;
    width: 33.3%;
    text-align: center;
}

.raitItemName{
    margin: 0rem 1rem;
    width: 26%;
    text-align: center;
}

</style>