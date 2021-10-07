<template>
        <div class="title col-xs-12 animated fadeInDownBig">
            <div class="row">
                <Icon type="md-add" size="30" /><div class="title-content"><slot name="content"></slot></div>
            </div>
        </div>
</template>
<script>
    export default {
        name: 'Title'
    }
</script>
<style scoped>
    @media screen and (max-width: 767px) {
        .title-content {
            font-size: 15px;
            font-weight: 520;
        }
    }
    
    @media screen and (min-width: 768px) {
        .title-content {
            font-size: 25px;
            font-weight: lighter;
            padding-left: 15px;
        }
    }
    
    .title {
        font-size: 25px;
        color: #3b5998;
        border-bottom: 1px solid #e6e6e6;
    }
    
    .title-content {
        display: inline-block;
        font-weight: 500;
    }
</style>