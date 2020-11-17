<template>
    <div class="tuiguang">
        <div class="list flex">
            <div @click="openCode" class="item">
                <img src="../../assets/images/my/erweima.png" alt="推广二维码">
                <p>推广二维码</p>
            </div>
            <div @click="openPoster" class="item">
                <img src="../../assets/images/my/haibao.png" alt="推广海报">
                <p>推广海报</p>
            </div>
            <div @click="openLink" class="item">
                <img src="../../assets/images/my/lianjie.png" alt="推广链接">
                <p>推广链接</p>
            </div>
        </div>

        <div class="dl yue flex">
            <div class="flex">
                <img src="../../assets/images/my/qb.png" alt="推荐">
                <p>账户余额：{{balance}}元</p>
            </div>
            <div @click="withdraw" class="dd">
                <p>提现</p>
                <img src="../../assets/images/my/right.png" alt="右箭头">
            </div>
        </div>
        <div @click="income" class="dl flex">
            <div class="flex">
                <img src="../../assets/images/my/shouyijilu.png" alt="推荐">
                <p>收益记录</p>
            </div>
            <img src="../../assets/images/my/right.png" alt="右箭头">
        </div>
        <div @click="withdrawrecord" class="dl flex">
            <div class="flex">
                <img src="../../assets/images/my/tixianjilu.png" alt="推荐">
                <p>提现记录</p>
            </div>
            <img src="../../assets/images/my/right.png" alt="右箭头">
        </div>
        <div @click="agreement" class="dl flex">
            <div class="flex">
                <img src="../../assets/images/my/guize.png" alt="推荐">
                <p>推广规则</p>
            </div>
            <img src="../../assets/images/my/right.png" alt="右箭头">
        </div>

        <!-- 推广二维码 -->
        <van-overlay class="code" :show="showCode" @click="showCode = false">
            <div class="wrapper flex" @click.stop>
                <img :src="qrcode" alt="">
                <p>长按保存到手机</p>
            </div>
        </van-overlay>

        <!-- 推广链接 -->
        <van-overlay class="pro-link" :show="showLink" @click="showLink = false">
            <div class="wrapper flex" @click.stop>
                <input disabled id="lianjie" type="text" v-model="qrcodeUrl">
                <p @click="fuzhi" class="p2">复制链接</p>
            </div>
        </van-overlay>

    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
export default {
    data(){
        return {
            showCode: false,
            showLink: false,
            qrcode: '',//二维码
            qrcodeUrl: '',//推广链接
            balance: 0,//账户余额
        }
    },
    mounted(){
        getOpenId(this);
        this.getqrcode();
        this.getBalances();
    },
    methods: {
        // 获取推广二维码
        getqrcode(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Member/search',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                if(res.data.code ==0){
                    this.qrcodeUrl = res.data.data.qrcode_url;
                    this.qrcode = res.data.data.my_qrcode;
                }else{
                    this.$toast(res.data.msg);
                }
            })
        },
        getBalances(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Withdraw/balances',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                if(res.data.code ==0){
                    this.balance = res.data.data.balance;
                }else{
                    this.$toast(res.data.msg);
                }
            })
        },
        // 复制链接
        fuzhi(){
            this.$copyText(this.qrcodeUrl)
            .then(
		        res => {
		          this.$toast("已成功复制，可直接去粘贴");
		        },
		        err => {
		          this.$toast("复制失败");
		        }
            )
        },
        // 打开推广二维码
        openCode(){
            this.showCode = true;
        },
        // 打开推广海报
        openPoster(){
            this.$router.push('/poster');
        },
        // 打开推广链接
        openLink(){
            this.showLink = true;
        },
        // 去提现
        withdraw(){
            this.$router.push('/withdraw');
        },
        // 收益记录
        income(){
            this.$router.push('/income');
        },
        // 提现记录
        withdrawrecord(){
            this.$router.push('/withdrawrecord');
        },
        // 推广协议
        agreement(){
            this.$router.push('/agreement');
        }
    }
}
</script>

<style lang="scss" scoped>
    .tuiguang{
        height: 100%;
        background-color: #f8f8f8 !important;
        margin-bottom: 0 !important;
        padding: 40px;
    }
    .list{
        background-color: #fff;
        border-radius: 8px;
        padding: 40px 60px;
        justify-content: space-between;
        .item{
            text-align: center;
            img{
                width: 98px;
                height: 98px;
            }
            p{
                font-size: 28px;
                margin-top: 24px;
            }
        }
    }
    .dl{
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
        div.flex{
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
        div.dd{
            display: flex;
            p{
                font-size: 28px;
                margin-right: 24px;
            }
        }
    }
    .yue{
        margin-top: 60px;
    }
    // 推广二维码
    .code{
        .wrapper{
            background-color: #fff;
            border-radius: 24px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 60px 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 480px;
                height: 480px;
            }
            P{
                display: inline-block;
                font-size: 28px;
                text-align: center;
                margin-top: 30px;
            }
        }
    }
    // 推广链接
    .pro-link{
        .wrapper{
            position: absolute;
            width: 640px;
            padding: 60px 80px;
            background-color: #fff;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 24px;
            input{
                font-size: 28px;
                line-height: 2;
                word-break: break-all;
                border: none;
                outline: none;
                background-color: #fff;
                text-align: center;
            }
            
            p.p2{
                width: 320px;
                height: 80px;
                line-height: 80px;
                border-radius: 8px;
                background-color: #716dff;
                color: #fff;
                font-size: 28px;
                text-align: center;
                margin-top: 60px;
            }
        }
    }
</style>