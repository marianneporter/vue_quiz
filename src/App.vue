<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div class="container">
        <RouterView />
    </div> 
</template>

<style>
    body {
        display: flex;
        justify-content: center;
        background: linear-gradient(to top right, #0f9f88, #001c40);
     
        padding: 0;
    }

    .container {
        width: 100%;       
        color: white;
        min-height: 100vh;  
        padding: 1rem;      
    }

    @media screen and (min-width: 640px) {
        .container {
            width: 30rem;  
        }       
    }

</style>
