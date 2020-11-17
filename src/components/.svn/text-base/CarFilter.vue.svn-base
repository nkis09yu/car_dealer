<template>
    <div ref="carFilter" :class="filterType == 'more' ? 'car-bot' : ''" class="car-filter">
        <!-- 价格 -->
        <div v-show="filterType == 'price'" class="price">
            <div class="price-input flex">
                <div class="d1 flex">
                    <input v-model.trim="floorPrice" type="number"><em>-</em><input v-model.trim="highPrice" type="number">
                    <p>万元</p>
                </div>
                <div @click="priceConfirm" class="d2">确定</div>
            </div>
            <div class="quick-select">
                <h2 class="bold fontSize-28">快速选择</h2>
                <div class="price-list">
                    <div @click="addFilter(price,'price')" v-for="(price, index) in preiceList" :key="index" class="price-item">{{price.value}}</div>
                </div>
            </div>
        </div>
        <!-- 车型 -->
        <div v-show="filterType == 'model'" class="model">
            <div class="model-list">
                <div @click="addFilter(model,'model')" v-for="(model, index) in modelList" :key="index" class="model-item color-666 fontSize-28 border-radius-8">{{model}}</div>
            </div>
        </div>
        <!-- 排序 -->
        <div v-show="filterType == 'sort'" class="sort">
            <div :class="this.$store.state.rankType == '价格' ? 'active' : ''" @click="priceClick">
                <p>价格排序</p>
                <img v-show="this.$store.state.priceRank === 1" src="../assets/images/findcar/sort-up.png" alt="">
                <img v-show="this.$store.state.priceRank === ''" src="../assets/images/findcar/sort-empty.png" alt="">
                <img v-show="this.$store.state.priceRank === 0" src="../assets/images/findcar/sort-down.png" alt="">
            </div>
            <div :class="this.$store.state.rankType == '车龄' ? 'active' : ''" @click="ageClick">
                <p>车龄排序</p>
                <img v-show="this.$store.state.ageRank === 1" src="../assets/images/findcar/sort-up.png" alt="">
                <img v-show="this.$store.state.ageRank === ''" src="../assets/images/findcar/sort-empty.png" alt="">
                <img v-show="this.$store.state.ageRank === 0" src="../assets/images/findcar/sort-down.png" alt="">
            </div>
            <div :class="this.$store.state.rankType == '里程' ? 'active' : ''" @click="mileageClick">
                <p>里程排序</p>
                <img v-show="this.$store.state.mileageRank === 1" src="../assets/images/findcar/sort-up.png" alt="">
                <img v-show="this.$store.state.mileageRank === ''" src="../assets/images/findcar/sort-empty.png" alt="">
                <img v-show="this.$store.state.mileageRank === 0" src="../assets/images/findcar/sort-down.png" alt="">
            </div>
        </div>
        <!-- 更多 -->
        <div v-show="filterType == 'more'" class="more">
            <div :style="moreListStyle" class="more-list">
                <div v-for="(moreItem, moreIndex) in moreList" :key="moreIndex" class="more-item">
                    <p class="title">{{moreItem.name}}</p>
                    <div :class="moreItem.mIndex == index ? 'active' : ''" @click="moreClick(moreItem, index)" v-for="(item, index) in moreItem.list" :key="index">{{item}}</div>
                </div>

                <div class="more-item">
                    <p class="title">附加<em>（可多选）</em></p>
                    <div :class="moreClass(fujia)" @click="fujiaClick(fujia)" v-for="(fujia, index) in fujiaList" :key="index">{{fujia}}</div>
                </div>
            </div>
            <div ref="moreBot" class="more-bot flex">
                <div @click="resetMore" class="reset">重置</div>
                <div @click="confirmMore({moreList,fujiaArr})" class="confirm">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Toast } from 'vant';
