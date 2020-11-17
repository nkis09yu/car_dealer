<template>
    <div class="poster">
        <div class="cont">
            <img class="post" :src="posterImg[posterIndex].url" alt="">
            <div class="head flex">
                <img :src="headimgurl" alt="微信头像">
                <div>
                    <p>你好，我是{{nickname}}</p>
                    <p>向你推荐一个二手车信息服务平台</p>
                </div>
            </div>
            <div class="bot flex">
                <img :src="qrcode" alt="二维码">
                <div>
                    <p class="p1 bold">长按识别关注[365找车]</p>
                    <p class="p2">推广海报有效期至：2020-08-09</p>
                    <p class="p3">注：到期可再次申请</p>
                </div>
            </div>
            <img v-show="showScreenshot" class="screenshot" :src="screenshot" alt="">
        </div>
        <div class="handle flex">
            <div @click="change" class="flex">
                <img src="../../assets/images/my/change.png" alt="换一张">
                <p class="change">换一张</p>
            </div>
            <div class="flex">
                <p @click="download" class="download bg-yellow">获取海报</p>
                <p @click="share" class="share bg-blue">分享海报</p>
            </div>
        </div>
        <!-- <div class="fx">
            <div class="dd">
                <h1>长按上方海报可保存到手机，也可</h1>
                <p  @click="share">分享链接></p>
            </div>
            <div @click="change" class="flex cc">
                <img src="../../assets/images/my/change.png" alt="换一张">
                <p class="change">换一张</p>
            </div>
        </div> -->
        <!-- 引导分享 -->
        <van-overlay class="share-poster" :show="showShare">
            <div class="wrapper flex">
                <img src="../../assets/images/my/share-poster.png" alt="分享引导">
                <p @click="showShare = false">我知道了</p>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
    data(){
        return {
            posterIndex: 0,
            posterImg: [
                {
                    url: require('../../assets/images/my/poster1.jpg')
                },
                {
                    url: require('../../assets/images/my/poster2.jpg')
                },
                {
                    url: require('../../assets/images/my/poster3.jpg')
                }
            ],
            headimgurl: '',
            showShare: false,
            nickname: '',
            qrcode: '',
            screenshot: '',
            showScreenshot: false,
        }
    },
    mounted(){
        this.init();
        this.initJSSDK();
    },
    methods: {
        initJSSDK(){
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
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: '365车源',
                        desc: '专业二手车信息服务平台',
                        link: 'http://yingyanchaxun.com/car_dealer/dist/index.html',
                        imgUrl: this.headimgurl,
                        success: function () {},
                        cancel: function () {}
                    });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: '365车源',
                        desc: '专业二手车信息服务平台。',
                        link: 'http://yingyanchaxun.com/car_dealer/dist/index.html',
                        imgUrl: this.headimgurl,
                        success: function () {},
                        cancel: function () {}
                    });
                })
                
            })
        },
        change(){
            this.showScreenshot = false;
            if(this.posterIndex>=2){
                this.posterIndex = 0
            }else{
                this.posterIndex ++;
            };

            console.log(this.posterIndex+1);
        },
        // 下载海报
        download(){
            this.$dialog.alert({
                title: '获取提示',
                message: '获取成功，请留意公众号推送消息'
            })
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Haibao/index',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    poster_id: this.posterIndex + 1
                })
            })
        },
        share(){
            this.showShare = true;
        },
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/login',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                this.nickname = res.data.data.nickname;
                this.headimgurl = res.data.data.headimgurl;
            });
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Member/search',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                this.qrcode = res.data.data.my_qrcode;
            })    
        },

    }
}
</script>

<style lang="scss" scoped>
    .poster{
        background-color: #f8f8f8 !important;        
        .cont{
            position: relative;
            img.post{
                width: 100%;
            }
            .head{
                position: absolute;
                top: 60px;
                left: 60px;
                right: 60px;
                img{
                    width: 88px;
                    height: 88px;
                    border-radius: 44px;
                }
                div{
                    flex: 1;
                    margin-left: 24px;
                    p{
                        color: #fff;
                        font-size: 28px;
                        line-height: 1.5;
                    }
                }
            }
            .bot{
                position: absolute;
                left: 60px;
                right: 60px;
                bottom: 50px;
                img{
                    width: 140px;
                    height: 140px;
                    border: 1PX solid #ccc;
                }
                div{
                    flex: 1;
                    margin-left: 24px;
                    p{
                        font-size: 28px;
                    }
                    p.p2{
                        margin-top: 24px;
                    }   
                    p.p3{
                        margin-top: 24px;
                        color: #999;
                    }
                }
            }
            img.screenshot{
                z-index: 888;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
            }
        }

        .fx{
            overflow: hidden;
            .dd{
                padding-top: 40px;
                font-size: 32px;
                text-align: center;
                font-weight: 999;
                h1{
                    display: inline-block;
                }
                p{
                    color: #716dff;
                    display: inline-block;
                    margin-left: 5px;
                }
            }
            div.cc{
                align-items: center;
                justify-content: center;
                padding-top: 40px;
                padding-bottom: 40px;
                img{
                    width: 40px;
                    height: 40px;
                }
                p.change{
                    font-size: 28px;
                    margin-left: 24px;
                }
            }
        }
        .handle{
            padding: 50px 40px;
            align-items: center;
            justify-content: space-between;
            div{
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                p.change{
                    font-size: 28px;
                    margin-left: 24px;
                }
            }
            .download,.share{
                width: 208px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                border-radius: 8px;
                color: #fff;
                font-size: 28px;
            }
            .share{
                margin-left: 40px;
            }
        }

        .share-poster{
            z-index: 999;
            .wrapper{
                width: 100%;
                height: 100%;
                position: relative;
                img{
                    width: 664px;
                    height: 518px;
                    display: block;
                    margin: 40px auto;
                }
                p{
                    position: absolute;
                    bottom: 240px;
                    z-index: 9999999;
                    color: #fff;
                    font-size: 28px;
                    width: 240px;
                    height: 80px;
                    line-height: 76px;
                    text-align: center;
                    border: 2Px solid #fff;
                    border-radius: 8px;
                    left: 50%;
                    margin-left: -120px;
                }
            }
        }
    }
</style>