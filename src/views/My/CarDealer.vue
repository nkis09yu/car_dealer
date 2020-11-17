<template>
    <div class="car-dealer">
        <div class="list">
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/mingcheng.png" alt="名称">
                    <p>名称</p>
                </div>
                <div class="right flex">
                    <input v-model.trim="company" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/diqu.png" alt="地区">
                    <p>地区</p>
                </div>
                <div @click="openAddr" class="right flex">
                    <input v-model="city" disabled type="text" placeholder="选择">
                    <img src="../../assets/images/my/right.png" alt="名称">
                </div>
            </div>
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/dizhi.png" alt="地址">
                    <p>地址</p>
                </div>
                <div class="right flex">
                    <input v-model.trim="address" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/lianxiren.png" alt="联系人">
                    <p>联系人</p>
                </div>
                <div class="right flex">
                    <input v-model.trim="contact" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/dianhua.png" alt="电话">
                    <p>电话</p>
                </div>
                <div class="right flex">
                    <input v-model.trim="phone" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <div class="left flex">
                    <img src="../../assets/images/my/xiangguan.png" alt="相关资料">
                    <p>相关资料</p>
                </div>
            </div>
        </div>
        <div class="img-list flex">
            <div class="img-item">
                <div>
                    <img @click="openImg('门店照片1')" v-if="m1" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m1URL)"
                        v-show="!m1"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m1URL"
                    />
                    <img v-show="!m1" @click.stop="deleteImg('门店照片1')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>门店照片1</p>
            </div>
            <div class="img-item img-item-center">
                <div>
                    <img @click="openImg('门店照片2')" v-if="m2" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m2URL)"
                        v-show="!m2"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m2URL"
                    />
                    <img v-show="!m2" @click.stop="deleteImg('门店照片2')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>门店照片2（可选）</p>
            </div>
            <div class="img-item">
                <div>
                    <img @click="openImg('门店照片3')" v-if="m3" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m3URL)"
                        v-show="!m3"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m3URL"
                    />
                    <img v-show="!m3" @click.stop="deleteImg('门店照片3')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>门店照片3（可选）</p>
            </div>
        </div>
        <div class="img-list flex img-list-2">
            <div class="img-item">
                <div>
                    <img @click="openImg('营业执照')" v-if="m4" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m4URL)"
                        v-show="!m4"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m4URL"
                    />
                    <img v-show="!m4" @click.stop="deleteImg('营业执照')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>营业执照</p>
            </div>
            <div class="img-item img-item-center">
                <div>
                    <img @click="openImg('法人身份证正面')" v-if="m5" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m5URL)"
                        v-show="!m5"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m5URL"
                    />
                    <img v-show="!m5" @click.stop="deleteImg('法人身份证正面')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>法人身份证正面</p>
            </div>
            <div class="img-item">
                <div>
                    <img @click="openImg('法人身份证反面')" v-if="m6" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(m6URL)"
                        v-show="!m6"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="m6URL"
                    />
                    <img v-show="!m6" @click.stop="deleteImg('法人身份证反面')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>法人身份证反面</p>
            </div>
        </div>
        <div @click="submit" class="submit"><p>立即提交</p></div>
        <!-- 地址选择器 -->
        <van-popup v-model="showAddr" position="bottom">
            <van-area 
                title="地址选择" 
                :area-list="areaList" 
                :columns-num="2" 
                 @confirm="areaConfirm"
                @cancel="areaCancel"
            />
        </van-popup>
        <!-- 图片选择 -->
        <van-popup v-model="showImg" position="bottom">
            <div class="img-picker">
                <div @click="camera">拍照</div>
                <div @click="album">从相册选择</div>
                <div @click="imgCancel">取消</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import {getOpenId} from '../../assets/js/utils.js'