export default {
    props: ['filterType'],
    computed: {
        ...mapGetters(['filterList']),
        moreClass(){
            return function(item){
                return this.fujiaArr.includes(item) ? 'active' : ''
            }
        },
        
    },
    mounted(){
        this.moreListStyle.height = this.$refs.carFilter.offsetHeight - this.$refs.moreBot.offsetHeight + 'px';
        if(this.filterType == 'more'){
            this.moreList = JSON.parse(JSON.stringify(this.filterList.more.moreList));
            this.fujiaArr = JSON.parse(JSON.stringify(this.filterList.more.fujiaList));
        }
    },
    data(){
        return {
            moreListStyle: {
                height: ''
            },
            floorPrice: '',//低价格
            highPrice: '',//高价格
            // preiceList: ['3万以下', '3-5万', '5-8万', '8-10万', '10-15万', '15-30万', '30-50万', '50-100万', '100万以上'],
            preiceList: [
                {
                    value: '3万以下',
                    key: '0,3'
                },
                {
                    value: '3-5万',
                    key: '3,5'
                },
                {
                    value: '5-8万',
                    key: '5,8'
                },
                {
                    value: '8-10万',
                    key: '8,10'
                },
                {
                    value: '10-15万',
                    key: '10,15'
                },
                {
                    value: '15-30万',
                    key: '15,30'
                },
                {
                    value: '30-50万',
                    key: '30,50'
                },
                {
                    value: '50-100万',
                    key: '50,100'
                },
                {
                    value: '100万以上',
                    key: '100,9999999'
                }
            ],
            modelList: ['轿车', '皮卡', '跑车', 'SUV', 'MPV', '其他'],
            priceUp: false,
            priceEmpty: true,
            priceDown: false,
            ageUp: false,
            ageEmpty: true,
            ageDown: false,
            mileageUp: false,
            mileageEmpty: true,
            mileageDown: false,
            priceActive: false,
            ageActive: false,
            mileageActive: false,
            moreList: [],
            fujiaList: ['准新车', '高保值', '一手家用', '单位用车', '全程4S店保养'],
            fujiaArr: [],
        }
    },
    methods: {
        ...mapMutations([
            'closeFilter', 
            // 'fujiaClick', 
            // 'moreClick',
            'resetMore',
            'confirmMore',
            'filter'
            ]),
        priceClick(){
            this.$store.state.ageRank = '';
            this.$store.state.mileageRank = '';
            if(this.$store.state.priceRank === ''){
                this.$store.state.rank = 1;
                this.$store.state.priceRank = 1;
                this.$store.state.rankType = '价格';
            }else if(this.$store.state.priceRank === 1){
                this.$store.state.pricrankeRank = 0;
                this.$store.state.priceRank = 0;
                this.$store.state.rankType = '价格';
            }else if(this.$store.state.priceRank === 0){
                this.$store.state.rank = '';
                this.$store.state.priceRank = '';
                this.$store.state.rankType = '';
            };
            this.filter();
            // this.closeFilter();
        },
        ageClick(){
            this.$store.state.priceRank = '';
            this.$store.state.mileageRank = '';
            if(this.$store.state.ageRank === ''){
                this.$store.state.rank = 1;
                this.$store.state.ageRank = 1;
                this.$store.state.rankType = '车龄';
            }else if(this.$store.state.ageRank === 1){
                this.$store.state.rank = 0;
                this.$store.state.ageRank = 0;
                this.$store.state.rankType = '车龄';
            }else if(this.$store.state.ageRank === 0){
                this.$store.state.rank = '';
                this.$store.state.ageRank = '';
                this.$store.state.rankType = '';
            };
            this.filter();
            // this.closeFilter();
        },
        mileageClick(){
            this.$store.state.ageRank = '';
            this.$store.state.priceRank = '';
            if(this.$store.state.mileageRank === ''){
                this.$store.state.rank = 1;
                this.$store.state.mileageRank = 1;
                this.$store.state.rankType = '里程';
            }else if(this.$store.state.mileageRank === 1){
                this.$store.state.rank = 0;
                this.$store.state.mileageRank = 0;
                this.$store.state.rankType = '里程';
            }else if(this.$store.state.mileageRank === 0){
                this.$store.state.rank = '';
                this.$store.state.mileageRank = '';
                this.$store.state.rankType = '';
            };
            this.filter();
            // this.closeFilter();
        },
        moreClick(item,index){
            item.mIndex = index;
            item.value = item.list[index];
        },
        // 附加
        fujiaClick(i){
            if(this.fujiaArr.includes(i)){
                this.fujiaArr.splice(this.fujiaArr.indexOf(i), 1)
            }else{
                this.fujiaArr.push(i)
            }
        },

        // 价格快速选择
        addFilter(item,type){
            this.closeFilter();
            this.$store.commit('addFilter', {
                type: type,
                value: item
            });
        },
        priceConfirm(){
            if( this.floorPrice == ''){
                Toast('价格不能为空');
            }else if( Number(this.floorPrice)<0){
                Toast('最低价格需大于等于0');
            }else if(Number(this.highPrice) <=  Number(this.floorPrice)){
                Toast('最高价格需大于最低价格');
            }else{
                this.closeFilter();
                this.$store.commit('addFilter', {
                    type: 'price',
                    value: {
                        value: `${this.floorPrice}-${this.highPrice}万`,
                        key: `${this.floorPrice},${this.highPrice}`
                    }
                });
            }
        },
        // 更多重置
        resetMore(){
            for (let index = 0; index < this.moreList.length; index++) {
                this.moreList[index].mIndex = 0
            }
            this.fujiaArr = [];
        }
    }
}
</script>

