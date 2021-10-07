<template>
    <div class="saying">
        <!-- <p v-for="(item , index) in sayings" :key="index">{{item}}<br/></p> -->
        <p>{{ this.$store.state.admin.information.sayings1 }}</p>
        <p>{{ this.$store.state.admin.information.sayings2 }}</p>
    </div>
</template>
<script>
    export default {
        name: 'Saying',
        props: {
            sayings: {
                type: Array,
                default () {
                    return ['书山有路勤为径,学海无涯苦作舟', '书山有路勤为径,学海无涯苦作舟']
                }
            }
        }
    }
</script>
<style scoped>
    .saying {
        margin: 20px 0;
        border-top: 1px solid #839ccf;
    }
    
    @media screen and (max-width: 991px) {
        .saying {
            padding-top: 10px;
        }
    }
    
    @media screen and (min-width: 992px) {
        .saying {
            padding-top: 30px;
        }

        .saying p {
            margin-bottom: 10px;
        }
    }
</style>