<template>
    <div class="record">
        <div v-if="showRecord" class="no-record">
            <img src="../../assets/images/searchcar/wujilu.png" alt="">
            <p>暂无查询记录</p>
            <div @click="quchaxun" class="cm-btn">去查询</div>
        </div>
        <div class="record-list">
            <div class="record-item" v-for="(item, index) in historyList" :key="index">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p @click="yuyue(item.id)" v-if="item.status=='已预约'" class="bold yiyuyue">已预约</p>
                        <p @click="chaxunzhong" v-if="item.status=='查询中'" class="bold chaxun">查询中</p>
                        <p @click="wancheng(item)" class="bold" v-if="item.status=='已完成'">已完成</p>
                        <p @click="chaoshi" v-if="item.status=='超时,去退款'" class="bold chaoshi">超时，去退款</p>
                        <p class="bold" v-if="item.status=='已退款'">已退款</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">{{item.vin}}</div>
                <div class="date">{{item.created_at}}</div>
            </div>

            <!-- <div class="record-item">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p @click="yuyue" class="bold yiyuyue">已预约</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">LSGUL836L1JA034445</div>
                <div class="date">2020/04/28 21:02:32</div>
            </div>
            <div class="record-item">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p @click="chaxunzhong" class="bold chaxun">查询中</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">LSGUL836L1JA034445</div>
                <div class="date">2020/04/28 21:02:32</div>
            </div>
            <div class="record-item">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p class="bold">已完成</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">LSGUL836L1JA034445</div>
                <div class="date">2020/04/28 21:02:32</div>
            </div>
            <div class="record-item">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p @click="chaoshi" class="bold chaoshi">超时，去退款</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">LSGUL836L1JA034445</div>
                <div class="date">2020/04/28 21:02:32</div>
            </div>
            <div class="record-item">
                <div class="flex top">
                    <img class="weibao" src="../../assets/images/my/weibao.png" alt="">
                    <div class="d1 bold">维保记录查询</div>
                    <div class="d2">
                        <p class="bold">已退款</p>
                        <img class="right" src="../../assets/images/my/right.png" alt="">
                    </div>
                </div>
                <div class="code">LSGUL836L1JA034445</div>
                <div class="date">2020/04/28 21:02:32</div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showRecord: false,
            historyList: []
        }
    },
    mounted(){
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        });
        this.init();
    },
    methods: {
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/SearchHistory',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then( res => {
                console.log(res);
                if(res.data.code == 0){
                    if(res.data.data.length == 0){
                        this.showRecord = true;
                    }
                    this.historyList = res.data.data;
                }else{
                    this.$toast(res.data.msg);
                };
                this.$toast.clear();
            })
            .catch( err => {
                this.$toast.clear();
            })
        },
        quchaxun(){
            this.$router.push('/maintenancerecord');
        },
        wancheng(item){
            this.$router.push('/report?report_id='+item.report_id);
        },
        yuyue(id){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/AddNotice',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    id: id
                })
            })
            .then( res => {
                console.log(res);
                if(res.data.code == 0){
                    this.$toast('已预约，等待查询');
                }else{
                    this.$toast(res.data.msg);
                }
            })
        },
        chaxunzhong(){
            this.$toast('查询中，请等待');
        },
        chaoshi(id){
            this.$toast.loading({
                message: '退款中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration: 0
            });
            // this.$router.push('/overtime');
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/Drawback',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    id: id
                })
            })
            .then( res => {
                console.log(res);
                if(res.data.code == 0){
                    this.$router.push('/overtime');
                }else{
                    this.$toast(res.data.msg);
                }
                this.$toast.clear();
            })
            .catch( err => {
                this.$toast.clear();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .record{
        .no-record{
            img{
                width: 200px;
                height: 200px;
                display: block;
                margin: 160px auto 0;
            }
            p{
                font-size: 28px;
                margin-top: 30px;
                text-align: center;
            }
            div{
                color: #fff;
                background: #716dff;
                position: absolute;
                left: 40px;
                right: 40px;
                bottom: 240px;
            }
        }

        .record-list{
            padding: 0 40px;
            .record-item{
                border-bottom: 1PX solid #ddd;
                padding: 40px 0;
                .top{
                    align-items: center;
                    font-size: 32px;
                    img.weibao{
                        width: 40px;
                        height: 40px;
                    }
                    img.right{
                        width: 14px;
                        height: 24px;
                    }
                    div.d1{
                        flex: 1;
                        margin: 0 24px;
                    }
                    div.d2{
                        display: flex;
                        align-items: center;
                        img{
                            margin-left: 24px;
                        }
                        p.yiyuyue{
                            color: #ffa114
                        }
                        p.chaxun{
                            color: #716dff;
                        }
                        p.chaoshi{
                            color: #ff5c5c;
                        }
                    }
                }
                .code{
                    margin-left: 64px;
                    margin-top: 24px;
                    font-size: 28px;
                }
                .date{
                    margin-left: 64px;
                    margin-top: 24px;
                    font-size: 24px;
                    color: #999;
                }
                

            }
        }
    }
</style>