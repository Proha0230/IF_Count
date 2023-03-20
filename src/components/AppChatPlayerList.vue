<template>
<div class="mainChat" >
    
    <div class="ChatList" v-if="!$store.state.loading && ChatDataArray">

        <swiper
        :slides-per-view="8"
        :direction="'vertical'"
        :speed="500"
        :initialSlide="ChatDataArray.length" 
        @slides-length-change="onSlideChange"
        >
        <swiper-slide v-for="message in ChatDataArray" :key="message" >
            <AppChatPlayerItem 
            :message = message.Message
            :player = message.PlayerMail
            ></AppChatPlayerItem>
        </swiper-slide>
        
    </swiper>


    <form class="formInputChat" @submit.prevent="subChat()">
        <input id="chatInput" type="text" v-model="chatInput" maxlength="53" autocomplete="off">
        <button>Отправить</button>
    </form>

    <router-link to='/home'>
    <button class="ChatButton">Вернуться назад</button>   
    </router-link>

    </div>

<div v-if="!$store.state.loading && !ChatDataArray">

    <div class="ChatList">

    <div style="height: 35rem;">
    <AppChatPlayerItem v-for="message in 1" :key="message"
    message = "Сообщений пока-что нет, напишите что-нибудь"
    player = "Admin"
    />
    </div>

    <form class="formInputChat" @submit.prevent="subChat()">
    <input type="text" v-model="chatInput" maxlength="53" autocomplete="off">
    <button>Отправить</button>
    </form>

    <router-link to='/home'>
    <button class="ChatButton">Вернуться назад</button>   
    </router-link>

    </div>

</div>

</div>
    


</template>

<script>
import { useStore } from 'vuex';
import AppChatPlayerItem from './AppChatPlayerItem.vue';
import { ref, onBeforeMount, onBeforeUnmount, computed} from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default{

setup(){

const store = useStore()
const chatInput = ref()
const ChatData = ref()

async function subChat(){
try{
const str = JSON.stringify({
Message: chatInput.value,
PlayerMail: store.state.playerMail
})
await axios.post(`https://if-count-default-rtdb.firebaseio.com/ChatPlayer.json`, str)
chatInput.value = null
LoadingChat()
} catch(e){}
}

async function LoadingChat(){
try{
const {data} = await axios.get(`https://if-count-default-rtdb.firebaseio.com/ChatPlayer.json`)
ChatData.value = Object.values(data)
} catch(e){}
}

const ChatDataArray = computed(()=>{ 
    try{
    return [...ChatData.value].map(item => {
        const container = {}
        container.Message = item.Message
        container.PlayerMail = item.PlayerMail.split('@')[0].slice(0,12)
        return container
    })
    } catch(e){}
}) 


const onSlideChange = (swiper) => {
swiper.slideTo(ChatDataArray.value.length, 500)
};

const LoadChatInterval = setInterval(()=>{
LoadingChat()
}, 5000)

setTimeout(()=>{
LoadingChat()
store.state.loading = false
}, 1000)

onBeforeMount(()=>{
    LoadChatInterval
})
onBeforeUnmount(()=>{
    clearTimeout(LoadChatInterval)
})


    return{chatInput, subChat, ChatDataArray, onSlideChange}
}, 
components:{AppChatPlayerItem, Swiper, SwiperSlide}
}

</script>

<style>


.ChatButton {
    cursor: pointer;
    margin: 1rem;
    border-radius: 15px;
    padding: 0.4rem;
    width: 13rem;
}

.mainChat{
    text-align: -webkit-center;
}

.ChatList{
    font-family: system-ui;
    border: solid;
    border-radius: 25px;
    width: 22rem;
    height: 44rem;
}

.formInputChat{
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
.formInputChat input{
    padding: 1rem;
    margin-left: 1rem;
    border: solid;
    border-radius: 8px;
    border-width: 3px;
    border-color: limegreen;
    margin-right: 1rem;
}
.formInputChat button{
    border: solid;
    border-radius: 20px;
    padding: 0.5rem;
    border-color: limegreen;
    border-width: 3px;
}

.swiper{
    height: 35.5rem;
}
.swiper-slide{
    height: 68px !important;
}
</style>