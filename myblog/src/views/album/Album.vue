<template>
    <div class='album'>
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
    .album {
        width: 100%;
        height: 100%;
        padding: 0;
    }
</style>