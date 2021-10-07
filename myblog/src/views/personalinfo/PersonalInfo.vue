<template>
    <div class="personal-info">
        <portrait class="col-lg-12 col-md-12 col-sm-3 col-xs-12"></portrait>
        <div class="personal-news col-lg-12 col-md-12 col-sm-9 col-xs-12">
            <div class="row">
                <base-info :information="information"></base-info>
                <saying class="hidden-xs"></saying>
                <contact class="hidden-sm hidden-xs"></contact>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import Portrait from './childComps/Portrait'
    import BaseInfo from './childComps/BaseInfo'
    import Saying from './childComps/Saying'
    import Contact from './childComps/Contact'
    export default {
        name: 'PersonalInfo',
        components: {
            Portrait,
            BaseInfo,
            Saying,
            Contact
        },
        async created() {
            let res = await this.$get('/blogger')
            // console.log(res)
            this.setInformation(res)
        },
        computed: {
            ...mapState('admin', ['information'])
        },
        data() {
            return { }
        },
        methods: {
            ...mapMutations('admin', ['setInformation'])
        },
    }
</script>
<style scoped>
    .personal-info {
        width: 100%;
        height: 100%;
        text-align: center;
        color: #839ccf;
    }
</style>