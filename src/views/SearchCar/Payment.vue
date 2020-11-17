<template>
    <div class="payment">
        <img src="../../assets/images/searchcar/baogaoshengcheng.png" alt="">
        <div class="tips">报告查询中<p>（15分钟内）</p>，完成后会在公众号内</div>
        <div class="tips">消息提醒，结果可在“查询记录”中查看</div>
        <div class="btn">
            <div @click="jixu" class="jixu">继续查询</div>
            <div @click="jilu" class="jilu">查询记录</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        jixu(){
            this.$router.push('/searchcar');
        },
        jilu(){
            this.$router.push('/searchrecord');
        }
    }
}
</script>

<style lang="scss" scoped>
    .payment{
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 160px auto 0;
        }
        div.tips{
            font-size: 28px;
            margin-top: 30px;
            text-align: center;
            p{
                color: #ff5c5c;
                display: inline-block;
            }
        }
        div.btn{
            padding: 0 40px;
            position: absolute;
            bottom: 240px;
            left: 0;
            right: 0;
            div{
                line-height: 98px;
                border-radius: 8px;
                text-align: center;
                font-size: 28px;
                margin-top: 40px;
            }
            .jixu{
                color: #fff;
                background-color: #716dff;
            }
            .jilu{
                color: #716dff;
                background-color: #fff;
                border: 2px solid #716dff;
            }
        }
    }
</style>