<template>
    <div>
        <div class="banner">
            <img src="../../assets/images/searchcar/weibao.png" alt="">
        </div>
        <div class="ressa">
            <div class="ct flex">
                <div>
                    <p class="bold fontSize-32">100+</p>
                    <p class="fontSize-28 color-999">查询品牌</p>
                </div>
                <div>
                    <p class="bold fontSize-32">08:30-20:00</p>
                    <p class="fontSize-28 color-999">查询时间</p>
                </div>
                <div>
                    <p class="bold fontSize-32">15分内</p>
                    <p class="fontSize-28 color-999">查询结果</p>
                </div>
            </div>
            <div class="cx flex">
                <input v-model.trim="vinCode" type="text" placeholder="请输入17位VIN码或扫描识别">
                <img @click="open" src="../../assets/images/my/saomiao.png" alt="">
            </div>
            <div @click="chaxun" class="ljcx">立即查询</div>

            <div class="shuoming">
                <p>常规品牌￥10元，特殊品牌￥10-50元；</p>
                <div @click="sm">
                    <p>详情</p>
                    <img v-show="tips" src="../../assets/images/searchcar/xia.png" alt="">
                    <img v-show="!tips" src="../../assets/images/searchcar/shang.png" alt="">
                </div>
            </div>
            <div v-show="!tips" class="tips">
                特殊品牌：宝马、长安福特、雷克萨斯、一汽大众、奔驰（巴博斯、smart）、广汽丰田、进口大众、广汽本田、林肯
            </div>
        </div>
        <!-- 选择扫描类型 -->
        <van-popup v-model="showType" position="bottom">
            <div class="img-picker">
                <div @click="jiashizheng">行驶证</div>
                <div @click="vinma">VIN码</div>
                <div @click="typeCancel">取消</div>
            </div>
        </van-popup>
        <!-- 图片选择 -->
        <van-popup v-model="showImg" position="bottom">
            <div class="img-picker">
                <div @click="camera">拍照</div>
                <div @click="album">从相册选择</div>
                <div @click="imgCancel">取消</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import wx from 'weixin-js-sdk';
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
export default {
    data(){
        return {
            tips: true,
            vinCode: '',
            showImg: false,

            // 选择扫描类型
            showType: false,
            saomiaoType: 'jsz',//jsz-扫描驾驶证，vin扫描车架号识别VIN码；
        }
    },
    mounted(){
        getOpenId(this);
        this.initJSSDK();
    },
    methods: {
        initJSSDK(){
            // let signLink =  /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl;
            this.$http({
                method: 'post', 
                url: '/api/car_dealer_index.php?s=/Home/Jssdk/getSignPackage',
                async: false,
                data: this.qs.stringify({
                    url: location.href.split('#')[0],
                })
            })
            .then(res => {
                wx.config({
                    debug: false, // 开启调试模式,
                    appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'chooseImage',
                        'uploadImage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
            })
        },
        sm(){
            this.tips = !this.tips;
        },
        // 选择拍照类型
        open(){
            this.showType = true;
        },
        imgCancel(){
            this.showImg = false;
        },
        jiashizheng(){
            this.saomiaoType = 'jsz';
            this.showType = false;
            this.showImg = true;
        },
        vinma(){
            this.saomiaoType = 'vin';
            this.showType = false;
            this.showImg = true;
        },
        typeCancel(){
            this.showType = false;
        },
        // 相机
        camera(){
            const that = this;
            that.showImg = false;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    wx.uploadImage({
                        localId: res.localIds.toString(),
                        isShowProgressTips: 1,
                        success: function (uploadRes) {
                            that.$toast.loading({
                                message: '识别中...',
                                forbidClick: true,
                                loadingType: 'spinner',
                                duration: 0
                            });
                            that.$http({
                                method: 'post',
                                url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                data: that.qs.stringify({
                                    openid: localStorage.openid,
                                    file_desc: '识别vin码',
                                    server_id: uploadRes.serverId
                                })
                            })
                            .then( saveRes => {
                                if(saveRes.data.code == 0){
                                    if(that.saomiaoType == 'jsz'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/TcOcr/VehicleLicenseOcr',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                fid: saveRes.data.data.fid
                                            })
                                        })
                                        .then( vinRes => {
                                            that.$toast.clear();
                                            if(vinRes.data.code==0){
                                                that.vinCode = vinRes.data.data.Vin;
                                                that.$toast(vinRes.data.msg);
                                            }else{
                                                that.$toast(vinRes.data.msg);
                                            };
                                        })
                                        .catch( err => {
                                            that.$toast.clear();
                                        })
                                    }else if(that.saomiaoType == 'vin'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/TcOcr/VinOcr',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                fid: saveRes.data.data.fid
                                            })
                                        })
                                        .then( vinRes => {
                                            that.$toast.clear();
                                            if(vinRes.data.code==0){
                                                that.vinCode = vinRes.data.data;
                                                that.$toast(vinRes.data.msg);
                                            }else{
                                                that.$toast(vinRes.data.msg);
                                            };
                                        })
                                        .catch( err => {
                                            that.$toast.clear();
                                        })
                                    }
                                    
                                }else{
                                    that.$toast.clear();
                                    that.$toast(saveRes.data.msg);
                                }
                            })
                            .catch( err => {
                                that.$toast.clear();
                            })
                        }
                    })
                }
            });
        },
        //相册选择
        album(){
            const that = this;
            that.showImg = false;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    wx.uploadImage({
                        localId: res.localIds.toString(),
                         isShowProgressTips: 1,
                         success: function (uploadRes) {
                            that.$toast.loading({
                                message: '识别中...',
                                forbidClick: true,
                                loadingType: 'spinner',
                                duration: 0
                            });
                            that.$http({
                                method: 'post',
                                url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                data: that.qs.stringify({
                                    openid: localStorage.openid,
                                    file_desc: '识别vin码',
                                    server_id: uploadRes.serverId
                                })
                            })
                            .then( saveRes => {
                                if(saveRes.data.code == 0){
                                    if(that.saomiaoType == 'jsz'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/TcOcr/VehicleLicenseOcr',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                fid: saveRes.data.data.fid
                                            })
                                        })
                                        .then( vinRes => {
                                            that.$toast.clear();
                                            if(vinRes.data.code==0){
                                                that.vinCode = vinRes.data.data.Vin;
                                                that.$toast(vinRes.data.msg);
                                            }else{
                                                that.$toast(vinRes.data.msg);
                                            };
                                        })
                                        .catch( err => {
                                            that.$toast.clear();
                                        })
                                    }else if(that.saomiaoType == 'vin'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/TcOcr/VinOcr',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                fid: saveRes.data.data.fid
                                            })
                                        })
                                        .then( vinRes => {
                                            that.$toast.clear();
                                            if(vinRes.data.code==0){
                                                that.vinCode = vinRes.data.data;
                                                that.$toast(vinRes.data.msg);
                                            }else{
                                                that.$toast(vinRes.data.msg);
                                            };
                                        })
                                        .catch( err => {
                                            that.$toast.clear();
                                        })
                                    }
                                }else{
                                    that.$toast.clear();
                                    that.$toast(saveRes.data.msg);
                                }
                            })
                            .catch( err => {
                                that.$toast.clear();
                            })
                        }
                    })
                }
            });
        },

        // 开始查询
        chaxun(){
            if(this.vinCode == ''){
                this.$toast('请输入VIN码');
                return;
            }
            this.$toast.loading({
                message: '查询中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration: 0
            });
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/CheckVin',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    vin: this.vinCode
                })
            })
            .then( res => {
                sessionStorage.order_id = res.data.data.order_id;
                if(res.data.code == 0){
                    if(res.data.data.not_service_time == 1){
                        this.notServiceTime();
                    }else if(res.data.data.need_subscribe == 1){
                        this.needSubscribe();
                    }else{
                        // console.log(res);
                        this.searchPay();
                    }
                    this.$toast.clear();
                }else{
                    this.$toast(res.data.msg);
                    // this.searchPay();
                }
            })
            .catch( () => {
                this.$toast.clear();
            })
            return
            if(this.vinCode == ''){
                this.$toast('该品牌数据维护中');
                this.$toast('您输入的VIN码有误,请核对');
            }
        },

        // 未在查询时间
        notServiceTime(){
            this.$dialog.confirm({
                title: '查询提示',
                message: '未在查询时间，继续支付预约优先查询',
                confirmButtonText: '继续支付',

            })
            .then(() => {
                this.searchPay();
            })
            .catch(() => {

            });
        },
        // 品牌次数用完
        needSubscribe(){
            this.$dialog.confirm({
                title: '查询提示',
                message: '该品牌查询需提前预约，继续支付预约明日优先查询',
                confirmButtonText: '继续支付',

            })
            .then(() => {
                this.searchPay(); 
            })
            .catch(() => {

            });
        },
        // 跳转支付页面
        searchPay() {
            window.location.href = 'http://yingyanchaxun.com/api/car_dealer_index.php?s=/Home/Payment/SearchPay&openid=' + localStorage.openid + '&order_id=' + sessionStorage.order_id
        }
    }
}
</script>

