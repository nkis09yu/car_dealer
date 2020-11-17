<template>
    <div v-if="this.$store.state.showFooter" class="footer">
        <ul>
            <li :class="footerIndex == index ? 'active' : ''" @click="footerClick(item)" v-for="(item, index) in footerList" :key="index">
                <img :src="footerIndex == index ? item.imgActiveSrc : item.imgSrc" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // footerIndex: 0,
            footerList: [
                {
                    name: '找车',
                    imgSrc: require('../assets/images/find.png'),
                    imgActiveSrc: require('../assets/images/find-s.png'),
                    path: 'http://yingyanchaxun.com/car_dealer/dist/index.html#/'
                    // path: '/'
                },
                {
                    name: '查车',
                    imgSrc: require('../assets/images/search.png'),
                    imgActiveSrc: require('../assets/images/search-s.png'),
                    path: 'http://yingyanchaxun.com/car_dealer/dist/index.html#/searchcar'
                    // path: '/searchcar'
                },
                {
                    name: '我的',
                    imgSrc: require('../assets/images/my.png'),
                    imgActiveSrc: require('../assets/images/my-s.png'),
                    path: 'http://yingyanchaxun.com/car_dealer/dist/index.html#/my'
                    // path: '/my'
                }
            ]
        }
    },
    computed: {
        footerIndex(){
            return this.$store.state.footerIndex
        }
    },
    methods: {
        footerClick(item){
            window.location.href = item.path;
            // this.$router.push(item.path)
        }
    }
}
</script>

<style lang="scss" scoped>
    .footer{
        background-color:#fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        ul{
            display: flex;
            justify-content: space-around;
            li{
                height: 100px;
                // display: flex;
                // flex-direction: column;
                // align-items: center;
                text-align: center;
                img{
                    width: 46px;
                    height: 46px;
                    margin-top: 10px;
                }
                p{
                    margin-top: 8px;
                    font-size: 20px;
                    color: #666;
                }
            }
            .active{
                p{
                    color: #716dff;
                }
            }
        }
    }
</style>