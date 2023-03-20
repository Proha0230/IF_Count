<template>
<div class="mainLoader">
<div class="body" :style="{height: windowHeight > 668 ? '50rem' : '40rem' }">
    <div class="preloader">
        <div class="loader loader-inner-1">
            <div class="loader loader-inner-2">
                <div class="loader loader-inner-3">
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import { useWindowSize } from 'vue-window-size';

export default{

setup(){

    const {height } = useWindowSize();
    const windowHeight = height
    
    return{
        windowHeight
    }
}

}



</script>

<style scoped>

.mainLoader{
    text-align: -webkit-center;
}

.body{
width: 100%;
background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);
background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
}
 
.preloader{
 height: 100%;
 width: 100%;
 padding: 20px 0 20px;
 display: flex;
 flex-flow: column wrap;
 justify-content: center;
 align-content: center;
 align-items: center;
 perspective: 700;
}
.loader{
 text-align: center;
 margin: 5px;
 border-radius: 50%;
 border: 4px solid #fff;
 display: flex;
 flex-flow: column wrap;
 justify-content: center;
 align-content: center;
 align-items: center;
 transform-style: preserve-3d;
 position: relative;
}
.loader-inner-1{
 animation-delay: 0.2s;
 animation: change_first_circle 2s ease-in-out infinite;
}
.loader-inner-2{
 animation-delay: 0.2s;
 animation: change_second_circle 2s ease-in-out infinite;
}
.loader-inner-3{
 animation-delay: 0.2s;
 width: 100px;
 height: 100px;
 animation: change_last_circle 3s linear infinite;
}
@keyframes change_first_circle {
 50%{ transform: rotateX(360deg) scale(0.8); }
}
@keyframes change_second_circle {
 50%{ transform: rotateY(360deg) scale(0.8); }
}
@keyframes change_last_circle {
 50%{ transform: rotateX(360deg) scale(0.8); }
}

</style>