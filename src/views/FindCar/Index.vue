<template>
    <div class="find-car">
        <div class="banner">
            <div class="search-bar flex">
                <img src="../../assets/images/findcar/search.png" alt="">
                <form action="javascript:return true;" @submit.prevent>
                    <input ref="searchInput" @keyup.13="tapToSearch" autocomplete="off" v-model.trim="carName" type="search" placeholder="搜索你要找的车">
                </form>
            </div>
            <div class="history">
                <p class="title">历史搜索：</p>
                <p @click="historyClick(item)" v-for="(item, index) in historyList" :key="index">{{item}}</p>
            </div>
        </div>
        <div class="pd-40 car-type">
            <div ref="typeList" class="list typeList">
                <div :style="{backgroundImage: 'url('+item.bgUrl+')'}" v-for="item in carTypeList" :key="item.id" class="item border-radius-8">
                    <div @click="quickSearch(item)" class="flex">
                        <p>{{item.name1}}</p>
                        <p>{{item.name2}}</p>
                    </div>
                </div>
            </div>
            <div ref="huakuai" class="huakuai">
                <div ref="huakuaiInner" :style="{width: huakuaiWidth, left: huakuaiLeft}"></div>
            </div>
        </div>
        <div class="border-eee"></div>
        <!-- 找车推荐 -->
        <div class="recommend pd-40">
            <div class="title flex">
                <h2 class="fontSize-32 bold">365找车推荐</h2>
                <p class="color-999 fontSize-24">共{{recommendCount}}辆</p>
            </div>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="list">
                    <div @click="details(item.id)" class="item" v-for="item in recommendList" :key="item.id">
                        <van-image
                            width="100%"
                            fit="cover"
                            lazy-load
                            :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                        />
                        <!-- <img class="border-radius-8" :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''" alt=""> -->
                        <p class="fontSize-28 bold">{{item.params['基本信息']&&item.params['基本信息']['品牌车系']}}</p>
                        <p class="fontSize-28 bold">{{item.params['基本信息']&&item.params['基本信息']['具体车型']}}</p>
                        <p class="fontSize-24">{{item.params['基本信息']&&item.params['基本信息']['车辆归属地']}}/{{item.params['基本信息']&&item.params['基本信息']['表显里程']}}万公里/{{item.params['基本信息']&&item.params['基本信息']['初次上牌']}}</p>
                        <p class="fontSize-28 bold">{{item.params['价格说明']&&item.params['价格说明']['个人零售价']}}万</p>
                        <div class="tips">{{item.tips}}</div>
                    </div>
                </div>
            </van-list>
            
        </div>

        
    </div>
</template>

<script>
import {getQueryString} from '../../assets/js/utils.js';
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
export default {
    data(){
        return {
            // 下拉加载更多
            loading: false,
            finished: false,
            pageNum: 0,

            carName: '',
            historyList: [],
            carTypeList: [
                {
                    id: 0,
                    name1: '家用',
                    name2: '经济',
                    bgUrl: require('../../assets/images/findcar/jyjj.png')
                },
                {
                    id: 1,
                    name1: '商务',
                    name2: '接待',
                    bgUrl: require('../../assets/images/findcar/swjd.png')
                },
                {
                    id: 2,
                    name1: '豪华',
                    name2: '大气',
                    bgUrl: require('../../assets/images/findcar/hhdq.png')
                },
                {
                    id: 3,
                    name1: '自驾',
                    name2: '越野',
                    bgUrl: require('../../assets/images/findcar/zjyy.png')
                },
                {
                    id: 4,
                    name1: '帅酷',
                    name2: '炸天',
                    bgUrl: require('../../assets/images/findcar/skzt.png')
                },
                {
                    id: 5,
                    name1: '二胎',
                    name2: '专车',
                    bgUrl: require('../../assets/images/findcar/etzc.png')
                },
                {
                    id: 6,
                    name1: '全部',
                    name2: '车辆',
                    bgUrl: require('../../assets/images/findcar/all.png')
                }
            ],
            recommendCount: 0,//推荐车辆数
            recommendList: [],
            huakuaiWidth: '',//滑块宽度
            huakuaiLeft: '',//滑块距离左端距离,
        }
    },
    mounted(){
        const that = this;
        document.querySelector('.typeList').addEventListener('scroll',this.typeListMove);
        this.huakuaiWidth = this.$refs.huakuai.clientWidth*((this.$refs.typeList.clientWidth*this.$refs.typeList.clientWidth)/(this.$refs.typeList.scrollWidth*this.$refs.typeList.scrollWidth)) + 'px';
        if(!localStorage.openid) {
            var $appId = 'wx4335e535e7e39193'
            var $redirectUri = encodeURI('http://yingyanchaxun.com/car_dealer/dist/index.html');
            var code_front = getQueryString('code')
            if(!code_front) {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$appId+'&redirect_uri='+$redirectUri+'&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect'
            } else {
                that.$http({
                    method: 'post',
                    url: '/api/car_dealer_index.php?s=/Home/User/getopenid',
                    async: false,
                    data: that.qs.stringify({
                        code_front: code_front
                    })  
                })  
                .then(function(res){
                    if(res.data.code == 0) {
                        localStorage.openid = res.data.data.openid;
                        // that.recommend();
                        that.searchHistory();
                    } else {
                        alert(res.data.msg);
                    }
                })  
            }   
        }else{
            // that.recommend();
            that.searchHistory();
        }  
    },
    activated() {
        this.searchHistory();
        this.carName = '';
    },
    methods: {
        onLoad() {
            this.loading = false;
            this.pageNum++
            this.recommend(this.pageNum);
        },
        // 推荐列表
        recommend(pageNum){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/RecommendList',
                data: this.qs.stringify({
                    page_num: pageNum,
                    page_cnt: 10
                })
            })
            .then( res => {
                if(res.data.data.list.length == 0){
                    this.recommendCount = res.data.data.total_count;
                    this.loading = false;
                    this.finished = true;
                }else{
                    this.recommendCount = res.data.data.total_count;
                    this.recommendList = [...this.recommendList,...res.data.data.list];
                }
                
            })    
        },





        typeListMove(){
            this.huakuaiLeft = (this.$refs.typeList.scrollLeft*this.$refs.huakuai.clientWidth)/this.$refs.typeList.clientWidth + 'px';
        },
        details(id){
            this.$router.push(`/cardetails?id=${id}`);
        },
        // 搜索
        tapToSearch(){
            if(this.carName.length == 0){
                this.$toast('车名不能为空');
            }else{
                sessionStorage.carName = this.carName;
                this.$router.push(`/allcars`);
            }
        },
        // 快速搜索
        quickSearch(item){
            this.$router.push(`/allcars?type=quick&name=${item.name1}${item.name2}`);
        },

        // 历史搜索
        searchHistory(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/SearchHistory',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                this.historyList = res.data.data;
            })  
        },

        // 历史搜索快速点击
        historyClick(item){
            sessionStorage.carName = item;
            this.$router.push(`/allcars`);
        },

        
    }
}
</script>

