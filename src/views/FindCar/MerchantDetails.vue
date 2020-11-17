<template>
    <div class="merchant-details" v-if="showData">
        <!-- 轮播图 -->
        <van-swipe class="van-swipe" @change="onChange">
            <van-swipe-item @click="swiperClick(index)" v-for="(item, index) in swiperList" :key="index">
                <van-image
                    width="100%"
                    height="100%"
                    fit="cover"
                    lazy-load
                    :src="item"
                />
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">
                {{ current + 1 }}/{{swiperList.length}}
                </div>
            </template>
        </van-swipe>
        <div class="pd-40 jianjie">
            <p class="bold fontSize-32 marginTop-24">{{dealerInfo.company}}</p>
            <p class="color-666 fontSize-24 marginTop-24">在售{{dealerInfo.in_sale_count}}辆/已售{{dealerInfo.sold_out_count}}辆/{{dealerInfo.verify_type == '车商认证' ? '商家' : '个人'}}</p>
            <p class="color-666 fontSize-24 marginTop-24">地址：{{dealerInfo.address}}</p>
        </div>
        <div class="border-eee"></div>
        <div class="pd-40 tc">
            <div class="tab flex">
                <div @click="tongcheng" :class="tcTxt == 'tongcheng' ? 'tab-item-active' : ''" class="tab-item">在售车辆 {{dealerInfo.in_sale_count}}</div>
                <div @click="chengjiao" :class="tcTxt == 'chengjiao' ? 'tab-item-active' : ''" class="tab-item">已售车辆 {{dealerInfo.sold_out_count}}</div>
            </div>
            <!-- 在售车辆 -->
            <div v-show="tcTxt == 'tongcheng'" class="tongcheng">
                <div class="list">
                    <div @click="details(item.id)" class="item flex" v-for="(item, index) in zaishouList" :key="index" v-if="item.params['基本信息']">
                        <van-image
                            fit="cover"
                            lazy-load
                            :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                        />
                        <div class="flex">
                            <p class="p1 bold fontSize-28">{{item.params['基本信息']['具体车型']}}</p>
                            <p class="p2 color-666 ellipsis">{{item.params['基本信息']['车辆归属地']}}/{{item.params['基本信息']['表显里程']}}万公里/{{item.params['基本信息']['初次上牌']}}年</p>
                            <p class="p3 flex">
                                <em class="fontSize-28 bold">{{item.params['价格说明']['个人零售价']}}万</em>
                                <em class="color-666 fontSize-28">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.updated_at).toString()}}</em>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="showZaishou" class="no-data">
                    <img src="../../assets/images/my/no-data.png" alt="">
                    <p>暂无相关记录</p>
                </div>
            </div>
            <!-- 已售车辆 -->
            <div v-show="tcTxt == 'chengjiao'" class="chengjiao">
                <div class="list">
                    <div @click="details(item.id)" class="item flex" v-for="(item, index) in yishouList" :key="index" v-if="item.params['基本信息']">
                        <van-image
                            fit="cover"
                            :src="item.images['外观照片'] ? item.images['外观照片'][0].file_url : ''"
                        />
                        <div class="flex">
                            <p class="p1 bold fontSize-28">{{item.params['基本信息']['具体车型']}}</p>
                            <p class="p2 color-666 ellipsis">{{item.params['基本信息']['车辆归属地']}}/{{item.params['基本信息']['表显里程']}}万公里/{{item.params['基本信息']['初次上牌']}}年</p>
                            <p class="p3 flex">
                                <em class="fontSize-28 bold">{{item.params['价格说明']['个人零售价']}}万</em>
                                <em class="color-666 fontSize-28">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.updated_at).toString()}}</em>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="showYishou" class="no-data">
                    <img src="../../assets/images/my/no-data.png" alt="">
                    <p>暂无相关记录</p>
                </div>
            </div>
        </div>
        <div class="bot-bar flex">
            <div @click="collectClick" class="shoucang flex">
                <img v-show="!collect" src="../../assets/images/findcar/shoucang.png" alt="">
                <img v-show="collect" src="../../assets/images/findcar/shoucang-ac.png" alt="">
                <p>{{!collect ? '关注商家' : '取消关注'}}</p>
            </div>
            <div @click="contact" class="lianxi">联系商家</div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {getOpenId} from '../../assets/js/utils.js';
