<template>
    <div class="my">
        <!-- 头部 -->
        <div class="head flex">
            <div class="left flex">
                <img :src="headImg" alt="头像">
                <div class="xx">
                    <!-- <p @click="login" class="phone bold">未登录</p> -->
                    <p class="phone bold">{{phone}}</p>
                    <div class="flex">
                        <p v-if="showVerify" class="p1">未认证</p>
                        <p @click="verify(verifyType)" v-if="!showVerify" class="color-yellow p1">{{verifyType}}</p>
                        <p v-if="showVerify" @click="renzheng" class="p2">立即认证</p>
                        <!-- <p @click="renzheng" class="p2">立即认证</p> -->
                    </div>
                </div>
            </div>
            <div @click="personal" class="right">
                <img src="../../assets/images/my/right.png" alt="右箭头">
            </div>
        </div>

        <div class="szl flex">
            <div @click="collect">
                <p class="p1 bold">{{collectCnt}}</p>
                <p class="p2">收藏车辆</p>
            </div>
            <div @click="follow">
                <p class="p1 bold">{{followCnt}}</p>
                <p class="p2">关注店铺</p>
            </div>
            <div @click="history">
                <p class="p1 bold">{{visitCnt}}</p>
                <p class="p2">浏览记录</p>
            </div>
        </div>

        <div class="cf flex">
            <div @click="guanli" class="flex guanli">
                <img src="../../assets/images/my/guanli.png" alt="车辆管理">
                <p>车辆管理</p>
            </div>
            <div @click="release" class="flex">
                <img src="../../assets/images/my/fabu.png" alt="发布车辆">
                <p>发布车辆</p>
            </div>
        </div>
        <!-- 推荐 -->
        <div @click="tuiguang" class="tuijian flex">
            <div class="flex">
                <img src="../../assets/images/my/tuijian.png" alt="推荐">
                <p>推荐“查车”赚钱</p>
            </div>
            <img src="../../assets/images/my/right.png" alt="右箭头">
        </div>
        <!-- 意见反馈 -->
        <div @click="feedback" class="yijian flex">
            <div class="flex">
                <img src="../../assets/images/my/yijian.png" alt="意见反馈">
                <p>意见反馈</p>
            </div>
            <img src="../../assets/images/my/right.png" alt="右箭头">
        </div>
        <!-- 认证 -->
        <van-overlay :show="showRenzheng" @click="showRenzheng = false">
            <div class="wrapper flex" @click.stop>
               <div @click="geren" class="flex">
                   <img src="../../assets/images/my/geren.png" alt="个人">
                   <p>我是个人</p>
               </div>
               <div @click="carDealer" class="flex">
                   <img src="../../assets/images/my/cheshang.png" alt="车商">
                   <p>我是车商</p>
               </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
