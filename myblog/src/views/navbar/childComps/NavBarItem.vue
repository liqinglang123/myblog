<template>
    <div class="nav-bar-item" :class="{ active : isActive }" @click = "itemClick">
        <div class="icon-container"><i :class="icon"></i></div>        
    </div>
</template>
<script>
    export default {
        name: 'NavBarItem',
        props: {
            path: String,
            icon: String,
            paths : {
                type : Array,
                default(){
                    return [] 
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            itemClick() {
                this.$router.push(this.path)
            }
        },
        computed: {
            isActive() {
                return this.paths.includes(this.$route.path.split("/")[1])
            }
        }
    }
</script>
<style scoped>
    .nav-bar-item {
        width: 100%;
        padding: 10px;
        color: #3b5998;
        background-color: #3b5998;
        cursor: pointer;
        box-shadow: 0 0 0 1px rgb(255 255 255 / 20%);
    }
    
    .nav-bar-item:hover {
        color: white;
        background-color: white;
    }
    
    .nav-bar-item:hover .icon-container {
        background-color: #3b5998;
    }
    
    .icon-container {
        width: 60px;
        height: 60px;
        padding: 0 15px;
        background-color: white;
        border-radius: 30px;
    }
    
    .icon-container>i::before {
        line-height: 60px;
        font-size: 30px;
    }
    
    .active {
        color: white;
        background-color: white;
    }
    
    .active .icon-container {
        background-color: #3b5998;
        color: white;
    }
</style>