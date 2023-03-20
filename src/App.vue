<template> 
<TheNavBar v-if="!$store.state.TokenID"></TheNavBar>
<Message v-if="$store.state.eMessage || $store.state.rMessage"></Message>
<loader v-if="$store.state.loading"></loader>

<div>
  <router-view />
</div>

</template>


<script>
import TheNavBar from './components/TheNavBar.vue';
import Message from './components/Message.vue';
import loader from './components/loader.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default{
setup(){
const store = useStore()
const router = useRouter()

router.push('/')   

window.onbeforeunload = ()=> {
store.dispatch('Logout')
router.push('/')
}

    return{}
  },


  components:{ TheNavBar, Message, loader}
}

</script>



<style>

</style>