<style lang="scss" scoped>
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }

    .ct{
        margin: 60px 0 80px;
        justify-content: space-around;
        p{
            text-align: center;
        }
        .color-999{
            margin-top: 24px;
        }
    }
    .cx{
        height: 98px;
        background-color: #f8f8f8;
        border: 1PX solid #ccc;
        margin: 0 40px;
        align-items: center;
        padding: 0 40px 0 20px;
        border-radius: 8px;
        input{
            border: none;
            background-color: #f8f8f8;
            flex: 1;
            height: 80px;
            margin-right: 40px;
            font-size: 28px;
        }
        img{
            width: 40px;
            height: 40px;
        }
        input::-webkit-input-placeholder {
            color: #333;
        }
    }
    .shuoming{
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        p{
            font-size: 28px;
        }
        div{
            display: flex;
            align-items: center;
            img{
                width: 24px;
                height: 14px;
                margin-left: 24px;
            }
        }
    }
    .tips{
        padding: 0 40px;
        font-size: 28px;
        color: #999;
        line-height: 2;
        margin-top: 20px;
    }
    .ljcx{
        height: 98px;
        line-height: 98px;
        margin: 60px 40px;
        text-align: center;
        color: #fff;
        font-size: 28px;
        background-color: #716dff;
        border-radius: 8px;
    }
    .img-picker{
        div{
            line-height: 108px;
            text-align: center;
            font-size: 28px;
            border-bottom: 1PX solid #ddd;
        }
        div:last-child{
            border: none;
        }
    }
</style>
