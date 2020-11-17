<template>
    <div class="success">
        <img src="../../assets/images/my/success.png" alt="成功">
        <p class="txt">发布车辆成功</p>
        <div>
            <p @click="release" class="btn b1">继续发布</p>
            <p @click="view" class="btn b2">查看车辆</p>
        </div>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
export default {
    methods: {
        release(){
            this.$router.push('/release');
        },
        view(){
            this.$router.push('/vehiclemanagement');
        }
    }
}
</script>

<style lang="scss" scoped>
    .success{
        margin-bottom: 0 !important;
        padding-top: 160px;
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto;
        }
        p.txt{
            margin-top: 30px;
            text-align: center;
            font-size: 28px;
        }
        div{
            position: fixed;
            bottom: 240px;
            left: 40px;
            right: 40px;
            p{
                width: 100%;
                color: #fff;
                height: 98px;
                background-color: #716dff;
                text-align: center;
                line-height: 98px;
                border-radius: 8px;
                font-size: 28px;
            }
            .b2{
                margin-top: 40px;
                color: #716dff;
                border: 2px solid #716dff;
                color: #716dff;
                background-color: #fff;
            }
        }
    }   
</style>