<template>
    <div class="login">
        <h1 class="bold">365找车欢迎您</h1>
        <div class="phone flex">
            <img src="../../assets/images/my/phone.png" alt="手机号">
            <input type="number" v-model="phone" placeholder="请输入手机号">
        </div>
        <div class="code flex">
            <div class="flex">
                <img src="../../assets/images/my/yzm.png" alt="验证码">
                <input type="numer" v-model="code" placeholder="请输入验证码">
            </div>
            <p  @click="sendSms">{{btnTxt}}</p>
        </div>
        <div @click="login" class="login-btn">立即登录</div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import md5 from 'js-md5'
export default {
    data(){
        return {
            btnTxt: '获取',
            phone: '',
            code: '',
            fsAble: false,
        }
    },
    mounted(){
        getOpenId(this);
    },
    methods: {
        login(){
            this.$router.push('./my');
        },
        // 发送验证码
        sendSms(){
            if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(this.phone)){
                this.$toast('手机号格式不正确')
            }else{
                this.getCode('登录')
                var timer;
                var count = 60;
                if(this.fsAble){
                    return false
                }else{
                    this.fsAble = true;
                    this.btnTxt = count;
                    timer = setInterval(() => {
                        count --;
                        this.btnTxt = count;
                        if(count < 0){
                            clearInterval(timer);
                            this.btnTxt = '重新获取';
                            count = 60;
                            this.fsAble = false;
                        }
                    }, 1000)
                }
            }
        },
        getCode(reason){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sms/sendSmsCheckCode',
                data: this.qs.stringify({
                    reason: reason,
                    phone: this.phone,
                    signature: md5(this.phone+'@'+reason)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        padding: 0 40px;
    }
    h1{
        font-size: 48px;
        margin-top: 160px;
        text-align: center;
    }
    .phone,.code{
        height: 98px;
        padding: 0 30px;
        border: 1PX solid #ccc;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;
        img{
            width: 40px;
            height: 40px;
        }
        input{
            font-size: 28px;
            margin-left: 30px;
            flex: 1;
            border: none;
        }
    }
    .phone{
        margin-top: 160px;
    }
    .code{
        margin-top: 40px;
        div{
            align-items: center;
            flex: 1;
        }
        p{
            // margin-left: 100px;
            height: 56px;
            padding: 0 20px;
            line-height: 56px;
            color: #fff;
            background-color: #716dff;
            border-radius: 8px;
            font-size: 28px;
        }
    }
    .login-btn{
        text-align: center;
        margin-top: 80px;
        color: #fff;
        font-size: 28px;
        border-radius: 8px;
        height: 98px;
        line-height: 98px;
        background-color: #716dff;
    }
</style>