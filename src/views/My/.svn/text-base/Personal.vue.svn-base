<template>
    <div class="car-dealer">
        <div class="list">
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
                    <img @click="openImg('身份证正面')" v-show="showSZ" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(szURL)"
                        v-show="!showSZ"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="szURL"
                    />
                    <img v-show="!showSZ" @click.stop="deleteImg('身份证正面')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>身份证正面</p>
            </div>
            <div class="img-item img-item-center">
                <div>
                    <img @click="openImg('身份证反面')" v-show="showSF" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(sfURL)"
                        v-show="!showSF"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="sfURL"
                    />
                    <img v-show="!showSF" @click.stop="deleteImg('身份证反面')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>身份证反面</p>
            </div>
            <div class="img-item">
                <div>
                    <img @click="openImg('行驶证')" v-show="showXS" class="add-img" src="../../assets/images/my/add-img.png" alt="添加照片">
                    <van-image
                        @click.stop="preview(xsURL)"
                        v-show="!showXS"
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="xsURL"
                    />
                    <img v-show="!showXS" @click.stop="deleteImg('行驶证')" class="delete" src="../../assets/images/my/delete.png" alt="">
                </div>
                <p>行驶证</p>
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
            province: '',
            city: '',
            address: '',
            contact: '',
            phone: '',
            type: '',
            showSZ: true,//
            showSF: true,//
            showXS: true,//
            szURL: '',//身份证正面
            sfURL: '',//身份证反面
            xsURL: '',//行驶证
            szFid: '',
            sfFid: '',
            xsFid: '',
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
            if(localStorage.personalParams){
                let params = JSON.parse(localStorage.personalParams);
                let myParams = JSON.parse(JSON.stringify(params));
                this.address= myParams.address;
                this.contact= myParams.contact;
                this.phone= myParams.phone;
                this.showSZ= myParams.showSZ;
                this.showSF= myParams.showSF;
                this.showXS= myParams.showXS;
                this.szFid= myParams.szFid;
                this.szURL= myParams.szURL;
                this.sfFid= myParams.sfFid;
                this.sfURL= myParams.sfURL;
                this.xsFid= myParams.xsFid;
                this.xsURL= myParams.xsURL;
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
            this.province = value[0].name;
            this.city = value[1].name;
        },
        areaCancel(){
            this.showAddr = false;
        },
        // 打开图片选择
        openImg(type){
            this.showImg = true;
            this.type = type;
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
                                    if(that.type == '身份证正面'){
                                        that.showSZ = false;
                                        that.szURL = res.localIds;
                                        that.szFid = saveRes.data.data.fid;
                                    }else if(that.type == '身份证反面'){
                                        that.showSF = false;
                                        that.sfURL = res.localIds;
                                        that.sfFid = saveRes.data.data.fid;
                                    }else if(that.type == '行驶证'){
                                        that.showXS = false;
                                        that.xsURL = res.localIds;
                                        that.xsFid = saveRes.data.data.fid;
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
        // 图片预览
        preview(url){
            ImagePreview([url]);
        },
        // 删除图片
        deleteImg(type){
            this.$dialog.confirm({
                title: '删除确认',
                message: '确定删除这张照片吗？'
            })
            .then( () => {
                if(type == '身份证正面'){
                    this.showSZ = true;
                    this.szURL = '';
                    this.szFid = '';
                }else if(type == '身份证反面'){
                    this.showSF = true;
                    this.sfURL = '';
                    this.sfFid = '';
                }else if(type == '行驶证'){
                    this.showXS = true;
                    this.xsURL = '';
                    this.xsFid = '';
                }
            })
            .catch( () => {
                // 
            })
            
        },
        // 关闭图片选择
        imgCancel(){
            this.showImg = false;
        },
        // 立即提交
        submit(){
            if(this.city == ''){
                this.$toast('请选择地区');
            }else if(this.address == ''){
                this.$toast('请填写地址');
            }else if(this.contact == ''){
                this.$toast('请填写联系人');
            }else if(!(/^((\+|00)86)?1[3-9]\d{9}$/).test(this.phone)){
                this.$toast('请填写正确的手机号码');
            }else if(this.szFid == ''){
                this.$toast('请上传身份证正面');
            }else if(this.sfFid == ''){
                 this.$toast('请上传身份证反面');
            }else if(this.xsFid == ''){
                 this.$toast('请上传行驶证');
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
                        verify_type: '个人认证',
                        province: this.province,
                        city: this.city,
                        address: this.address,
                        contact: this.contact,
                        phone: this.phone,
                        fids: `${this.szFid},${this.sfFid},${this.xsFid}`
                    })
                })
                .then( res => {
                    if(res.data.code == 0){
                        localStorage.removeItem('personalParams');
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
                address: this.address,
                contact: this.contact,
                phone: this.phone,
                showSZ: this.showSZ,
                showSF: this.showSF,
                showXS: this.showXS,
                szFid: this.szFid,
                szURL: this.szURL,
                sfFid: this.sfFid,
                sfURL: this.sfURL,
                xsFid: this.xsFid,
                xsURL: this.xsURL,
            };
            localStorage.personalParams = JSON.stringify(params);
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