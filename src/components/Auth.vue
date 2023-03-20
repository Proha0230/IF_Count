<template>

<div class="MainAuth">
    <form class="Auth" @submit.prevent="LoginForm">
        <div class="login">
            <label for="login">Логин</label>
            <input id="login" type="email" v-model="email" @blur="eBlur">
            <h5 v-if="eError">{{ eError }}</h5>
        </div>
        
        <div class="password">
            <label for="password">Пароль</label>
            <input id="password" type="password" v-model="password" @blur="pBlur">
            <h5 v-if="pError">{{ pError }}</h5>
        </div>

        <button>Войти</button>

        <router-link to="/reg">
        <button>Регистрация</button>
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

<style>

.Auth{
    font-family: system-ui;
    text-align: center;
    border: solid;
    border-radius: 25px;
    width: 20rem;
    padding-top: 2rem;
}

.Registr{
    display: grid;
    font-family: system-ui;
    text-align: center;
    margin-top: 3rem;
    border: solid;
    border-radius: 25px;
    width: 20rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.login{
    margin-right: -5px;
}

.login label {
    margin: 1rem;
}

.login input{
    border-radius: 10px;
}

.password input{
    border-radius: 10px;
}

.loginReg input{
    border-radius: 10px;
}

.passwordReg input{
    border-radius: 10px;
}

.loginReg{
    display: grid;
    justify-self: center;
    width: 15rem;
}

.loginReg label {
    margin: 0.4rem;
}

.passwordReg{
    display: grid;
    justify-self: center;
    width: 15rem;
}

.passwordReg label{
    margin: 0.4rem;
}

.password label {
    margin: 0.8rem;
}

.password {
    margin: 1rem;
}

.Auth button {
    cursor: pointer;
    margin: 1rem;
    border-radius: 15px;
    padding: 0.4rem;
}

.Registr button {
    border-radius: 15px;
    padding: 0.4rem;
    margin: 0.5rem;
    max-width: 60%;
    cursor: pointer;
    justify-self: center;
}

.MainAuth{
    text-align: -webkit-center;
}

.MainRegistr{
    text-align: -webkit-center; 
}

</style>