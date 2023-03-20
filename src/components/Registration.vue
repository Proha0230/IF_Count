<template>

<div class="MainRegistr">
    <form class="Registr" @submit.prevent="RegistrForm">
        <div class="loginReg">
            <label for="login">Логин</label>
            <input id="login" type="email" v-model="email" @blur="eBlur">
            <h5 v-if="eError">{{ eError }}</h5>
        </div>
        
        <div class="passwordReg">
            <label for="password">Пароль</label>
            <input id="password" type="password" v-model="password" @blur="pBlur">
            <h5 v-if="pError">{{ pError }}</h5>
        </div>
        <button style="margin-top: 2rem;">Зарегистрировать аккаунт</button>

        <router-link :to="'/auth'">
        <button>Назад</button>
        </router-link>
    
    </form>
</div>
    
    </template>
    
    <script>
    
    import {useLoginForm} from '../use/login-form'
    
    export default{
    setup(){
    
    return{...useLoginForm()}
    
    }
    }
    
    </script>