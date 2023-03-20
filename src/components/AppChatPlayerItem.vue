<template>

    <div class="chatMess">
        <h5>{{player.split('@')[0].slice(0,12)}}</h5>
        <h6>{{message}}</h6>
    </div>

</template>

<script>
export default{
    props:['message', 'player']

}

</script>

<style>
.chatMess{
    font-family: system-ui;
    border: solid;
    border-radius: 25px;
    width: 20rem;
    height: 3.5rem;
    margin: 0.5rem;
}

.chatMess h5{
    margin-top: 0.5rem;
    text-align: left;
    margin-left: 0.5rem;
}
.chatMess h6{
    margin-top: -1rem;
    text-align: left;
    margin-left: 0.5rem;
}

</style>