<template>
    <div v-if="showData" class="income">
        <div class="head">
            <div>
                <p class="p1 bold">{{wxpayAmount}}</p>
                <p class="p2">微信提现（元）</p>
            </div>
            <div>
                <p class="p1 bold">{{alipayAmount}}</p>
                <p class="p2">支付宝（元）</p>
            </div>
        </div>
        <div class="income-list">
            <div class="income-item">
                <div class="title flex">
                    <div @click="openDatePicker" class="flex">
                        <p>{{date}}</p>
                        <img src="../../assets/images/my/ddd.png" alt="">
                    </div>
                    <p>共{{totalMoney}}元</p>
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in mentionList" :key="index">
                        <div class="top flex">
                            <div class="flex">
                                <img v-show="item.type == '1'" src="../../assets/images/my/wechat.png" alt="">
                                <img v-show="item.type == '2'" src="../../assets/images/my/alipay.png" alt="">
                                <p>{{item.type == '1' ? '微信提现' : `支付宝提现/${item.account}`}}</p>
                            </div>
                            <p class="bold">{{item.money}}</p>
                        </div>
                        <div class="bot">{{item.created_at}}</div>
                    </div>
                </div>
            </div>
            <div v-if="showNoDate" class="no-data">
                <img src="../../assets/images/my/no-data.png" alt="">
                <p>暂无相关记录</p>
            </div>
            <!-- <div class="income-item">
                <div class="title flex">
                    <div class="flex">
                        <p>2020/04</p>
                        <img src="../../assets/images/my/ddd.png" alt="">
                    </div>
                    <p>共6元</p>
                </div>
                <div class="list">
                    <div class="item">
                        <div class="top flex">
                            <div class="flex">
                                <img src="../../assets/images/my/wechat.png" alt="">
                                <p>微信提现</p>
                            </div>
                            <p class="bold">2</p>
                        </div>
                        <div class="bot">2020/05/07 12:02:32</div>
                    </div>
                    <div class="item">
                        <div class="top flex">
                            <div class="flex">
                                <img src="../../assets/images/my/wechat.png" alt="">
                                <p>微信提现</p>
                            </div>
                            <p class="bold">4</p>
                        </div>
                        <div class="bot">2020/05/07 12:02:32</div>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- 日期选择器 -->
        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="日期选择"
                :formatter="formatter"
                @confirm="dateConfirm"
                @cancel="dateCancel"
            />
        </van-popup>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import Vue from 'vue';
