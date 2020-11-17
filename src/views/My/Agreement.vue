<template>
    <div class="xieyi">
        <div class="cc">
            <p class="bold title">佣金获取</p>
            <p class="cont">通过扫码或分享链接，推荐用户关注公众号且付费查询车辆信息，可获得佣金</p>
            <p class="cont">用户查询报告生成后，系统自动返佣。查询未成功或客户退款则无佣金</p>
        </div>
        <div class="cc">
            <p class="bold title">佣金金额</p>
            <p class="cont">常规品牌维保记录查询返佣为3元/次，特殊品牌返佣为5元/次；</p>
        </div>
        <div class="cc">
            <p class="bold title">佣金提现</p>
            <p class="cont">佣金满5元后可随时提现，提现后立即到账；</p>
        </div>
        <div class="cc">
            <p class="bold title">返现机制</p>
            <p class="cont">推广人需注意：本机查询佣金返给上级推荐人；</p>
            <p class="cont">有20人以上团队的推广人，可申请“团队推广人”，</p>
            <p class="cont">申请专线：15332187709；</p>
        </div>
        <!-- <div class="kaitong">
            <p>同意协议，开通推广</p>
        </div> -->
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .xieyi{
        margin-bottom: 0 !important;
        padding: 0 40px;
        margin-bottom: 50px;
    }
    .cc{
        margin-top: 20px;
        overflow: hidden;
        .title{
            font-size: 32px;
            margin: 40px 0;
        }
        .cont{
            font-size: 28px;
            line-height: 2;
        }
    }
    .cc:first-child{
        margin-top: 0;
    }
    .kaitong{
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
</style>