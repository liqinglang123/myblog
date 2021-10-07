<template>
    <div class="nav-bar">
        <div class="nav-bar-item-container1 hidden-xs row">
            <nav-bar-item path="/index" icon="glyphicon glyphicon-th" :paths="index"></nav-bar-item>
            <nav-bar-item path="/profile" icon="glyphicon glyphicon-user" :paths="profile"></nav-bar-item>
            <nav-bar-item path="/album" icon="glyphicon glyphicon-picture" :paths="album"></nav-bar-item>
            <nav-bar-item path="/blog" icon="glyphicon glyphicon-bullhorn" :paths="blog"></nav-bar-item>
            <nav-bar-item path="/diary" icon="glyphicon glyphicon-pencil" :paths="diary"></nav-bar-item>
            <nav-bar-item path="/message" icon="glyphicon glyphicon-comment" :paths="message"></nav-bar-item>
        </div>
    </div>
</template>
<script>
    import NavBarItem from './childComps/NavBarItem'

    export default {
        name: 'NavBar',
        components: {
            NavBarItem
        },
        data() {
            return {
                index: ['index'],
                profile: ['profile'],
                album: ['album' , 'album-detail'],
                blog: ['blog', 'detail'],
                diary: ['diary'],
                message: ['message']
            }
        }
    }
</script>
<style scoped>
    /* .nav-bar {
        display: flex;
        flex-direction: column-reverse;
    } */

    @media screen and(max-width: 767px) {}

    @media screen and (min-width: 768px) {}

    @media screen and (min-width: 992px) {
        .nav-bar {
            margin-left: 15px;
        }
    }

    .nva-bar-item {
        width: 100%;
    }

    .nav-bar-item>i::before {
        line-height: 80px;
        font-size: 50px;
        vertical-align: center;
    }

    .active {
        color: teal;
        background-color: #fff;
    }

    /* .nav-bar-item>i {
        margin-left: 15px;
    }
     */
</style>