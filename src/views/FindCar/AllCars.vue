<template>
    <div class="car">
        <div class="bar flex">
            <div @click="filterTypeClick(item.type,index)" v-for="(item, index) in this.$store.state.filterTypeList" :key="index" class="bar-item flex">
                <p>{{item.name}}</p>
                <img v-show="!item.open" src="../../assets/images/findcar/xiasanjiao.png" alt="">
                <img v-show="item.open" src="../../assets/images/findcar/shangsanjiao.png" alt="">
            </div>
        </div>
        <transition
        :enter-active-class="animateA"
        :leave-active-class="animateA"
        :enter-class="animateB"
        :leave-to-class="animateB"
        ><car-filter
        :filterType="filterType" v-if="this.$store.state.showFilter" ref="child"></car-filter></transition>
        <div class="filter-list">
            <!-- <button @click="sousuo">搜索</button> -->
            <div class="list">
                <div v-show="carName" class="item flex">
                    <p>{{carName}}</p>
                    <img @click="deleteCarName" src="../../assets/images/findcar/cha.png" alt="">
                </div>


                <div v-show="filterList.price" class="item flex">
                    <p>{{filterList.price.value}}</p>
                    <img @click="deleteFilter('price')" src="../../assets/images/findcar/cha.png" alt="">
                </div>

                <div v-show="filterList.model" class="item flex">
                    <p>{{filterList.model}}</p>
                    <img @click="deleteFilter('model')" src="../../assets/images/findcar/cha.png" alt="">
                </div>

                <div v-show="filterList.chexi" class="item flex">
                    <p>{{filterList.chexi}}</p>
                    <img @click="deleteFilter('chexi')" src="../../assets/images/findcar/cha.png" alt="">
                </div>

                

                <div v-for="more in moreList" :key="more.name" class="item flex">
                    <p>{{more.value}}</p>
                    <img @click="deleteFilter('moreRoutine',more)" src="../../assets/images/findcar/cha.png" alt="">
                </div>

                <div v-for="(item, index) in fujiaList" :key="index" class="item flex">
                    <p>{{item}}</p>
                    <img @click="deleteFilter('moreFujia',item)" src="../../assets/images/findcar/cha.png" alt="">
                </div>
            </div>
        </div>
        <div class="car-list">
            <div @click="details(car.id)" class="car-item flex" v-for="car in carList" :key="car.id">
                <van-image
                    fit="cover"
                    lazy-load
                    :src="car.images['外观照片'] ? car.images['外观照片'][0].file_url : ''"
                />
                <div class="dd">
                    <p class="bold fontSize-28 name">{{car.params['基本信息']['具体车型']}}</p>
                    <p class="fontSize-24 i color-666">{{car.params['基本信息']['车辆归属地']}}/{{car.params['基本信息']['表显里程']}}万公里/{{car.params['基本信息']['初次上牌']}}</p>
                    <div class="i clag">
                        <p v-for="(tag, tagIndex) in car.params['车辆标签']['车辆标签'].split(',')" :key="tagIndex">{{tag}}</p>
                    </div>
                    <div class="bt flex i">
                        <p class="fontSize-28 bold">{{car.params['价格说明']['个人零售价']}}万</p>
                        <p class="fontSize-24 color-666">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(car.updated_at).toString()}}</p>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade-mask">
            <div @click="maskClick" id="mask" v-show="this.$store.state.showFilter"></div>
        </transition>
        <div v-show="noData" class="no-data">
            <img src="../../assets/images/findcar/noData.png" alt="">
            <p>暂无相关车辆记录</p>
        </div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import CarFilter from '../../components/CarFilter'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        CarFilter,
    },
    computed: {
        ...mapGetters(['filterList']),

        ...mapState(['carList', 'noData']),
        
        moreList(){
            return this.filterList.more.moreList.filter( item => item.mIndex > 0);
        },
        fujiaList(){
            return this.filterList.more.fujiaList;
        },

        
    },
    mounted(){
        getOpenId(this);
        this.$store.state.noData = false;
        // this.init();
        if(this.$route.query.type == 'quick'){
            switch (this.$route.query.name) {
                case '家用经济':
                    this.$store.commit('addFilter', {
                        type: 'price',
                        value: {
                            value: '0-10万',
                            key: '0,10'
                        }
                    });
                    break;
                case '商务接待':
                    this.$store.commit('addFilter', {
                        type: 'price',
                        value: {
                            value: '10-30万',
                            key: '10,30'
                        }
                    });
                    break;
                case '豪华大气':
                    this.$store.commit('addFilter', {
                        type: 'price',
                        value: {
                            value: '30-999万',
                            key: '30,999'
                        }
                    });
                    break;
                case '自驾越野':
                    this.$store.commit('addFilter', {
                        type: 'model',
                        value: 'SUV'
                    });
                    break;
                case '帅酷炸天':
                     this.$store.commit('addFilter', {
                        type: 'model',
                        value: '轿车'
                    });
                    break;
                case '二胎专车':
                     this.$store.commit('addFilter', {
                        type: 'model',
                        value: 'MPV'
                    });
                    break;
                case '全部车辆':
                    this.allCars();
                    break;
                default:
                    break;
            }
        }else if(this.$route.query.type == 'tk'){
            this.$store.commit('addFilter', {
                type: 'chexi',
                value: this.$route.query.name
            });
        }else{
            this.search();
        }
        
    },
    data(){
        return {
            animateA: 'animateA',
            animateB: 'animate-price',
            filterType: 'more',
            // noData: false,
            showList: false,
            // carList: [],
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            count: 0,
            carName: sessionStorage.carName
        }
    },
    methods: {
        ...mapMutations(['openFilter', 'closeFilter', 'destroy', 'filter', 'allCars', 'search']),
        filterTypeClick(type,i){
            if(this.$store.state.showFilter){
                this.closeFilter();
            }else{
                this.filterType = type;
                this.openFilter(i);
                switch (type) {
                    case 'price':
                        this.animateB = 'animate-price';
                        break;
                    case 'model':
                        this.animateB = 'animate-model';
                        break;
                    case 'sort':
                        this.animateB = 'animate-sort';
                        break;
                    case 'more':
                        this.animateB = 'animate-more';
                        break;
                    default:
                        break;
                }
            }
        },
        maskClick(){
            this.closeFilter(this.filterType);
            
        },
        deleteCarName(){
            this.carName = '';
            sessionStorage.removeItem('carName');
            this.filter();
        },
        deleteFilter(type,value){
            this.$store.commit('deleteFilter', {
                type: type,
                value: value
            })
        },
        // 跳转到详情页面
        details(id){  
            this.$router.push('/cardetails?id='+id                                                                                                                                           )            
        }
    },

    destroyed(){
        this.destroy();
        this.$store.state.carList = [];
        sessionStorage.removeItem('carName');
    }
}
</script>

