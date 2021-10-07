<template>
    <div class="album-box">
        <div class="album-detail">
            <div class="img-box" @click="detail(data._id)">
                <img :src="BASE_URL_Img+( data.pictures[0] || 'default.png' )" style="width:100% ; height : 100%"
                    alt="">
                <div class="cover">
                    <span class="icon">
                        <Icon type="md-lock" v-if="data.secrecy" size="50" color="#f4f4f4" />
                        <Icon type="md-image" v-if="!data.secrecy" size="50" color="#f4f4f4" />
                    </span>
                </div>
            </div>
            <div class="album-name" v-if="data.secrecy"><Icon type="md-lock" />{{data.name}}</div>
            <div class="album-name" v-if="!data.secrecy">{{data.name}}</div>
        </div>
    </div>
</template>

<script>
    import { Upload_Album_URL, BASE_URL_Img } from '@/config'

    export default {
        data() {
            return {
                BASE_URL_Img,
            }
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            detail(id) {
                // console.log(id)
                this.$router.push({ path: `/album-detail/${id}` })
            }
        },
    }
</script>

<style scoped>
    .album-box {
        display: inline-block;
        width: 50%;
        height: 250px;
        padding: 15px;
        overflow: hidden;
        /* background-color: yellow; */
        cursor: pointer;
    }

    .album-detail {
        overflow: hidden;
        width: 100%;
        height: 100%;
        /* background-color: pink; */
        border-radius: 13px;
        overflow: hidden;
        box-shadow: 0 0  10px rgb(0, 0, 0, 0.5);

    }

    .img-box {
        height: 80%;
        background-color: black;
        position: relative;
    }

    .album-detail:hover .cover {
        display: inline-block;
        transition: 0.25s;
    }

    .cover {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 50%;
    }

    .icon {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .album-name {
        color: #515a6e;
        font-size: 16px;
        height: 20%;
        background-color: #fff;
        text-align: center;
        padding-top: 8px;
      
    }

    @media screen and (max-width : 767px) {
        .album-box {
            padding: 5px;
            height: 150px;
        }

        .album-name {
            padding-top: 4px;
            font-size: 12px;
        }
    }
</style>