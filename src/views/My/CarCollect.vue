<template>
    <div class="collect">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="list">
                <div @click="details(item)" v-for="(item, index) in collectList" :key="index" class="item">
                    <div class="top flex">
                        <van-image
                            v-if="item.sale_status=='在售'"
                            fit="cover"
                            lazy-load
                            :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                        />
                        <div v-if="item.sale_status=='已售'" class="img">
                            <van-image
                                class="mask"
                                fit="cover"
                                lazy-load
                                :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                            />
                            <div class="tips">已售</div>
                        </div>
                        <div v-if="item.sale_status=='下架'" class="img">
                            <van-image
                                class="mask"
                                fit="cover"
                                lazy-load
                                :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                            />
                            <div class="tips">下架</div>
                        </div>
                        <div :class="item.sale_status!='在售' ? 'mask' : ''" class="cont">
                            <p class="p1 bold">{{item.params['基本信息']&&item.params['基本信息']['具体车型']}}</p>
                            <p class="p2">{{item.params['基本信息']&&item.params['基本信息']['车辆归属地']}}/{{item.params['基本信息']&&item.params['基本信息']['表显里程']}}万公里/{{item.params['基本信息']&&item.params['基本信息']['初次上牌']}}</p>
                            <div class="flex">
                                <p class="p3 bold">{{item.params['价格说明']&&item.params['价格说明']['个人零售价']}}万</p>
                                <p class="p4">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.updated_at).toString()}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.sale_status!='在售'" @click="tongkuan(item.params['基本信息']['品牌车系'])" class="bot">看同款</div>
                </div>
            </div>
        </van-list>
        <div v-if="showNoDate" class="no-data">
            <img src="../../assets/images/my/no-data.png" alt="">
            <p>暂无相关记录</p>
        </div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
export default {
    data(){
        return {
            showNoDate: false,
            collectList: [],//收藏列表
            loading: false,
            finished: false,
            pageNum: 0,
        }
    },
    mounted(){
        getOpenId(this);
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        });
    },
    methods: {
        onLoad() {
            this.loading = false;
            this.pageNum++
            this.init(this.pageNum);
        },
        init(pageNum){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/CollectList',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    page_num: pageNum,
                    page_cnt: 10
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    if(res.data.data.list.length == 0){
                        if(this.pageNum == 1){
                            this.showNoDate = true;
                            document.querySelector('.van-list__finished-text').style.display = 'none';
                        }
                        this.loading = false;
                        this.finished = true;
                    }else{
                        this.collectList = [...this.collectList,...res.data.data.list];
                    }
                }else{
                    this.$toast(res.data.msg);
                }
                this.$toast.clear();
            })
            .catch( err => {
                this.$toast.clear();
            })
            
        },
        // 看同款
        tongkuan(item){
            this.$router.push(`/allcars?type=tk&name=${item}`);
        },
        // 跳转到汽车详情页面
        details(item){
            if(item.sale_status == '在售'){
                this.$router.push(`/cardetails?id=${item.id}`);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .collect{
        .van-skeleton{
            margin-top: 100px;
        }
        padding: 0 40px 40px;
        .list{
            .item{
                overflow: hidden;
                padding: 40px 0;
                border-bottom: 1PX solid #ddd;
                .top{
                    .mask{
                        opacity: .5;
                    }
                    .img{
                        position: relative;
                        .tips{
                            position: absolute;
                            width: 98px;
                            height: 98px;
                            color: #fff;
                            text-align: center;
                            line-height: 98px;
                            border-radius: 48px;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            background-color: rgba(0, 0, 0, 0.6);
                        }
                    }
                    .van-image{
                        display: block;
                        width: 240px;
                        height: 180px;
                        border-radius: 8px;
                        overflow: hidden;
                    }
         
                    div.cont{
                        flex: 1;
                        margin-left: 24px;
                        p.p1{
                            line-height: 1.5;
                            font-size: 28px;
                        }
                        p.p2{
                            margin-top: 24px;
                            font-size: 24px;
                            color: #666;
                        }
                        
                        div{
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 24px;
                            p.p3{
                                font-size: 28px;
                            }
                            p.p4{
                                color: #666;
                                font-size: 24px;
                            }
                        }
                    }
                }
                .bot{
                    float: right;
                    color: #fff;
                    background-color: #716dff;
                    border-radius: 8px;
                    line-height: 56px;
                    padding: 0 20px;
                    margin-top: 40px;
                }
            }
        }
    }
</style>