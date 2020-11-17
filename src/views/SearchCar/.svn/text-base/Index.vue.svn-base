<template>
    <div class="search">
        <div class="banner">
            <img src="../../assets/images/searchcar/banner1.png" alt="banner">
        </div>
        <div class="record flex flex-aj">
            <div class="d1 flex flex-aj"> 
                <img src="../../assets/images/searchcar/record.png" alt="">
                <p class="bold">查询记录</p>
            </div>
            <div @click="jilu" class="d2 flex flex-aj">
                <p>{{recordNum}}</p>
                <img src="../../assets/images/my/right.png" alt="">
            </div>
        </div>
        <div class="ct">
            <div class="flex cx">
                <img src="../../assets/images/my/weibao.png" alt="">
                <p class="bold fontSize-40">维保记录查询</p>
                <p class="bold fontSize-40">￥10</p>
                <em class="bold">元起</em>
            </div>
            <p class="ks color-666 fontSize-28 ellipsis">快速查询并反馈，可查询维修/索赔/里程记录/维保记录/零件更换等。</p>
            <div class="btn">
                <div @click="chaxun" class="lj">立即查询</div>
                <div @click="shili" class="sl">示例报告</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
export default {
    data(){
        return {
            recordNum: 0,
        }
    },
    mounted(){
        getOpenId(this);
        this.init();
    },
    methods: {
        init() {
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/SearchRecordNum',
                data: this.qs.stringify({
                    openid: localStorage.openid
                })
            })
            .then(res => {
                this.recordNum = res.data.data
            })
        },
        chaxun(){
            this.$router.push('/maintenancerecord');
        },
        jilu(){
            this.$router.push('/searchrecord');
        },
        shili(){
            this.$router.push('/report?report_id=wx28150807314436b8225ee0551756445200');
        }
    }
}
</script>

<style lang="scss" scoped>
    .search{
        height: 100%;
        .banner{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .record{
            padding: 40px;
            font-size: 32px;
            border-bottom: 16px solid #eee;
            .d1{
                img{
                    width: 40px;
                    height: 40px;
                    margin-right: 24px;
                }
            }
            .d2{
                p{
                    color: #666;
                }
                img{
                    width: 14px;
                    height: 24px;
                    margin-left: 24px;
                }
            }
        }
        .ct{
            margin: 40px;
            overflow: hidden;
            border-bottom: 1PX solid #ddd;
            .cx{
                align-items: flex-end;
                img{
                    width: 40px;
                    height: 40px;
                    align-items: center;
                }
                p{
                    margin-left: 24px;
                }
                em{
                    font-size: 28px;
                    margin-left: 5px;
                }
            }
            p.ks{
                padding: 24px 100px 40px 64px;
            }
            .btn{
                padding: 0 0 40px 64px;
                overflow: hidden;
                div{
                    height: 80px;
                    font-size: 28px;
                    padding: 0 40px;
                    line-height: 80px;
                    float: left;
                    border-radius: 8px;
                }
                .lj{
                    background-color: #716dff;
                    color: #fff;
                }
                .sl{
                    color: #716dff;
                    border: 3px solid #716dff;
                    margin-left: 40px;
                    line-height: 74px;
                }
            }
        }
        
    }
</style>
