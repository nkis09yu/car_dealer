<template>
    <div class="withdraw">
        <div class="head">
            <p class="p1 bold">{{balance}}</p>
            <p class="p2">可提金额（元）</p>
        </div>
        <div class="tixian flex">
            <div class="flex">
                <img src="../../assets/images/my/tixianjie.png" alt="提现">
                <p>提现金额</p>
            </div>
            <input disabled type="number" v-model="balance" placeholder="请输入提现金额">
        </div>
        <p class="tips">注：5元起提，随时提现</p>
        <div class="type">
            <div @click="wechat" class="wechat">
                <div>
                    <img src="../../assets/images/my/wechat.png" alt="微信">
                    <p>微信提现</p>
                </div>
                <img v-show="showAlipay" src="../../assets/images/my/weixuanzhong.png" alt="">
                <img v-show="showWechat" src="../../assets/images/my/xuanzhong.png" alt="">
            </div>
            <div @click="alipay" class="alipay">
                <div>
                    <img src="../../assets/images/my/alipay.png" alt="支付宝">
                    <p>支付宝提现</p>
                </div>
                <img v-show="showWechat" src="../../assets/images/my/weixuanzhong.png" alt="">
                <img v-show="showAlipay" src="../../assets/images/my/xuanzhong.png" alt="">
            </div>
            <div v-show="showAlipay" class="alipay-account">
                <input ref="input" v-model.trim="alipayAccount" type="text" placeholder="请输入支付宝账号">
            </div>
        </div>
        <div @click="tixian" class="lijitixian">立即提现</div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
export default {
    data(){
        return {
            balance: 0,
            showWechat: true,
            showAlipay: false,
            type: 1,
            alipayAccount: ''
        }
    },
    directives: {
        focus: {
            inserted: function(el, { value }){
                if(value){
                    el.focus();
                }
            }
        }
    },
    mounted(){
        getOpenId(this);
        this.getBalances();
    },
    methods: {
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
        wechat(){
            this.showWechat = true;
            this.showAlipay = false;
            this.type = 1;
        },
        alipay(){
            this.type = 2;
            this.showAlipay = true;
            this.showWechat = false;
            this.$nextTick(function(){
                this.$refs.input.focus()
            })
        },
        tixian(){
            if(this.balance<=0){
                this.$toast('提现金额不足')
            }else{
                if(this.type == 1){
                    this.$http({
                        method: 'post',
                        url: '/api/car_dealer_index.php?s=/Home/Withdraw/index',
                        data: this.qs.stringify({
                            openid: localStorage.openid,
                            type: 1
                        })
                    })
                    .then( res => {
                        if(res.data.code == 0){
                            
                        }else{
                            this.$toast(res.data.msg);
                        }
                        
                    })
                }else{
                    if(this.alipayAccount.length<=0){
                        this.$toast('请输入支付宝账号');
                    }else{
                        this.$http({
                            method: 'post',
                            url: '/api/car_dealer_index.php?s=/Home/Withdraw/index',
                            data: this.qs.stringify({
                                openid: localStorage.openid,
                                type: 2,
                                alipay_account: this.alipayAccount
                            })
                        })
                        .then( res => {
                            if(res.data.code == 0){
                                this.$router.push('/withdrawsuccess');
                            }else{
                                // this.$toast(res.data.msg);
                                this.$router.push('/withdrawfail');
                            }
                        })
                    }
                    
                }
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .withdraw{
        height: 100%;
        background-color: #f8f8f8 !important;
        margin-bottom: 0 !important;
        padding: 40px;
        .head{
            height: 180px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 8px;
            p{
                text-align: center;
            }
            p.p1{
                font-size: 48px;
            }
            p.p2{
                font-size: 28px;
                margin-top: 24px;
            }
        }
        .tixian{
            background-color: #fff;
            margin-top: 60px;
            height: 108px;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            border-radius: 8px;
            div{
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    font-size: 28px;
                    margin-left: 24px;
                }
            }
            input{
                font-size: 28px;
                border: none;
                text-align: right;
                background-color: #fff;
            }
        }
        .tips{
            color: #999;
            margin-top: 24px;
            padding-left: 40px;
        }
        .type{
            margin-top: 60px;
            background-color: #fff;
            border-radius: 8px;
            .wechat{
                border-bottom: 1PX solid #ddd;
            }
            .wechat,.alipay{
                height: 108px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 40px;
                div{
                    display: flex;
                    align-items: center;
                    p{
                        margin-left: 24px;
                        font-size: 28px;
                    }
                }
                img{
                    width: 40px;
                    height: 40px;
                }
            }
            .alipay-account{
                height: 108px;
                padding: 0 40px;
                display: flex;
                align-items: center;
                border-top: 1PX solid #ddd;
                input{
                    height: 90px;
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 28px;
                }
            }
        }
        .lijitixian{
            margin-top: 80px;
            color: #fff;
            font-size: 28px;
            height: 98px;
            line-height: 98px;
            text-align: center;
            border-radius: 8px;
            background-color: #716dff;
        }
    }
</style>