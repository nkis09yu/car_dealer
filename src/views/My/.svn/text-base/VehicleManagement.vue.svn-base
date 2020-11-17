<template>
    <div v-if="showData" class="manage">
        <div class="tab-bar clearfix">
            <div @click="tabClick(index)" :class="tabIndex == index ? 'active' : ''" v-for="(tab, index) in tabBar" :key="index">{{tab}}</div>
        </div>
        <div class="content">
            <!-- 在售 -->
            <div v-if="tabIndex == 0" class="on-sale">
                <div class="list">
                    <div @click="details(zaishou.id)" v-for="(zaishou, index) in zaishouList" :key="index" class="item">
                        <div class="item-top flex">
                            <van-image
                                fit="cover"
                                lazy-load
                                :src="zaishou.images['外观照片'] ? zaishou.images['外观照片'][0].file_url : ''"
                            />
                            <div class="ddd">
                                <p class="p1 bold fontSize-28">{{zaishou.params['基本信息']&&zaishou.params['基本信息']['具体车型']}}</p>
                                <p class="p2 fontSize-24">{{zaishou.params['基本信息']&&zaishou.params['基本信息']['车辆归属地']}}/{{zaishou.params['基本信息']&&zaishou.params['基本信息']['表显里程']}}万公里/{{zaishou.params['基本信息']&&zaishou.params['基本信息']['初次上牌']}}</p>
                                <div>
                                    <p class="p3 bold fontSize-28">{{zaishou.params['价格说明']&&zaishou.params['价格说明']['个人零售价']}}万</p>
                                    <p class="fontSize-24">{{zaishou.updated_at}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="item-bot flex">
                            <div class="left">
                                <p>浏览{{zaishou.view_count}}</p>
                                <p>咨询{{zaishou.contact_count}}</p>
                            </div>
                            <div class="right">
                                <p @click.stop="xiajiaClick(zaishou.id)" class="btn bg-red">下架</p>
                                <p @click.stop="edit(zaishou.id)" class="btn bg-yellow">编辑</p>
                                <p @click.stop="soldClick(zaishou.id)" class="btn bg-blue">已售</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!zaishouList.length" class="no-data">
                    <img src="../../assets/images/my/no-data.png" alt="">
                    <p>暂无相关记录</p>
                </div>
            </div>
            <!-- 已售 -->
            <div v-if="tabIndex == 1" class="sold">
                <div class="list">
                    <div @click="details(yishou.id)" v-for="(yishou, index) in yishouList" :key="index" class="item">
                        <div class="item-top flex">
                            <van-image
                                fit="cover"
                                lazy-load
                                :src="yishou.images['外观照片'] ? yishou.images['外观照片'][0].file_url : ''"
                            />
                            <div class="ddd">
                                <p class="p1 bold fontSize-28">{{yishou.params['基本信息']&&yishou.params['基本信息']['具体车型']}}</p>
                                <p class="p2 fontSize-24">{{yishou.params['基本信息']&&yishou.params['基本信息']['车辆归属地']}}/{{yishou.params['基本信息']&&yishou.params['基本信息']['表显里程']}}万公里/{{yishou.params['基本信息']&&yishou.params['基本信息']['初次上牌']}}</p>
                                <div><p class="p3 fontSize-28 bold">{{yishou.params['价格说明']&&yishou.params['价格说明']['个人零售价']}}万</p></div>
                            </div>
                        </div>
                        <div class="item-bot flex">
                            <div class="left">
                                <p>浏览{{yishou.view_count}}</p>
                                <p>咨询{{yishou.contact_count}}</p>
                            </div>
                            <div class="right">
                                <p class="txt">{{yishou.updated_at}}售出</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!yishouList.length" class="no-data">
                    <img src="../../assets/images/my/no-data.png" alt="">
                    <p>暂无相关记录</p>
                </div>
            </div>
            <!-- 下架 -->
            <div v-if="tabIndex == 2" class="xiajia">
                <div class="list">
                    <div @click="details(xiajia.id)" v-for="(xiajia, index) in xiajiaList" :key="index" class="item">
                        <div class="item-top flex">
                            <van-image
                                fit="cover"
                                lazy-load
                                :src="xiajia.images['外观照片'] ? xiajia.images['外观照片'][0].file_url : ''"
                            />
                            <div class="ddd">
                                <p class="p1 fontSize-28 bold">{{xiajia.params['基本信息']&&xiajia.params['基本信息']['具体车型']}}</p>
                                <p class="p2 fontSize-24">{{xiajia.params['基本信息']&&xiajia.params['基本信息']['车辆归属地']}}/{{xiajia.params['基本信息']&&xiajia.params['基本信息']['表显里程']}}万公里/{{xiajia.params['基本信息']&&xiajia.params['基本信息']['初次上牌']}}</p>
                                <div><p class="p3 fontSize-28 bold">{{xiajia.params['价格说明']&&xiajia.params['价格说明']['个人零售价']}}万</p></div>
                            </div>
                        </div>
                        <div class="item-bot flex">
                            <div class="left">
                                <p>浏览{{xiajia.view_count}}</p>
                                <p>咨询{{xiajia.contact_count}}</p>
                            </div>
                            <div class="right">
                                <p @click.stop="edit(xiajia.id)" class="btn bg-yellow">编辑</p> 
                                <p @click.stop="shangjia(xiajia.id)" class="btn bg-blue">上架</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!xiajiaList.length" class="no-data">
                    <img src="../../assets/images/my/no-data.png" alt="">
                    <p>暂无相关记录</p>
                </div>
            </div>
        </div>
        <!-- 发布车辆 -->
        <div @click="release" class="release"><p>发布车辆</p></div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js';
export default {
    data(){ 
        return {
            tabIndex: 0,
            tabBar: ['在售', '已售', '下架'],
            zaishouList: [],
            yishouList: [],
            xiajiaList: [],
            showData: false
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
        this.initZishou();
        this.initYishou();
        this.initXiajia();
    },
    methods: {
        // 在售车辆
        async initZishou(){
            const res = await this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/search',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    sale_status: '在售',
                    page_num: 1,
                    page_cnt: 99
                })
            });
            this.zaishouList = res.data.data.list;
            this.tabBar.splice(0,1,`在售 ${res.data.data.total_count}`);
            this.showData = true;
            this.$toast.clear();
        },
        // 已售车辆
        async initYishou(){
            const res = await this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/search',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    sale_status: '已售',
                    page_num: 1,
                    page_cnt: 99
                })
            });
            this.yishouList = res.data.data.list;
            this.tabBar.splice(1,1,`已售 ${res.data.data.total_count}`);
        },
        // 下架车辆
        async initXiajia(){
            const res = await this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/search',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    sale_status: '下架',
                    page_num: 1,
                    page_cnt: 99
                })
            });
            this.xiajiaList = res.data.data.list;
            this.tabBar.splice(2,1,`下架 ${res.data.data.total_count}`);
        },
        
        // 查看汽车详情
        details(id){
            this.$router.push('/cardetails?id='+id);
        },

        tabClick(i){
            this.tabIndex = i;
        },
        // 发布车辆
        release(){
            this.$router.push('/release');
        },
        // 下架
        xiajiaClick(id){
            this.$dialog.confirm({
                title: '下架提示',
                message: '是否下架该车辆？',
                confirmButtonText: '下架',
                confirmButtonColor: '#716dff'
            })
            .then(() => {
                this.update(id, '下架');
            })
            .catch(() => {
                // on cancel
            });
        },
        soldClick(id){
            this.$dialog.confirm({
                title: '已售标记',
                message: '恭喜售出车辆，是否标记已售？',
                confirmButtonText: '已售',
                confirmButtonColor: '#716dff'
            })
            .then(() => {
                this.update(id, '已售');
            })
            .catch(() => {
                // on cancel
            });
        },

        shangjia(id){
            this.$dialog.confirm({
                title: '上架提示',
                message: '是否上架该车辆？',
                confirmButtonText: '上架',
                confirmButtonColor: '#716dff'
            })
            .then(() => {
                this.update(id, '在售');
            })
            .catch(() => {
                // on cancel
            });
            
        },
        
        async update(id, status){
            const res = await this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/update',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    id: id,
                    sale_status: status
                })
            });
            if(res.data.code == 0){
                this.initZishou();
                this.initYishou();
                this.initXiajia();
            }else{
                alert(res.data.msg)
            }
        },

        // 编辑
        edit(id){
            this.$router.push(`/editcar?id=${id}`)
        },

        arrToJson(arr){
            let json = {};
            for(let i =0; i<arr.lengt; i++){
                return arr[i]
            }
            return 1
        }
    },

    destroyed(){
    }
}
</script>

