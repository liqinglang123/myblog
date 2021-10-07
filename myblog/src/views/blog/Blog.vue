<template>
    <div class='blog'>
            <router-view class="animated bounceIn"></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods:{
    },
}
</script>

<style scoped>
    .blog {
        /* overflow: auto; */
        width : 100%;
        height: 100%;
        padding: 0;
    }
</style>