<template>
    <div class='album-list'>
        <Title><span slot="content">我的相册</span></Title>

        <div class="list animated bounceInUp" >
            <album-box v-for="(item ,index ) in albums" :key="index"
                :class="{animated : true , fadeInLeftBig : index % 2 === 1 , fadeInRightBig : index%2===0  }" :data="item">
            </album-box>
        </div>

    </div>
    </div>
</template>

<script>
    import Title from 'components/content/Title'
    import AlbumBox from './childComps/AlbumBox.vue'
    export default {
        created() {
            // 获取相册数据
            this.getAlbums()
        },
        data() {
            return {
                albums: [],
            }
        },
        components: {
            Title,
            AlbumBox
        },
        methods: {
            // 获取相册数据的方法
            async getAlbums() {
                let res = await this.$get('/albums')
                this.albums = res
                // console.log(res)
            }

        },
    }
</script>

<style scoped>
    .album-list {
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        background-color: #f4f4f4;
    }

    .list {
        margin-top: 50px;
    }
</style>