import { ImagePreview, Swipe, SwipeItem} from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
    data(){
        return {
            current: 0,
            tcTxt: 'tongcheng',
            collect: 0,
            phone: '',
            swiperList: [],
            showData: false,
            dealerInfo: {},//商家详情
            zaishouList: [],//在售列表
            yishouList: [],//已售列表
            showYishou: false,
            showZaishou: false
        }
    },
    mounted(){
        getOpenId(this);
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        }),
        this.init();
        this.zaishou();
        this.yishou();
    },
    methods: {
        // 初始化商家信息
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/SearchDealerInfo',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    dealer_openid: this.$route.query.id
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.dealerInfo = res.data.data;
                    this.collect = Number(res.data.data.is_follow);
                    this.phone = res.data.data.phone;
                    if(res.data.data.verify_type == '车商认证'){
                        for(let i=0;i<res.data.data.files.length - 3;i++){
                            this.swiperList.push(res.data.data.files[i].file_url);
                        };
                    }else{
                        
                    }
                }else{
                    this.$toast(res.data.msg);
                };
                this.$toast.clear();
                this.showData = true;
            })
            .catch( err => {
                console.log(err);
            })
        },
        // 在售车辆
        zaishou(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/search',
                data: this.qs.stringify({
                    openid: this.$route.query.id,
                    sale_status: '在售',
                    page_num: 1,
                    page_cnt: 99
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.zaishouList = res.data.data.list;
                    this.zaishouList.length == 0 ? (this.showZaishou = true) : (this.showZaishou = false);
                    if(this.swiperList.length == 0) this.swiperList.push(this.zaishouList[0].images['外观照片'][0].file_url);
                    
                }else{
                    this.$toast(res.data.msg);
                }
            })
            .catch( err => {
                console.log(err);
            })
        },
        // 已售车辆
        yishou(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/search',
                data: this.qs.stringify({
                    openid: this.$route.query.id,
                    sale_status: '已售',
                    page_num: 1,
                    page_cnt: 99
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.yishouList = res.data.data.list;
                    this.yishouList.length == 0 ? (this.showYishou = true) : (this.showYishou = false);
                    if(this.swiperList.length == 0) this.swiperList.push(this.zaishouList[0].images['外观照片'][0].file_url);
                }else{
                    this.$toast(res.data.msg)
                }
            })
            .catch( err => {
                console.log(err);
            })
        },
        // 跳转到详情页面
        details(id){  
            this.$router.push('/cardetails?id='+id                                                                                                                                           )            
        },
        swiperClick(i){
            ImagePreview({
                closeOnPopstate: true,
                images: this.swiperList,
                startPosition: i
            })
        },
        onChange(index){
            this.current = index
        },
        tongcheng(){
            this.tcTxt = 'tongcheng'
        },
        chengjiao(){
            this.tcTxt = 'chengjiao'
        },
        contact(){
            window.location.href = `tel:${this.dealerInfo.phone}`;
            return;
            this.$dialog.confirm({
                title: '联系商家',
                message: '是否拨打该商家电话？',
                cancelButtonText: '取消',                          
                cancelButtonColor: '#333',
                confirmButtonText: '拨打',
                confirmButtonColor: '#716DFF'
            }) 
            .then(() => {
                // on confirm
                window.location.href = `tel:${this.dealerInfo.phone}`
            })
            .catch(() => {
                // on cancel
            });            
        },
        // 收藏车辆
        collectClick(){
            if(this.collect){
                this.follow(0);
            }else{
                this.follow(1);
            }
            this.collect = !this.collect;
        },
        // 关注店铺
        follow(isFollow){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/Follow',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    follow_id: this.dealerInfo.id,
                    is_follow: isFollow
                })
            })
            .then( res => {
                if(isFollow){
                    this.$toast('关注成功');
                }else{
                    this.$toast('已取消关注');
                }
            })
            .catch( err => {
                console.log(err);
            })
        }
    }
}
</script>
 
<style lang="scss" scoped>
    .merchant-details{
        padding-bottom: 100px;
    }
    .tab{
        .tab-item{
            font-size: 32px;
            margin-right: 60px;
            position: relative;
        }
        .tab-item-active{
            font-weight: 900;
            color: #716dff;
        }
        .tab-item-active::after{
            content: '';
            width: 64px;
            height: 2PX;
            background-color: #716dff;
            position: absolute;
            bottom: -16px;
            left: 50%;
            margin-left: -32px;
        }
    }
    .van-swipe{
        height: 480px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .custom-indicator {
        position: absolute;
        right: 40px;
        bottom: 30px;
        padding: 0 20px;
        height: 48px;
        line-height: 48px;
        font-size: 24px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
    }
    .marginTop-24{
        margin-top: 24px;
    }
    .jianjie{
        .biaoqian{
            display: inline-block;
            color: #fff;
            background-color: #ffa114;
            border-radius: 8px;
            line-height: 32px;
            padding: 0 10px;
        }
        div{
            align-items: flex-end;
            p:last-child{
                margin-left: 20px;
            }
        }
    }
    // 同城同款 成交价格
    .tc{
        // 同款同城
        .tongcheng{
            margin-top: 40px;
            
        }
        .list{
            .item{
                border-bottom: 1PX solid #ddd;
                padding: 30px 0;
                div.van-image{
                    width: 240px;
                    height: 180px;
                    border-radius: 8px;
                    overflow: hidden;
                } 
                div.flex{
                    margin-left: 24px;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow: hidden;
                    .p1{
                        line-height: 1.5;
                    }
                    .p2{
                        font-size: 24px;
                    }
                    .p3{
                        justify-content: space-between;
                        align-items: flex-end;
                    }
                }
            }
        }
        // 成交价格
        .chengjiao{
            margin-top: 40px;
            
        }
    }
    .bot-bar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 98px;
        border-top: 1PX solid #eee;
        padding: 0 40px;
        background-color: #fff;
        z-index: 1000;
        justify-content: space-between;
        align-items: center;
        .shoucang{
            align-items: center;
            img{
                width: 40px;
                height: 40px;
            }
            p{
                font-size: 28px;
                margin-left: 16px;
            }
        }
        .lianxi{
            font-size: 28px;
            height: 80px;
            width: 320px;
            color: #fff;
            background-color: #716dff;
            border-radius: 8px;
            text-align: center;
            line-height: 80px;
        }
    }
</style>