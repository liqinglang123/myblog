<template>
    <div class="profile-swiper">
        <div class="row">
            <carousel class="index-carousel" :autoplay="true" :scrollPerPage="true" :speed="100" :perPage="1"
                :loop="true" :paginationEnabled="false" :autoplayTimeout="5000">
                <slide>
                    <img src="~assets/img/profile/show1.jpg" alt="">
                </slide>
                <slide>
                    <img src="~assets/img/profile/show2.jpg" alt="">
                </slide>
                <slide>
                    <img src="~assets/img/profile/show3.jpg" alt="">
                </slide>
                <slide>
                    <img src="~assets/img/profile/show4.jpg" alt="">
                </slide>
            </carousel>
        </div>
    </div>
</template>
<script>
    import {
        Carousel,
        Slide
    } from 'vue-carousel'

    export default {
        components: {
            Carousel,
            Slide,
        }

    }
</script>
<style scoped>
    .profile-swiper {
        width: 100%;
        padding-top: 70px;
    }

    .index-carousel {
        margin: 0 auto;
        width: 100%;
        height: 200px;
    }

    /* 
    .index-carousel img {
        width: 100%;
        height: 100%;
    }
 */

    /* @media screen and (min-width: 768px) and (max-width: 991px) {
        .index-carousel {
            width: 400px;
            height: 600px;
        }
    }
    
    @media screen and (min-width: 992px) {
        .index-carousel {
            width: 280px;
            height: 600px;
        }
    } */
</style>