<style lang="scss" scoped>
    .marginTop-0{
        margin-top: 0;
    }
    .car-bot{
        bottom: 160px;
    }
    .car-filter{
        z-index: 1600;
        background-color: #fff;
        position: fixed;
        top: 104px;
        left: 0;
        right: 0;
        
        // bottom: 160px;
        // overflow-y: auto;

        // 价格
        .price{
            padding: 40px 40px 60px;
            .price-input{
                padding-bottom: 40px;
                border-bottom: 1PX solid #ddd;
                align-items: center;
                justify-content: space-between;
                .d1{
                    align-items: center;
                    input{
                        box-sizing: border-box;
                        border: 1PX solid #dddd;
                        border-radius: 8px;
                        width: 160px;
                        height: 80px;
                        line-height: 80px;
                        font-size: 28px;
                        text-align: center;
                        outline: none;
                    }
                    em{
                        margin: 0 20px;
                    }
                    p{
                        margin-left: 20px;
                        font-size: 28px;
                    }
                }
                .d2{
                    width: 120px;
                    height: 80px;
                    color: #fff;
                    text-align: center;
                    line-height: 80px;
                    background-color: #716dff;
                    border-radius: 8px;
                    font-size: 28px;
                }   
            }
            .quick-select{
                h2{
                    padding: 40px 0 0;
                }
                .price-list{
                    overflow: hidden;
                    .price-item{
                        float: left;
                        margin-top: 40px;
                        margin-right: 30px;
                        height: 72px;
                        line-height: 72px;
                        border:  1PX solid #ddd;
                        border-radius: 8px;
                        color: #666;
                        font-size: 28px;
                        padding: 0 20px;
                        line-height: 72px;
                        box-sizing: border-box;
                    }
                    .price-item.active{
                        font-weight: 900;
                        color: #716dff;
                        border-color: #716dff;
                    }
                }
            }
        }  
        // 车型
        .model{
            padding: 10px 40px 60px;
            .model-list{
                overflow: hidden;
                .model-item{
                    float: left;
                    line-height: 72px;
                    border: 1PX solid #ddd;
                    padding: 0 20px;
                    margin-right: 30px;
                    margin-top: 30px;
                }
            }
        } 
        // 排序
        .sort{
            padding: 40px 40px 60px;
            overflow: hidden;
            div{
                float: left;
                display: flex;
                margin-right: 30px;
                height: 72px;
                border: 1PX solid #ddd;
                border-radius: 8px;
                align-items: center;
                padding: 0 20px;
                p{
                    font-size: 28px;
                    color: #666;
                }
                img{
                    width: 12px;
                    height: 20px;
                    margin-left: 10px;
                }
            }
            div.active{
                border-color: #716dff;
                p{
                    font-weight: 900;
                    color: #716dff;
                }
            }
        }
        // 更多
        .more{
            overflow: hidden;
            .more-list{
                padding: 40px 40px 60px;
                overflow: auto;
            }
            // padding-bottom: 100px;
            .more-item:first-child{
                .title{
                    margin-top: 0;
                }
            }
            .more-item{
                overflow: hidden;
                .title{
                    font-size: 28px;
                    font-weight: 900;
                    margin-top: 60px;
                    em{
                        font-weight: 400;
                        color: #666;
                    }
                }
                div{
                    float: left;
                    font-size: 28px;
                    border: 1PX solid #ddd;
                    border-radius: 8px;
                    line-height: 72px;
                    padding: 0 20px;
                    margin-top: 40px;
                    margin-right: 30px;
                    color: #666;
                }
                div.active{
                    font-weight: 900;
                    color: #716dff;
                    border-color: #716dff;
                }
            }
            .more-bot{
                border-top: 1PX solid #eee;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 0 40px;
                height: 100px;
                justify-content: space-between;
                align-items: center;
                background-color: #fff;
                div{
                    height: 80px;
                    font-size: 28px;
                    line-height: 80px;
                    text-align: center;
                    width: calc(50% - 15px);
                    border-radius: 8px;
                }
                .reset{
                    color: #716dff;
                    border: 1PX solid #716dff;
                }
                .confirm{
                    color: #fff;
                    background-color: #716dff;
                }
            }
        }
        
    }
</style>