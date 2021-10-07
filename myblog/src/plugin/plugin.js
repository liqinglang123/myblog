import { get, post } from "../utils/request"
import { getYMD, getYMDHMS } from '@/utils/date'

// 自定义插件
export default {
    install: function (Vue) {
        // 给Vue混入成员
        Vue.mixin({
            methods: {
                $get(url, params) {
                    return get(url, params
                    )
                },
                $post(url, params) {
                    return post(url, params)
                },
                $getYMD(str){
                    return getYMD(str)
                },
                $getYMDHMS(str){
                    return getYMDHMS(str)
                }
            }
        });
    }
}