<style lang="scss" scoped>
    .find-car{
        padding-bottom: 100px;
    }
    .banner{
        width: 100%;
        height: 320px;
        background: url(../../assets/images/findcar/banner.png) no-repeat center;
        background-size: 100% 100%;
        overflow: hidden;
        padding: 0 30px;
        .search-bar{
            height: 88px;
            background-color: rgba(#ffffff, .96);
            border-radius: 8px;
            margin-top: 80px;
            align-items: center;
            padding: 0 40px;
            img{
                width: 28px;
                height: 28px;
            }
            form{
                flex: 1;
            }
            input{
                width: 100%;
                border: none;
                outline: none;
                margin-left: 30px;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                color: #666;
                background-color: inherit;
                -webkit-appearance: none;
            }
            input[type=search]::-webkit-search-cancel-button{
                -webkit-appearance: none;//此处就是去掉默认的小×
            }
        }
        .history{
            margin-top: 40px;
            p{
                float: left;
                font-size: 24px;
                color: #fff;
            }
            p.title{
                margin: 0;
            }
            p{
                margin-right: 30px;
            }
        }
    }
    .car-type{
        .list{
            overflow-x: auto;
            white-space: nowrap;
            .item:last-child{
                margin-right: 0;
            }
            .item{
                width: 160px;
                height: 160px;
                margin-right: 30px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
                position: relative;
                display: inline-block;
                div{
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    justify-content: center;
                    p{
                        color: #fff;
                        font-size: 32px;
                        font-weight: 900;
                        line-height: 1.5;
                        text-align: center;
                    }
                }
                
            }
        }
    }
    .huakuai{
        width: 80px;
        height: 4px;
        border-radius: 2px;
        background-color: #eee;
        margin: 30px auto 0;
        position: relative;
        div{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            height: 4px;
            border-radius: 2px;
            background-color: #716dff;
        }
    }
    .recommend{
        .title{
            justify-content: space-between;
            align-items: center;
        }
        .list{
            overflow: hidden;
            .item{
                margin-top: 40px;
                float: left;
                width: calc(50% - 15px);
                position: relative;
                .van-image{
                    display: block;
                    height: 240px;
                    width: 100%;
                    border-radius: 8px;
                    overflow: hidden;
                }
                p{
                    margin-top: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .tips{
                    position: absolute;
                    top: 10px;
                    left: 0;
                    color: #fff;
                    background-color: rgba(#ffa114, .8);
                    line-height: 32px;
                    font-size: 24px;
                    padding: 0 15px 0 10px;
                    border-top-right-radius: 16px;
                    border-bottom-right-radius: 16px;
                }
            }
            .item:nth-child(2n){
                margin-left: 30px;
            }
        }
    }
</style>