import wx from 'weixin-js-sdk';
import Vue from 'vue';
import { Popup, Area, ImagePreview } from 'vant';
import areaList from '../../assets/js/area'
Vue.use(Area);
Vue.use(Popup);
Vue.use(ImagePreview);
export default {
    data(){
        return {
            showAddr: false,
            areaList: areaList,
            showImg: false,
            company: '',//公司名称
            province: '',//省份
            city: '',//城市
            address: '',//地址
            contact: '',//联系人
            phone: '',//手机号,
            type: '',
            m1: true,
            m2: true,
            m3: true,
            m4: true,
            m5: true,
            m6: true,
            m1URL: '',
            m2URL: '',
            m3URL: '',
            m4URL: '',
            m5URL: '',
            m6URL: '',
            m1Fid: '',
            m2Fid: '',
            m3Fid: '',
            m4Fid: '',
            m5Fid: '',
            m6Fid: '',
            // 是否销毁
            destroyedFlag: false,
            timer: ''
        }
    },
    mounted(){
        getOpenId(this);
        this.initJSSDK();
        this.init();
        this.timer = setInterval(this.huancun, 1000);
    },
    methods: {
        // 读取缓存
        init(){
            if(localStorage.carDealerParams){
                let params = JSON.parse(localStorage.carDealerParams);
                let myParams = JSON.parse(JSON.stringify(params));
                this.company= myParams.company;
                this.province= myParams.province;
                this.city= myParams.city;
                this.address= myParams.address;
                this.contact= myParams.contact;
                this.phone= myParams.phone;
                this.m1= myParams.m1;
                this.m2= myParams.m2;
                this.m3= myParams.m3;
                this.m4= myParams.m4;
                this.m5= myParams.m5;
                this.m6= myParams.m6;
                this.m1URL= myParams.m1URL;
                this.m2URL= myParams.m2URL;
                this.m3URL= myParams.m3URL;
                this.m4URL= myParams.m4URL;
                this.m5URL= myParams.m5URL;
                this.m6URL= myParams.m6URL;
                this.m1Fid= myParams.m1Fid;
                this.m2Fid= myParams.m2Fid;
                this.m3Fid= myParams.m3Fid;
                this.m4Fid= myParams.m4Fid;
                this.m5Fid= myParams.m5Fid;
                this.m6Fid= myParams.m6Fid;
            }
        },
        initJSSDK(){
            // let signLink =  /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl;
            this.$http({
                method: 'post', 
                url: '/api/car_dealer_index.php?s=/Home/Jssdk/getSignPackage',
                async: false,
                data: this.qs.stringify({
                    url: location.href.split('#')[0],
                })
            })
            .then(res => {
                wx.config({
                    debug: false, // 开启调试模式,
                    appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'chooseImage',
                        'uploadImage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
            })
        },
        openAddr(){
            this.showAddr = true;
        },
        areaConfirm(value){
            this.showAddr = false;
            this.province = value[0].name
            this.city = value[1].name;
        },
        areaCancel(){
            this.showAddr = false;
        },
        // 打开图片选择
        openImg(type){
            this.type = type;
            this.showImg = true;
        },
        // 拍照
        camera(){
            this.showImg = false;
            this.uploadImg('camera');
        },
        // 相册选择
        album(){
            this.showImg = false;
            this.uploadImg('album');
        },
        // 关闭图片选择
        imgCancel(){
            this.showImg = false;
        },
        // 图片预览
        preview(url){
            ImagePreview([url]);
        },
        uploadImg(uploadType){
            const that = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: [uploadType], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    wx.uploadImage({
                        localId: res.localIds.toString(),
                         isShowProgressTips: 1,
                         success: function (uploadRes) {
                            that.$http({
                                method: 'post',
                                url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                data: that.qs.stringify({
                                    openid: localStorage.openid,
                                    file_desc: that.type,
                                    server_id: uploadRes.serverId
                                })
                            })
                            .then( saveRes => {
                                if(saveRes.data.code == 0){
                                    if(that.type == '门店照片1'){
                                        that.m1 = false;
                                        that.m1URL = res.localIds;
                                        that.m1Fid = saveRes.data.data.fid;
                                    }else if(that.type == '门店照片2'){
                                        that.m2 = false;
                                        that.m2URL = res.localIds;
                                        that.m2Fid = saveRes.data.data.fid;
                                    }else if(that.type == '门店照片3'){
                                        that.m3 = false;
                                        that.m3URL = res.localIds;
                                        that.m3Fid = saveRes.data.data.fid;
                                    }else if(that.type == '营业执照'){
                                        that.m4 = false;
                                        that.m4URL = res.localIds;
                                        that.m4Fid = saveRes.data.data.fid;
                                    }else if(that.type == '法人身份证正面'){
                                        that.m5 = false;
                                        that.m5URL = res.localIds;
                                        that.m5Fid = saveRes.data.data.fid;
                                    }else if(that.type == '法人身份证反面'){
                                        that.m6 = false;
                                        that.m6URL = res.localIds;
                                        that.m6Fid = saveRes.data.data.fid;
                                    }
                                }else{
                                    that.$toast(saveRes.data.msg);
                                }
                            })
                        }
                    })
                }
            })
        },
        //删除照片
        deleteImg(type){
            this.$dialog.confirm({
                title: '删除确认',
                message: '确定删除这张照片吗？'
            })
            .then( () => {
                if(type == '门店照片1'){
                    this.m1 = true;
                    this.m1URL = '';
                    this.m1Fid = '';
                }else if(type == '门店照片2'){
                    this.m2 = true;
                    this.m2URL = '';
                    this.m2Fid = '';
                }else if(type == '门店照片3'){
                    this.m3 = true;
                    this.m3URL = '';
                    this.m3Fid = '';
                }else if(type == '营业执照'){
                    this.m4 = true;
                    this.m4URL = '';
                    this.m4Fid = '';
                }else if(type == '法人身份证正面'){
                    this.m5 = true;
                    this.m5URL = '';
                    this.m5Fid = '';
                }else if(type == '法人身份证反面'){
                    this.m6 = true;
                    this.m6URL = '';
                    this.m6Fid = '';
                }
            })
            .catch( () => {
                // 
            })
        },
        
        // 立即提交
        submit(){
            let fidArr = [this.m1Fid,this.m2Fid,this.m3Fid,this.m4Fid,this.m5Fid,this.m6Fid].filter( s => {
                return s && s.trim();
            })
            if(this.company == ''){
                this.$toast('请选择公司名称');
            }else if(this.city == ''){
                this.$toast('请选择地区');
            }else if(this.address == ''){
                this.$toast('请填写地址');
            }else if(this.contact == ''){
                this.$toast('请填写联系人');
            }else if(!(/^((\+|00)86)?1[3-9]\d{9}$/).test(this.phone)){
                this.$toast('请填写正确的手机号码');
            }else if(this.m1Fid == ''){
                this.$toast('请上传门店照片');
            }else if(this.m4Fid == ''){
                this.$toast('请上传营业执照');
            }else if(this.m5Fid == ''){
                this.$toast('请上传法人身份证正面');
            }else if(this.m6Fid == ''){
                this.$toast('请上传法人身份证反面');
            }else{
                this.$toast.loading({
                    message: '提交中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration: 0,
                });
                this.$http({
                    method: 'post',
                    url: '/api/car_dealer_index.php?s=/Home/User/verify',
                    data: this.qs.stringify({
                        openid: localStorage.openid,
                        verify_type: '车商认证',
                        company: this.company,
                        province: this.province,
                        city: this.city,
                        address: this.address,
                        contact: this.contact,
                        phone: this.phone,
                        fids: fidArr.toString()
                    })
                }).then( res => {
                    if(res.data.code == 0){
                        localStorage.removeItem('carDealerParams');
                        this.destroyedFlag = true;
                        this.$router.push('/submitsuccess');
                    }else{
                        this.$toast(res.data.msg);
                    };
                    this.$toast.clear();
                })
                .catch( err => {
                    this.$toast.clear();
                })
            }
        },
        huancun(){
            let params = {
                company: this.company,
                province: this.province,
                city: this.city,
                address: this.address,
                contact: this.contact,
                phone: this.phone,
                m1: this.m1,
                m2: this.m2,
                m3: this.m3,
                m4: this.m4,
                m5: this.m5,
                m6: this.m6,
                m1URL: this.m1URL,
                m2URL: this.m2URL,
                m3URL: this.m3URL,
                m4URL: this.m4URL,
                m5URL: this.m5URL,
                m6URL: this.m6URL,
                m1Fid: this.m1Fid,
                m2Fid: this.m2Fid,
                m3Fid: this.m3Fid,
                m4Fid: this.m4Fid,
                m5Fid: this.m5Fid,
                m6Fid: this.m6Fid,
            };
            localStorage.carDealerParams = JSON.stringify(params);
        }
    },

    destroyed(){
        clearInterval(this.timer);
        if(!this.destroyedFlag){
            this.huancun();
        }
    }
}
</script>

