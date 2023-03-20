<template>

    <div class="upgradePage">
        <div :class="{btnUpgrade: true, disabled: btnOff}">
            <button @click=" !btnOff ? $emit('upgrade') : ''" :class="classUpgrade"></button>
        </div>
        <div class="priceUpgrade">
            <h5>{{nameUpgrade}}</h5>
            <h5 v-if="!btnOff" :class="{h4PriceBtn: btnOff}">{{priceUpgrade}}</h5>
            <h5 v-if="btnOff" class="h4PriceBtn">Куплено</h5>
        </div>
    </div>

</template>

<script>

export default{ 
    emits:['upgrade'],
    props:['nameUpgrade', 'priceUpgrade', 'classUpgrade', 'btnOff'],

    setup(){
        
    return{}
    }

}

</script>

<style>
.btnUpgrade button {
    padding-top: 0rem;
    padding-bottom: 4rem;
    padding-right: 2rem;
    padding-left: 2rem;
    background-repeat: round;
    border: solid;
    border-radius: 10px;
    border-width: 2px;
    cursor: pointer;

}

.priceUpgrade{
    margin-top: -0.6rem;
    text-align: -webkit-center;
}


.priceUpgrade h5{
    font-family: monospace;
}


.upgradePage{
    margin: 1rem 1rem;

}

.disabled button{   
    background-image: url(../assets/purchased.png);
}
.h4PriceBtn{
    color: rgb(0, 234, 0)
}

</style>