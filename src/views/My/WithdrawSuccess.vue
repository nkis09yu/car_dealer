<template>
    <div class="s">
        <img src="../../assets/images/my/success.png" alt="提现成功">
        <p>提现成功，请留意账户余额</p>
        <div @click="go" class="btn">我知道了</div>
    </div>
</template>

<script>
export default {
    methods: {
        go(){
            this.$router.push('/popularize');
        }
    }
}
</script>

<style scoped>
    .s{
        overflow: hidden;
    }
    img{
        width: 200px;
        height: 200px;
        display: block;
        margin: 160px auto 0;
    }
    p{
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
    }
    div.btn{
        position: absolute;
        left: 40px;
        right: 40px;
        bottom: 240px;
        height: 98px;
        line-height: 98px;
        background-color: #716dff;
        color: #fff;
        font-size: 28px;
        text-align: center;
        border-radius: 8px;
    }
</style>