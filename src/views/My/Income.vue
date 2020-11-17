<template>
    <div class="income">
        <div class="head">
            <p class="p1 bold">{{income}}</p>
            <p class="p2">累计收益（元）</p>
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
                    <div class="item" v-for="(item, index) in earnedAmountRecordList" :key="index">
                        <div class="top flex">
                            <div class="flex">
                                <img src="../../assets/images/my/weibao.png" alt="维保记录">
                                <p>{{item.msg}}</p>
                            </div>
                            <p class="bold">{{item.income}}</p>
                        </div>
                        <div class="bot">{{item.created_at}}</div>
                    </div>
                    <!-- <div class="item">
                        <div class="top flex">
                            <div class="flex">
                                <img src="../../assets/images/my/weibao.png" alt="维保记录">
                                <p>维保记录查询</p>
                            </div>
                            <p class="bold">2</p>
                        </div>
                        <div class="bot">2020/05/07 12:02:32</div>
                    </div>
                    <div class="item">
                        <div class="top flex">
                            <div class="flex">
                                <img src="../../assets/images/my/weibao.png" alt="维保记录">
                                <p>维保记录查询</p>
                            </div>
                            <p class="bold">2</p>
                        </div>
                        <div class="bot">2020/05/07 12:02:32</div>
                    </div> -->
                </div>
            </div>
            <div v-if="showNoDate" class="no-data">
                <img src="../../assets/images/my/no-data.png" alt="">
                <p>暂无相关记录</p>
            </div>
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
            showNoDate: false,
            earnedAmountRecordList: [],
            income: 0,
            totalMoney: 0,
            showDatePicker: false,
            currentDate: new Date(),
            date: `${new Date().getFullYear()}/${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}`

       }
    },
    mounted(){
        getOpenId(this);
        this.balances();
        let date = `${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}`;
        this.init(date);
    },
    methods: {
        balances(){
                this.$http({
                    method: 'post',
                    url: '/api/car_dealer_index.php?s=/Home/Withdraw/balances',
                    data: this.qs.stringify({
                        openid: localStorage.openid,
                    })
                })
                .then( res => {
                    if(res.data.code ==0){
                        this.income = res.data.data.total;
                    }else{
                        this.$toast(res.data.msg);
                    }
                })
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
                url: '/api/car_dealer_index.php?s=/Home/Withdraw/earnedAmountRecord',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    month: date
                })
            })
            .then( res => {
                // res.data.data = [{
                //     id: "1",
                //     openid: "ozOZU52oOFFLwWiYT8VdnrQa9UHs",
                //     stime: null,
                //     price: "10.00",
                //     income: "6.00",
                //     type: "1",
                //     msg: "查询收入",
                //     sdate: "2019-05-08",
                //     month: "2019-05",
                //     remark: null,
                //     is_withdrawn: "1",
                //     created_at: "01-01 08:00:00"
                // },{
                //     id: "1",
                //     openid: "ozOZU52oOFFLwWiYT8VdnrQa9UHs",
                //     stime: null,
                //     price: "5.00",
                //     income: "6.00",
                //     type: "1",
                //     msg: "查询收入",
                //     sdate: "2019-05-08",
                //     month: "2019-05",
                //     remark: null,
                //     is_withdrawn: "1",
                //     created_at: "01-01 08:00:00"
                // },]
                if(res.data.code == 0){
                    if(res.data.data.length == 0){
                        this.earnedAmountRecordList = [];
                        this.showNoDate = true;
                    }else{
                        this.earnedAmountRecordList = res.data.data;
                    };
                    for (let index = 0; index < this.earnedAmountRecordList.length; index++) {
                        this.totalMoney += Number(this.earnedAmountRecordList[index].income);                        
                    }
                    this.$toast.clear();
                }else{  
                    this.$toast(res.data.msg);
                    this.$toast.clear();
                }
            })
            .catch( () => {
                this.$toast.clear();
            })
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
                return val;
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