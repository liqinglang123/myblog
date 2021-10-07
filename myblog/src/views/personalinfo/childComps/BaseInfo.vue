<template>
    <div class="profile_info-item1">
        <h1 style="margin-top : 20px;margin-bottom: 15px;">{{information.name}}</h1>
        <h4 style="margin-bottom: 15px;">{{information.occupation}}</h4>
        <h6 class="address"><i class="glyphicon glyphicon-map-marker"><span style="padding-left: 5px;">{{information.nativePlace}}</span></i></h6>
    </div>
</template>
<script>
    export default {
        name: 'BaseInfo',
        props: {
            information: {
                type: Object,
                default () {
                    return {}
                }
            }
        }
    }
</script>
<style scoped>
    .address i::before {
        vertical-align: middle;
    }
</style>