<template>
    <div class="nav-bar-mobile-item" 
    :class="{ active : isActive }"
    @click="itemClick">
          <i :class="detail.icon"> </i>
          <span>{{detail.title}}</span>
    </div>
</template>
<script>
    export default {
        name: 'NavBarMobileItem',
        props: {
            // icon: String,
            // title: String,
            // path: String,
            // dPath : 
            detail : {
                type :Object ,
                default(){
                    return {}
                }
            }
        },
        computed: {
            isActive() {
                // console.log(this.$route.path)
                return this.$route.path.indexOf(this.detail.path) !== -1
            }
        },
        data() {
            return {}
        },

        methods: {
            itemClick() {
                if (this.isActive) {
                    // console.log(this.$router)
                    return this.$router.replace('/null')
                }
                return this.$router.replace(this.detail.path)
            }
        },

        created() {},

    }
</script>
<style scoped>
    .nav-bar-mobile-item {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #3b5998;
        background-color: #3b5998;
        cursor: pointer;
        box-shadow: 0 0 0 1px rgb(255 255 255 / 20%);
    }
    
    .nav-bar-mobile-item:hover {
        background-color: #6078ab;
    }
    
    .active {
        background-color: #6078ab;
    }
    
    .nav-bar-mobile-item i {
        width: 40px;
        height: 40px;
        text-align: center;
        margin: 10px;
        border-radius: 20px;
        background-color: #fff;
    }
    
    .nav-bar-mobile-item i::before {
        line-height: 40px;
    }
    
    span {
        color: white;
        line-height: 50px;
        font-size: 16px;
    }
</style>