import { Popup, DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
Vue.use(Popup);
export default {
    data(){
        return {
            totalMoney: 0,
            showData: true,
            mentionList: [],
            alipayAmount: 0,
            wxpayAmount: 0,
            income: 0,
            showNoDate: false,
            showDatePicker: false,
            currentDate: new Date(),
            date: `${new Date().getFullYear()}/${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}`
        }
    },
    mounted(){
        getOpenId(this);
        this.amount();
        let date = `${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}`
        this.init(date);

    },
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
                return val;
        },
        init(date){
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration: 0
            });
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Withdraw/mentionList',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    month: date
                })
            })
            .then( res => {
                // console.log(res);
                // res.data.data = [{
                //     id: "362",
                //     openid: "ozOZU52oOFFLwWiYT8VdnrQa9UHs",
                //     money: "0.10",
                //     created_at: "05-22 00:31:27",
                //     remainmoney: "0.00",
                //     type: "2",
                //     ret: {"alipay_fund_trans_toaccount_transfer_response":{"code":"10000","msg":"Success","order_id":"20200522110070001506960053814902","out_biz_no":"362","pay_date":"2020-05-22 00:31:27"},"sign":"RzI73atOXk4jr0rQcmVHkH23Me7Wm30a6fYq9gBqls2mfYN6eH3hGNgIiLTW8p2j0Go8o07tKpUaMK2AYL8awfEkYMKVZt0taUEbNvAU8nib+lEyV1zsMdeQ5qa27dGuCbFvy6dWloLVr0uIGhdhjL+30N0kSaP8o4ruyH3wf6m270\/suKcPH5ht3z3UUwXY2SN7u95Z8s6CblCRYLu69By5H+aUIYLuAA4UiG9Ww+joM3f\/CE\/x+Ot0snovs\/IS0LRnlrTXK42Ws0\/UwBOEUspxwRfgubvptoOht65ugzmLrXLxqg7AtsK5tpKdd7uWw6K5GDUJaFlEdTjWf35puA=="},
                //     account: "13072015235"
                // },{
                //     id: "362",
                //     openid: "ozOZU52oOFFLwWiYT8VdnrQa9UHs",
                //     money: "0.10",
                //     created_at: "05-22 00:31:27",
                //     remainmoney: "0.00",
                //     type: "1",
                //     ret: {"alipay_fund_trans_toaccount_transfer_response":{"code":"10000","msg":"Success","order_id":"20200522110070001506960053814902","out_biz_no":"362","pay_date":"2020-05-22 00:31:27"},"sign":"RzI73atOXk4jr0rQcmVHkH23Me7Wm30a6fYq9gBqls2mfYN6eH3hGNgIiLTW8p2j0Go8o07tKpUaMK2AYL8awfEkYMKVZt0taUEbNvAU8nib+lEyV1zsMdeQ5qa27dGuCbFvy6dWloLVr0uIGhdhjL+30N0kSaP8o4ruyH3wf6m270\/suKcPH5ht3z3UUwXY2SN7u95Z8s6CblCRYLu69By5H+aUIYLuAA4UiG9Ww+joM3f\/CE\/x+Ot0snovs\/IS0LRnlrTXK42Ws0\/UwBOEUspxwRfgubvptoOht65ugzmLrXLxqg7AtsK5tpKdd7uWw6K5GDUJaFlEdTjWf35puA=="},
                //     account: "13072015235"
                // },]
                if(res.data.code == 0){
                    if(res.data.data.length == 0){
                        this.mentionList = [];
                        this.showNoDate = true;
                    }else{
                        this.mentionList = res.data.data;
                    }
                    for (let index = 0; index < this.mentionList.length; index++) {
                        this.totalMoney += Number(this.mentionList[index].money);
                    }
                }else{  
                    this.$toast(res.data.msg);
                };
                this.$toast.clear();
            })
            .catch( () => {
                this.$toast.clear();
            })
        },

        amount(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Withdraw/amount',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.alipayAmount = res.data.data.alipay_amount;
                    this.wxpayAmount = res.data.data.wxpay_amount;
                }else{
                    this.$$toast(res.data.msg)
                }
                
            })
        },
        openDatePicker(){
            this.showDatePicker = true;
        },
        dateConfirm(value){
            this.showDatePicker = false;
            let d = `${new Date(value).getFullYear()}-${new Date(value).getMonth()+1<10 ? '0'+(new Date(value).getMonth()+1) : new Date(value).getMonth()+1}`;
            this.date = `${new Date(value).getFullYear()}/${new Date(value).getMonth()+1<10 ? '0'+(new Date(value).getMonth()+1) : new Date(value).getMonth()+1}`;
            this.init(d);
        },
        dateCancel(){
            this.showDatePicker = false;
        },
    }
}
</script>

<style lang="scss" scoped>
    .income{
        height: 100%;
        background-color: #f8f8f8 !important;
        margin-bottom: 0 !important;
        padding: 40px;
        .head{
            height: 180px;
            background-color: #fff;
            border-radius: 8px;
            display: flex;
            justify-content: space-around;
            div{
                display: flex;
                flex-direction: column;
                justify-content: center;
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
            
        }
        .income-list{
            margin-top: 20px;
            .income-item{
                margin-top: 40px;
                .title{
                    justify-content: space-between;
                    align-items: center;
                    p{
                        font-size: 28px;
                        color: #999;
                    }
                    div{
                        align-items: center;
                        p{
                            font-size: 28px;
                            color: #333;
                        }
                        img{
                            width: 12px;
                            height: 8px;
                            margin-left: 8px;
                        }
                    }
                }
                .list{
                    margin-top: 40px;
                    background-color: #fff;
                    border-radius: 8px;
                    .item:last-child{
                        border: none;
                    }
                    .item{
                        padding: 30px 40px;
                        border-bottom: 1PX solid #ddd;
                        .top{
                            justify-content: space-between;
                            align-items: center;
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
                            p.bold{
                                font-size: 28px;
                            }
                        }
                        .bot{
                            margin-top: 24px;
                            color: #999;
                            padding-left: 64px;
                            font-size: 24px;
                        }
                    }
                }
            }
        }
    }
</style>