<template>
    <div class="profile">
        <Title><span slot="content">关于我</span></Title>
        <div class="profile-box" style="padding: 10px;margin-top: 30px;">
            <!-- 基本信息 -->
            <module-box><span slot="module-title">基本信息</span></module-box>
            <Infomation />
            <!-- 个人技能 -->
            <module-box style="margin-top: 20px;"><span slot="module-title">个人技能</span></module-box>
            <div class="skill" ref="echarts">
                <div class="bar" v-for="(item , index) in skills" :key="index">
                    <Progress :transitionDuration="5000" :radius="50" :strokeWidth="10" :value="item.progress"
                        strokeColor="#3b5998">
                        <div class="content">{{ item.name }}</div>
                    </Progress>
                </div>
            </div>
            <!-- 兴趣与爱好 -->
            <module-box><span slot="module-title">兴趣与爱好</span></module-box>
            <div class="hobbies">
                <p><i class="glyphicon glyphicon-hand-right"></i>
                    {{this.$store.state.admin.information.hobbies}}
                </p>
            </div>
            <!-- 专业技能 -->
            <module-box><span slot="module-title">专业技能</span></module-box>
            <div class="pro-skill">
                <ul style="list-style: none;">
                    <li v-for="(item  , index ) in professionalSkills" :key="index"><i>{{index+1}}.</i>{{item}}</li>
                </ul>
            </div>

            <!-- 教育背景 -->
            <module-box><span slot="module-title">教育背景</span></module-box>
            <div class="education">
                <div style="display:flex;flex-wrap: wrap;font-size: 20px;">
                    <span style="width: 50%;">湖南科技大学</span>
                    <span style="width: 50%;">2018.09 - 2022.07</span>
                    <span style="width: 50%;font-size: 16px;color : #999;">计算机科学与技术</span>
                </div>
            </div>


            <!-- 个人描述 -->
            <module-box><span slot="module-title">个人描述</span></module-box>
            <div class="readme">
                <p><i class="glyphicon glyphicon-hand-right"></i>
                    {{this.$store.state.admin.information.description}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Title from 'components/content/Title'
    import ModuleBox from 'components/content/ModuleBox'
    import Infomation from './childComps/Infomation'

    import Progress from "easy-circular-progress";

    export default {
        name: 'Profile',
        components: {
            Title,
            ModuleBox,
            Infomation,
            Progress
        },
        data() {
            return {
                skills: [
                    {
                        name: 'html',
                        progress: 80
                    },
                    {
                        name: 'css',
                        progress: 75
                    },
                    {
                        name: 'JavaScript',
                        progress: 72.3
                    },
                    {
                        name: 'node',
                        progress: 50
                    },
                    {
                        name: 'vue',
                        progress: 56
                    },
                    {
                        name: 'webpack',
                        progress: 65
                    }
                ],
                professionalSkills: [
                    '掌握css、html等前端基础',
                    '使用js进行编程, 了解 c 、 java',
                    '掌握vue基础 和 node 基础',
                    '会使用git 、cocos creator',
                    '了解基本的数据结构和算法'
                ]
            }
        },
        mounted() {

        },
    }
</script>
<style scoped>
    .profile {
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        /* padding-left: 20px;
        padding-right: 20px; */
        background-color: #f4f4f4;
    }

    .readme {
        font-size: 16px;
        line-height: 25px;
        color: #999999;
        padding-top: 15px;
    }

    .skill {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* width: 100%; */
    }

    .bar {
        width: 30%;
        padding: 15px 0;
        text-align: center;
    }

    .hobbies {
        font-size: 14px;
        color: #999999;
        font-family: '宋体';
        padding-top: 10px;
        margin-bottom: 40px;
    }

    .pro-skill {
        padding-top: 10px;
        line-height: 30px;
        font-size: 16px;
        color: #999999;
        margin-bottom: 40px;
    }

    .education {
        padding-top: 10px;
        margin-bottom: 40px;
    }

    .readme {
        margin-bottom: 50px;
    }

    @media screen and (max-width: 767px) {
        .profile {
            height: auto;
        }

        .bar {
            width: 45%;
        }
    }
</style>