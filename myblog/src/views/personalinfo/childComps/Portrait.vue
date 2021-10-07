<template>
    <div class="personal-portrait">
        <div class="portrait"></div>
    </div>
</template>
<script>
    export default {
        name: 'Protrait'
    }
</script>
<style scoped>
    @media screen and (max-width: 767px) {
        .personal-portrait {
            height: 100px;
            margin-top: 10px;
        }
    }
    
    @media screen and (min-width: 768px) {
        .personal-portrait {
            height: 150px;
        }
    }
    
    .personal-portrait {
        position: relative;
    }
    
    .personal-portrait .portrait {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        background-image: url(~assets/img/portrait/portrait.jpg);
        background-size: cover;
        border-radius: 50px;
        border: 10px solid #4c70ba;
    }
    
    .personal-portrait .portrait:hover {
        background-image: url(~assets/img/portrait/portrait3.png);
    }
</style>