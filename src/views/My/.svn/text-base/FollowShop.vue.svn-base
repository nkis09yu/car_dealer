<template>
    <div class="collect">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="list">
                <div @click="details(follow)" v-for="(follow, index) in followList" :key="index" class="item">
                    <!-- <div class="top flex">
                        <div v-if="follow.verify_status" class="img">
                            <img src="../../assets/images/5.png" alt="">
                        </div>
                        <div v-if="!follow.verify_status" class="img">
                            <img class="mask" src="../../assets/images/5.png" alt="">
                            <div class="tips">关闭</div>
                        </div>
                        <div :class="!follow.verify_status ? 'mask' : ''" class="cont">
                            <p class="p1 bold">{{follow.company}}</p>
                            <p class="p2">在售5辆/已售236辆/商家</p>
                            <p class="p3 ellipsis">地址：{{follow.address}}</p>
                        </div>
                    </div> -->
                    <div class="top flex">
                        <div class="img">
                            <img :src="follow.files[0].file_url" alt="">
                        </div>
                        <div class="cont">
                            <p class="p1 bold">{{follow.verify_type == '车商认证' ? follow.company : follow.contact}}</p>
                            <p class="p2">在售{{follow.in_sale_count}}辆/已售{{follow.sold_out_count}}辆/{{follow.verify_type == '车商认证' ? '商家' : '个人'}}</p>
                            <p class="p3 ellipsis">地址：{{follow.address}}</p>
                        </div>
                    </div>
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
            followList: [],
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
                url: '/api/car_dealer_index.php?s=/Home/User/FollowList',
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
                            this.$toast.clear();
                            this.showNoDate = true;
                            document.querySelector('.van-list__finished-text').style.display = 'none';
                        }
                        this.loading = false;
                        this.finished = true;
                        
                    }else{
                        this.followList = [...this.followList,...res.data.data.list];
                    }
                }else{
                    this.$toast(res.data.msg);
                }
                this.$toast.clear();
            })
        },
        // 车商详情
        details(item){
            if(item.verify_status){
                this.$router.push(`/merchantdetails?id=${item.openid}`);
            }
        },


        
    },
    destroyed(){
        this.$toast.clear();
    }
}
</script>

<style lang="scss" scoped>
    .collect{
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
                    img{
                        width: 240px;
                        height: 180px;
                        border-radius: 8px;
                    }
                    div.cont{
                        overflow: hidden;
                        margin-left: 24px;
                        p.p1{
                            line-height: 1.5;
                            font-size: 28px;
                        }
                        p.p2{
                            margin-top: 24px;
                            color: #666;
                            font-size: 24px;
                        }
                        p.p3{
                            color: #666;
                            margin-top: 24px;
                            font-size: 24px;
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