<style lang="scss" scoped>
    .car{
        overflow: hidden;
    }
    #mask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(#000, .6);
        z-index: 1500;
    }
    .animateA{
         transition: all .4s ease;
    }
    .animate-price{
        transform: translateY(-630px);
    }
    .animate-model{
        transform: translateY(-270px);
    }
    .animate-sort{
        transform: translateY(-170px);
    }
    .animate-more{
        transform: translateY(-1500px);
    }
    .fade-mask-enter-active, .fade-mask-leave-active {
        transition: all 0.4s ease;
    }
    .fade-mask-enter, .fade-mask-leave-to {
        opacity:  0;
    }
    .bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1700;
        background-color: #fff;
        height: 88px;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        border-bottom: 16px solid #eee;
        box-sizing: content-box;
        .bar-item{
            align-items: center;
            p{
                font-size: 28px;
            }
            img{
                width: 12px;
                height: 8px;
                margin-left: 8px;
            }
        }
    }
    .filter-list{
        background-color: #eee;
        margin-top: 88px;
        padding: 0 40px 16px;
        .list{
            overflow: hidden;
            .item{
                background-color: #fff;
                font-size: 24px;
                padding: 0 20px;
                height: 56px;
                border-radius: 8px;
                float: left;
                margin-right: 30px;
                margin-top: 16px;
                align-items: center;
                img{
                    width: 18px;
                    height: 18px;
                    margin-left: 20px;
                }
            }
        }
    }
    .car-list{
        background-color: #fff;
        padding: 0 40px;
        .car-item{
            padding: 30px 0;
            border-bottom: 1PX solid #ddd;
            .van-image{
                width: 240px;
                height: 180px;
                border-radius: 8px;
                overflow: hidden;
            }
            div.dd{
                margin-left: 24px;
                flex: 1;
                .name{
                    line-height: 1.5;
                }
                .i{
                    margin-top: 24px;
                }
                .clag{
                    overflow: hidden;
                    p{
                        float: left;
                        color: #fff;
                        line-height: 32px;
                        font-size: 24px;
                        padding: 0 10px;
                        background-color: #ffa114;
                        margin-right: 20px;
                        border-radius: 8px;
                    }
                }
                .bt{
                    justify-content: space-between;
                    align-items: flex-end;
                }
            }
        }   
    }
    .no-data{
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 160px auto 0;
        }
        p{
            font-size: 28px;
            margin-top: 30px;
            text-align: center;
        }
    }
</style>