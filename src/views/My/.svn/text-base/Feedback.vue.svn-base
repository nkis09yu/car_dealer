<template>
    <div class="feedback">
        <p class="title">请选择反馈问题的类型</p>
        <div class="list">
            <div :class="typeIndex == index ? 'active' : ''" @click="feedbackType(index)" v-for="(item, index) in type" :key="index" class="item">{{item}}</div>
        </div>
        <p class="title">请详细描述你的建议、意见、问题等：</p>
        <textarea v-model.trim="content"  placeholder="请输入..."></textarea>
        <p class="title">请预留联系方式（选填，可快速回复）：</p>
        <input v-model.trim="phone" type="text" placeholder="请输入...">
        <div @click="tijiao" class="submit">立即提交</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type: ['车辆信息', '使用操作', '车辆欺诈', '推广问题', '查车报告', '其他问题'],
            typeIndex: -1,
            typeArr: [],
            content: '',
            phone: ''
        }
    },
    methods: {
        feedbackType(i){
            this.typeIndex = i;
        },
        tijiao(){
            if(this.typeIndex<0 || this.typeIndex>5){
                this.$toast('请选择反馈类型')
            }else if(this.content==''){
                this.$toast('请填写详细建议')
            }else if(this.phone != '' && !(/^1(3|4|5|6|7|8|9)\d{9}$/).test(this.phone)){
                this.$toast('请填写正确的手机号')
            }else{
                this.$toast.loading({
                    message: '提交中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration: 0
                })
                this.$http({
                    method: 'post',
                    url: '/api/car_dealer_index.php?s=/Home/User/Feedback',
                    data: this.qs.stringify({
                        openid: localStorage.openid,
                        category: this.type[this.typeIndex],
                        content: this.content,
                        phone: this.phone
                    })
                })
                .then( res => {
                    if(res.data.code == 0){
                        this.$toast.clear();
                        this.$router.push('/feedbacksuc');
                    }else{
                        this.$toast(res.data.msg);
                        setTimeout(() => {
                            this.$toast.clear();
                        }, 2000);
                    }
                })
                .catch( () => {
                    this.$toast.clear();
                })
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .feedback{
        margin-bottom: 0 !important;
        padding: 0 40px;
        .title{
            padding-top: 50px;
            font-size: 28px;
            color: #999;
        }
        .list{
            overflow: hidden;
            .item{
                float: left;
                margin-top: 30px;
                margin-right: 30px;
                font-size: 28px;
                color: #666;
                height: 72px;
                line-height: 72px;
                text-align: center;
                padding: 0 20px;
                border: 1PX solid #ddd;
                border-radius: 8px;
            }
            .active{
                color: #716dff;
                border-color: #716dff;
            }
        }
        textarea{
            padding: 30px 20px;
            height: 240px;
            border: 1PX solid #ccc;
            border-radius: 8px;
            margin-top: 30px;
            font-size: 28px;
            width: calc(100% - 40px);
            resize: none;
        }
        input{
            margin-top: 30px;
            height: 98px;
            border-radius: 8px;
            border: 1PX solid #ccc;
            line-height: 98px;
            padding: 0 20px;
            width: calc(100% - 40px);
            font-size: 28px;
        }
        .submit{
            color: #fff;
            background-color: #716dff;
            line-height: 98px;
            margin-top: 80px;
            text-align: center;
            font-size: 28px;
            border-radius: 8px;
        }
    }
</style>