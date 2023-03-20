<template>
<div class="mainHelpGame" v-if="!$store.state.loading" >
    <div class="helpGame">
        <h3 style="margin-top: -1rem;">
            Приветствую тебя в игре IF_Count.
        </h3>
        <h4>
            Правила в этой игре очень простые - тебе нужно заработать как можно больше денег.
        </h4>
        <h4>
            Покупай видеокарты и зарабатывай с помощью майнинга деньги!
        </h4>
        <h4>
            Когда твой заработок будет уже достаточно хорошим - ты сможешь покупать "Фермы для майнинга" и твой заработок будет еще больше.
        </h4>
        <h3>
            Стань самым богатым!
        </h3>
        <h4>
            В меню есть вкладка "Рейтинг игроков". Там ты сможешь увидеть у кого сколько денег и кто лучший в этом игровом мире.
        </h4>
        <h4>
            В меню есть вкладка "Игровой чат". Он будет реализован в ближайшее время. В нем ты сможешь общаться с другими игроками.
        </h4>
        <h4>
            В меню есть вкладка "Выйти из аккаунта". Нажав на нее - ты сохранишь свой прогресс и выйдешь из игры.
        </h4>
        <router-link to='/home'>
        <button>Вернуться назад</button>
        </router-link>

    </div>
</div>
</template>

<script>
import { useStore } from 'vuex'

export default{
    emits:['closeHelp'],
    setup(){
    
    const store = useStore()

    setTimeout(()=>{
        store.state.loading = false
    }, 1000)

        return{}
    }

}
</script>

<style>

.helpGame{
    font-family: system-ui;
    text-align: center;
    border: solid;
    border-radius: 25px;
    width: 22rem;
    padding-top: 2rem;
}

.mainHelpGame{
    text-align: -webkit-center;
}

.helpGame button{
    cursor: pointer;
    margin: 1rem;
    border-radius: 15px;
    padding: 0.4rem;
    width: 13rem;
}

</style>