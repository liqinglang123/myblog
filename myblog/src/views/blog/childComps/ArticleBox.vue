<template>
    <div class='article-box'>

        <div class="article">
            <module-box style="cursor: pointer;" @click.native="detail(information._id)"><span
                    slot="module-title">{{information.title}}</span>
            </module-box>
            <div class="information">
                <ul>
                    <li>
                        <Icon type="md-chatboxes" size="16" /><span
                            style="margin-left: 5px;">评论({{information.comments.length}})</span>
                    </li>
                    <li>
                        <Icon type="ios-clock" size="16"  /><span
                            style="margin-left: 5px;">{{information.updatedAt | formatDate}}</span>
                    </li>
                    <li>
                        <Icon type="md-person" size="16"  /><span
                            style="margin-left: 5px;">&nbsp;{{information.author}}</span>
                    </li>
                    <li>
                        <Icon type="ios-pricetags" size="16" /><span
                            style="margin-left: 5px;"><i v-for="(item , index) in information.tags"
                                :key="index">{{item.name}}{{index + 1 === information.tags.length ? "" :
                                "、"}}</i></span>
                    </li>
                    <li>
                        <Icon type="ios-eye" size="16"  /><span
                            style="margin-left: 5px;">浏览({{information.readcount}})</span>
                    </li>
                </ul>
            </div>
            <div class="body" ref="body" id="body" v-html="information.body"></div>
            <div class="more"><span style="font-size: 24px;" @click="detail(information._id)">详 &nbsp;&nbsp;&nbsp; 情
                    <Icon style="margin-left: 20px;" type="md-arrow-forward" />
                </span> </div>
        </div>

        <Divider />
    </div>
</template>

<script>
    import { getYMD } from '@/utils/date'
    import ModuleBox from 'components/content/ModuleBox'

    export default {
        components: {
            ModuleBox
        },
        props: {
            information: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
        },
        methods: {
            detail(id) {
                // console.log(id)
                this.$router.push({ path: `/detail/${id}` })
            }
        },
        filters: {
            formatDate(str) {
                return getYMD(str)
            }
        }

    }
</script>
<style scoped>
    .article {
        overflow: hidden;
        margin: 30px 0;
        padding: 0 10px;
        width: 100%;
        min-height: 300px;
        background-color: #fdfdfd;
        border-top: 5px solid #3b5998;
    }

    .information {
        margin: 20px 0;
    }

    .information ul {
        list-style-type: none;
    }

    .information ul li {
        display: inline-block;
        padding-right: 10px;
        font-size: 15px;
        height: 15px;
        line-height: 15px
    }

    ul li+li {
        padding-left: 10px;
        border-left: 1px solid #999999;
    }

    .body {
        /* display: block; */
        /* min-height: 130px; */
        margin-bottom: 20px;
        overflow: hidden;
        font-size: 16px;
        line-height: 20px;
        text-overflow: ellipsis;
        /*定义的数字为显示的行数*/
        /* autoprefixer:off */
         display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        /* autoprefixer:on */
    }

    .body>>>img {
        max-width: 100%;
    }

    @media screen and (max-width: 767px) {
        .article {
            margin: 30px 0;
        }

        .information ul li {
            display: block;
            border: none;
            padding-left: 0;
            margin-bottom: 8px;
        }

        .body {
            /* -webkit-line-clamp: 12; */
            display: none;
        }

        .more span {
            flex: 1;
        }
    }

    .more {
        display: flex;
        overflow: hidden;
        justify-content: flex-end;
        height: 50px;
        color: #3b5998;
        font-weight: 500;
        line-height: 50px;
        margin: 20px;
        text-align: center;
    }

    .more span {
        width: 200px;
        border: 1px solid #dadada;
        cursor: pointer;
    }

    .more span:hover {
        color: #fff;
        border: none;
        background-color: #3b5998;
    }
</style>