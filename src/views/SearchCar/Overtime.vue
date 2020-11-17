<template>
    <div class="overtime">
        <img src="../../assets/images/my/success.png" alt="">
        <p>退款成功，请留意原支付账户的余额</p>
        <div @click="know" class="cm-btn">我知道了</div>
    </div>
</template>

<script>
export default {
    methods: {
        know(){
            this.$router.push('/searchcar');
        }
    }
}   
</script>

<style lang="scss" scoped>
    .overtime{
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 160px auto 0;
        }
        p{
            text-align: center;
            font-size: 28px;
            margin-top: 30px;
        }
        div{
            color: #fff;
            background-color: #716dff;
            position: absolute;
            left: 40px;
            right: 40px;
            bottom: 240px;
        }
    }
</style>