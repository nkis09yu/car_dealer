<template>
    <div class="cs">
        <img class="banner" src="../../assets/images/my/cs.png" alt="">
        <div class="cont">
            <div class="title bold">
                <h1>联系我们</h1>
                <p>CONTACT US</p>
            </div>
            <div class="list">
                <div class="item">
                    <img src="../../assets/images/my/kp.png" alt="">
                    <p class="p1">客服电话：</p>
                    <a href="tel:15332187709">15332187709（微信同号）</a>
                </div>
                <div class="item">
                    <img src="../../assets/images/my/zp.png" alt="">
                    <p class="p1">座机号码：</p>
                    <a href="tel:022-58956346">022-58956346</a>
                </div>
                <div class="item">
                    <img src="../../assets/images/my/sh.png" alt="">
                    <p class="p1">商务合作：</p>
                    <a href="tel:15097670122">15097670122（微信同号）</a>
                </div>
                <div class="item">
                    <img src="../../assets/images/my/sy.png" alt="">
                    <p class="p1">商务邮箱：</p>
                    <a href="mailto:15097670122">ts_asus163.com</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .cs{
        height: 100%;
        background-color: #5452ea !important;
        position: relative;
        .banner{
            width: 100%;
        }
        .cont{
            position: absolute;
            bottom: 60px;
            left: 40px;
            right: 40px;
            background-color: #fff;
            border-radius: 16px;
            padding: 60px 20px 80px 40px;
            .title{
                text-align: center;
                position: relative;
                h1{
                    font-size: 48px;
                    z-index: 88;
                    position: absolute;
                    width: 100%;
                }
                p{
                    font-size: 36px;
                    color: #ddd;
                    position: absolute;
                    width: 100%;
                    top: 30px;
                }
            }
            .list{
                margin-top: 120px;
                .item{
                    display: flex;
                    align-items: center;
                    margin-top: 60px;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                    p{
                        font-size: 28px;
                        margin-left: 20px;
                        color: #666;
                    }
                    a{
                        font-size: 30px;
                        color: #333;
                    }
                }
            }
        }

    }
    
</style>