<style lang="scss" scoped>
    .no-data{
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 160px auto 0;
        }
        p{
            text-align: center;
            margin-top: 30px;
            font-size: 28px;
        }
    }
    .manage{
        padding: 40px;
        padding-bottom: 110px;
        .tab-bar{
            div{
                float: left;
                font-size: 32px;
                margin-right: 60px;
            }
            div.active{
                font-weight: 900;
                color: #716dff;
                position: relative;
            }
            div.active::before{
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
        .content{
            margin-top: 36px;
            .list{
                .item{
                    padding: 30px 0 40px;
                    border-bottom: 1PX solid #ddd;
                    .item-top{
                        .van-image{
                            width: 240px;
                            height: 180px;
                            border-radius: 8px;
                            overflow: hidden;
                        }
                        div.ddd{
                            flex: 1;
                            margin-left: 24px;
                            p.p1{
                                font-size: 28px;
                                line-height: 1.5;
                            }
                            p.p2{
                                color: #666;
                                margin-top: 24px;
                            }
                            div{
                                margin-top: 24px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                    p{
                                        font-size: 24px;
                                        color: #666;
                                    }
                                    p.p3{
                                        color: #333;
                                        font-size: 28px;
                                    }

                            }
                        }

                    }
                    .item-bot{
                        margin-top: 40px;
                        justify-content: space-between;
                        align-items: center;
                        .left{
                            p{
                                margin-right: 30px;
                                float: left;
                                font-size: 24px;
                            }
                        }
                        .right{
                            p.btn{
                                font-size: 24px;
                                float: left;
                                height: 56px;
                                color: #fff;
                                margin-left: 30px;
                                line-height: 56px;
                                padding: 0 20px;
                                border-radius: 8px;
                            }
                            p.txt{
                                color: #666;
                                font-size: 24px;
                            }
                        }
                    }
                }
            }
            // 在售
            .on-sale{
                
            }
        }


        // 发布车辆
        .release{
            background-color: #fff;
            position: fixed;
            height: 98px;
            border-top: 1PX solid #eee;
            bottom: 0;
            left: 0;
            right: 0;
            p{
                height: 80px;
                line-height: 80px;
                position: absolute;
                left: 40px;
                right: 40px;
                top: 50%;
                margin-top: -40px;
                color: #fff;
                font-size: 28px;
                text-align: center;
                background-color: #716dff;
                border-radius: 8px;
            }
        }
    }
</style>