export default {
    data(){
        return {
            verifyStatus: false,//认证状态
            headImg: '',//头像
            phone: '',//手机号
            showRenzheng: false,
            showVerify: false,
            verifyType: '',
            collectCnt: 0,//收藏个数
            followCnt: 0,//关注个数
            visitCnt: 0,//历史浏览个数
        }
    },
    mounted(){
        getOpenId(this);
        this.init();
        this.tabinfo();
        this.verification();
    },
    activated(){
        this.init();
        this.tabinfo();
        this.verification();
    },
    methods: {
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/login',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                console.log(res);
                if(res.data.code == 0){
                    this.headImg = res.data.data.headimgurl;
                    this.phone = res.data.data.nickname;
                }else{
                    this.$toast(res.data.msg);
                }
            })
        },
        // 查询收藏车辆、关注店铺、浏览记录
        tabinfo(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/Tabinfo',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.collectCnt = res.data.data.collect_cnt;
                    this.followCnt = res.data.data.follow_cnt;
                    this.visitCnt = res.data.data.visit_cnt;
                }else{
                    this.$toast(res.data.msg);
                }
            })
        },
        // 查询认证状态
        verification(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/Verification',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                if(res.data.data.length==0){
                    this.showVerify = true;
                    this.verifyStatus = false;
                }else if(res.data.data.verify_status == "0"){
                    this.showVerify = false;
                    this.verifyType = '认证中'
                    this.verifyStatus = false;
                }else if(res.data.data.verify_status == "1"){
                    this.showVerify = false;
                    this.verifyType = res.data.data.verify_type;
                    this.verifyStatus = true;
                }
            })
            
        },
        verify(t){
            if(t == '认证中'){
                this.$dialog.alert({
                    title: '认证提示',
                    message: '认证中，请保持电话通畅',
                    confirmButtonText: '我知道了',
                    confirmButtonColor: '#716dff'
                });
            }else if(t == '个人认证'){
                this.$router.push('/editpersonal');
            }else if(t == '车商认证'){
                this.$router.push('/editcardealer');
            }
        },
        // 登录
        login(){
            this.$router.push('./login');
        },
        // 立即认证
        renzheng(){
            this.showRenzheng = true;
        },
        // 车辆管理
        guanli(){
            // this.$router.push('/vehiclemanagement');
            // return
            if(this.verifyStatus){
                this.$router.push('/vehiclemanagement');
            }else{
                this.$toast('请您先认证');
            }
        },
        // 推广赚钱
        tuiguang(){
            this.$router.push('/popularize');
        },
        // 意见反馈
        feedback(){
            this.$router.push('/feedback');
        },
        // 车辆收藏
        collect(){
            this.$router.push('/carcollect');
        },
        // 关注店铺
        follow(){
            this.$router.push('/followshop');
        },
        // 浏览记录
        history(){
            this.$router.push('/history');
        },
        // 发布车辆
        release(){
            // this.$router.push('/release');
            // return
            if(this.verifyStatus){
                this.$router.push('/release');
            }else{
                this.$toast('请您先认证');
            }
        },
        // 个人资料
        personal(){
            this.$router.push('/personaldata');
        },
        // 个人认证
        geren(){
            this.$router.push('/personal');
            this.showRenzheng = false;
        },
        // 车商认证
        carDealer(){
            this.$router.push('/cardealer');
            this.showRenzheng = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    #contanier{
        background-color: #f8f8f8;
    }
    .my{
        height: calc(100% - 100px);
        background-color: #f8f8f8;
        padding: 40px;
    }
    .head{
        justify-content: space-between;
        align-items: center;
        .left{
            align-items: center;
            img{
                width: 98px;
                height: 98px;
                border-radius: 49px;
            }
            .xx{
                margin-left: 24px;
                p.phone{
                    font-size: 32px;
                }
                div{
                    margin-top: 24px;
                    align-items: center;
                    p.p1{
                        font-size: 28px;
                    }
                    p.p2{
                        color: #fff;
                        background-color: #ffa114;
                        border-radius: 6px;
                        margin-left: 24px;
                        padding: 6px 10px;
                        font-size: 24px;
                    }
                }
            }
        }
        .right{
            img{
                width: 14px;
                height: 24px;
            }
        }
    }
    .szl{
        justify-content: space-between;
        margin-top: 60px;
        div{
            text-align: center;
            p.p1{
                font-size: 32px;
            }
            p.p2{
                color: #666;
                font-size: 28px;
                margin-top: 24px;
            }
        }
    }
    .cf{
        background-color: #fff;
        margin-top: 60px;
        height: 160px;
        align-items: center;
        border-radius: 8px;
        padding: 0 40px;
        div{
            flex: 1;
            align-items: center;
            img{
                width: 56px;
                height: 56px;
            }
            p{
                font-size: 28px;
                margin-left: 24px;
            }
        }
    }
    .tuijian,.yijian{
        background-color: #fff;
        height: 108px;
        margin-top: 40px;
        padding: 0 40px;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;
        img{
            width: 14px;
            height: 24px;
        }
        div{
            align-items: center;
            img{
                width: 40px;
                height: 40px;
            }
            p{
                margin-left: 24px;
                font-size: 28px;
            }
        }
    }
    .tuijian{
        margin-top: 60px;
    }
    // 认证
    .wrapper{
        width: 590px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 80px 90px;
        border-radius: 24px;
        justify-content: space-between;
        div{
            flex-direction: column;
            align-items: center;
            img{
                width: 98px;
                height: 98px;
            }
            p{
                font-size: 28px;
                margin-top: 40px;
            }
        }
    }
</style>