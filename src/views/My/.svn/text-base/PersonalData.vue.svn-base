<template>
    <div>
        <div class="list">
            <div class="item">
                <label>头像</label>
                <div class="flex">
                    <img class="avator" :src="headimgurl" alt="">
                    <!-- <img class="right" src="../../assets/images/my/right.png" alt=""> -->
                </div>
            </div>
            <div class="item">
                <label>称谓</label>
                <div class="flex">
                    <input v-model.trim="name" placeholder="请输入" type="text">
                </div>
            </div>
            <div class="item">
                <label>手机号</label>
                <div class="flex">
                    <input v-model.trim="phone" placeholder="请输入" type="text">
                </div>
            </div>
            <div class="item">
                <label>区域</label>
                <div @click="openAddr" class="flex">
                    <p v-if="addr == ''" class="color-999">请输入</p>
                    <p v-if="addr != ''" class="color-333">{{addr}}</p>
                    <img class="right" src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
        </div>
        <div @click="submit" class="submit">立即提交</div>
        <!-- 地址选择器 -->
        <van-popup v-model="showAddr" position="bottom">
            <van-area 
                title="地址选择" 
                :area-list="areaList" 
                :columns-num="2" 
                 @confirm="areaConfirm"
                @cancel="areaCancel"
            />
        </van-popup>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import Vue from 'vue';
import { Popup, Area } from 'vant';
import areaList from '../../assets/js/area'
Vue.use(Area);
Vue.use(Popup);
export default {
    data(){
        return{
            headimgurl: '',//头像
            showAddr: false,
            areaList: areaList,
            name: '',//称谓
            phone: '',//手机号
            addr: ''//区域
        }
    },
    mounted(){
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        }),
        getOpenId(this);
        this.initT();
        this.init();
    },
    methods: {
        initT(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/login',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                this.headimgurl = res.data.data.headimgurl;
            })
        },
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/GetProfile',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.name = res.data.data.name;
                    this.phone = res.data.data.phone;
                    this.addr = res.data.data.area;
                }else{
                    this.$toast(res.data.msg);
                }
                this.$toast.clear();
            })
            .catch(() =>{
                this.$toast.clear();
            })
        },
        openAddr(){
            this.showAddr = true;
        },
        areaConfirm(value){
            this.showAddr = false;
            this.addr = value[1].name;
        },
        areaCancel(){
            this.showAddr = false;
        },
        // 提交
        submit(){
            // if(this.name == ''){
            //     this.$toast('请填写称谓')
            // }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(this.phone)){
            //     this.$toast('请填写正确的手机号')
            // }else if(this.addr == ''){
            //     this.$toast('请选择区域')
            // }else{
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/EditProfile',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    name: this.name,
                    phone: this.phone,
                    figure: '22',
                    area: this.addr
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.$router.push('/my');
                }else{
                    this.$toast(res.data.msg);
                }
            })
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
    .list{
        .item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 128px;
            border-bottom: 1PX solid #ddd;
            label{
                font-size: 28px;
                margin-left: 40px;
            }
            div{
                margin-right: 40px;
                align-items: center;
                flex: 1;
                justify-content: flex-end;
                margin-left: 200px;
                font-size: 28px;
            }
            img.avator{
                width: 98px;
                height: 98px;
            }
            img.right{
                width: 14px;
                height: 24px;
                margin-left: 24px;
            }
            input{
                width: 100%;
                text-align: right;
                border: none;
                font-size: 28px;
            }
            input::-webkit-input-placeholder {  	/* WebKit browsers */
                color: #999;
            }
        }
    }
    .submit{
        line-height: 98px;
        color: #fff;
        margin: 80px 40px;
        text-align: center;
        background-color: #716dff;
        border-radius: 8px;
        font-size: 28px;
    }
</style>