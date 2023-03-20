<template v-if="errorMessage || typeMessage">
    <div class="mainErrorMes">
        <div class="errorMes" :style="{borderColor: Mess ? 'lawngreen' : 'red' }" >
            <h2>{{typeMessage}}</h2>
            <h3>{{Message()}}</h3>
            <button @click="clearMessage" class="closeBtnMess">X</button>
        </div>
    </div>

</template>

<script>
import store from '@/store';
import { ref, watch } from 'vue';

export default{
setup(){

const textMessage = ref(null)
const typeMessage = ref(null)
const Mess = ref(null)

const textMap = {
EMAIL_NOT_FOUND: 'Нет пользователя с таким Email',
INVALID_PASSWORD: 'Вы ввели неправильный пароль',
USER_DISABLED: 'Учетная запись заблокирована'
}

function Message(){

setTimeout(clearMessage, 3000)

if(store.state.eMessage && !store.state.TokenID) {
textMessage.value = store.state.eMessage
Mess.value = false
typeMessage.value = 'Ошибка!'
return textMap[textMessage.value] ? textMap[textMessage.value] : 'Слишком много попыток входа'

} else if(store.state.rMessage && !store.state.TokenID) {
Mess.value = true
typeMessage.value = 'Отлично! Вы зарегистрировались.'
return `Ваш Email: ${store.state.rMessage} `

}
     
}

const clearMessage = ()=> {
Mess.value = null
store.state.eMessage = null
store.state.rMessage = null
}

watch(() => 
[store.state.eMessage, store.state.rMessage],
() => {
setTimeout(Message(), 500)

})

return{Message, typeMessage, clearMessage, Mess}

}
}

</script>

<style>
.errorMes{
    text-align: center;
    border: solid;
    border-radius: 25px;
    width: 20rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-family: system-ui;
}
.mainErrorMes{
    text-align: -webkit-center;
}
.closeBtnMess{
    float: right;
    margin-top: -7rem;
    padding: 0.8rem 1rem;
    margin-right: 0.3rem;
    border-radius: 50px;
    border-color: red;
    color: red;
}
</style>