<style lang="scss" scoped>
    .car-dealer{
        font-size: 28px;
        .list{
            .item{
                background-color: #fff;
                height: 108px;
                border-bottom: 1PX solid #ddd;
                padding: 0 40px;
                justify-content: space-between;
                align-items: center;
                input{
                    text-align: right;
                    border: none;
                    background-color: #fff;
                    width: 100%;
                }
                input::-webkit-input-placeholder {  	/* WebKit browsers */
                    color: #999;
                }
                div.left{
                    align-items: center;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                    p{
                        margin-left: 24px;
                    }
                }
                div.right{
                    align-items: center;
                    flex: 1;
                    margin-left: 150px;
                    justify-content: flex-end;
                    img{
                        width: 14px;
                        height: 24px;
                        margin-left: 24px;
                    }
                }
            }
            .item:last-child{
                border: none;
            }
        }
        .img-list{
            padding: 40px;
            justify-content: space-between;
            .img-item{
                text-align: center;
                flex: 1;
                position: relative;
                div{
                    width: 100%;
                    height: 208px;
                    text-align: center;
                    background-color: #f8f8f8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    img.add-img{
                        width: 40px;
                        height: 40px;
                    }
                    img.img{
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                    }
                    img.delete{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 56px;
                        height: 56px;
                    }
                }
                p{
                    color: #999;
                    margin-top: 24px;
                }
            }
            .img-item-center{
                margin: 0 24px;
            }
        }
        .img-list-2{
            padding-top: 20px;
        }
        .img-picker{
            div{
                line-height: 108px;
                text-align: center;
                font-size: 28px;
                border-bottom: 1PX solid #ddd;
            }
            div:last-child{
                border: none;
            }
        }
        .submit{
            border-top: 16px solid #f8f8f8;
           p{
                line-height: 98px;
                color: #fff;
                margin: 80px 40px;
                text-align: center;
                background-color: #716dff;
                border-radius: 8px;
                font-size: 28px;
           }
        }
    }
</style>