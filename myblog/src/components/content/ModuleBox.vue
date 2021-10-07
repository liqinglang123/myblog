<template>
    <div class="module-box">
        <span style="font-size: 20px;"><slot name="module-title"></slot></span> 
    </div>
</template>
<script>
    export default {
        name: 'ModuleBox'
    }
</script>
<style scoped>
    @media screen and (max-width: 767px) {
        .module-box {
            margin-top: 5px;
        }
        .module-box h2 {
            font-size: 20px;
        }
    }
    
    @media screen and (min-width: 768px) {
        .module-box {
            margin-top: 20px;
        }
    }
    
    .module-box {
        overflow: hidden;
        position: relative;
        width: 100%;
        color: #3b59b0;
        border-bottom: 1px solid #e6e6e6;
    }
    
    .module-box::after {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        position: absolute;
        /* left: -15px; */
        left: 0;
        bottom: -1px;
        background-color: #3b5998;
    }
</style>