<template>
    <div class="release">
        <div class="head flex">
            <p class="bold">基本信息</p>
            <div @click="openType" class="flex">
                <img src="../../assets/images/my/saomiao.png" alt="扫描">
                <p>拍照生成</p>
            </div>
        </div>
        <div class="list">
            <div class="item flex">
                <label>车辆类型</label>
                <div @click="openPop('carType')" class="flex">
                    <p v-if="carType == ''" class="color-999">请选择</p>
                    <p v-if="carType != ''">{{carType}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>VIN码</label>
                <div class="flex input">
                   <input v-model.trim="vinCode" type="text" placeholder="请输入或扫行驶证">
                </div>
            </div>
            <div class="item flex">
                <label>品牌车系</label>
                <div class="flex input">
                   <input v-model.trim="chexi" type="text" placeholder="请输入，如奥迪A4">
                </div>
            </div>
            <div class="item flex">
                <label>具体车型</label>
                <div class="flex input">
                   <input v-model.trim="chexing" type="text" placeholder="请输入，如2018款2.0T自动豪华型">
                </div>
            </div>
            <div class="item flex">
                <label>表显里程</label>
                <div class="flex input">
                   <input v-model.trim="licheng" type="text" placeholder="请输入">
                   <p>万公里</p>
                </div>
            </div>
            <div class="item flex">
                <label>初次上牌</label>
                <div @click="openDatePicker('firstCard')" class="flex">
                    <p v-if="firstCard == ''" class="color-999">请选择</p>
                    <p v-if="firstCard != ''">{{firstCard}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>车身颜色</label>
                <div @click="openPop('carColor')" class="flex">
                    <p v-if="carColor == ''" class="color-999">请选择</p>
                    <p v-if="carColor != ''">{{carColor}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>变速箱</label>
                <div @click="openPop('gearbox')" class="flex">
                    <p v-if="gearbox == ''" class="color-999">请选择</p>
                    <p v-if="gearbox != ''">{{gearbox}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>排量</label>
                <div class="flex input">
                   <input v-model.trim="pailiang" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <label>排放标准</label>
                <div @click="openPop('emission')" class="flex">
                    <p v-if="emission == ''" class="color-999">请选择</p>
                    <p v-if="emission != ''">{{emission}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
        </div>
        <div class="border"></div>
        <div class="list">
            <div class="item flex">
                <label>核准人数</label>
                <div class="flex input">
                   <input v-model.trim="hezhun" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item flex">
                <label>使用性质</label>
                <div @click="openPop('use')" class="flex">
                    <p v-if="use == ''" class="color-999">请选择</p>
                    <p v-if="use != ''">{{use}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>出厂日期</label>
                <div  @click="openDatePicker('leaveFactory')" class="flex">
                    <p v-if="leaveFactory == ''" class="color-999">请选择</p>
                    <p v-if="leaveFactory != ''">{{leaveFactory}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>年检到期日</label>
                <div @click="openDatePicker('nianjian')" class="flex">
                    <p v-if="nianjian == ''" class="color-999">请选择</p>
                    <p v-if="nianjian != ''">{{nianjian}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>车辆所在地</label>
                <div @click="openArea('location')" class="flex">
                    <p v-if="location == ''" class="color-999">请选择</p>
                    <p v-if="location != ''">{{location}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
            <div class="item flex">
                <label>车辆归属地</label>
                <div @click="openArea('attribution')" class="flex">
                    <p v-if="attribution == ''" class="color-999">请选择</p>
                    <p v-if="attribution != ''">{{attribution}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
        </div>
        <div class="list">
            
            <div class="title bold">相关图片</div>
            <div class="tab-bar clearfix">
                <div @click="tabClick(index)" :class="tabIndex == index ? 'tab-active' : ''" class="tab-item" v-for="(tab, index) in imgTab" :key="index">{{tab}}</div>
            </div>
            <div class="img-cont">
                <div v-show="showWaiguan" class="waiguan img-list">
                    <div @click="imgPreview(url.localIds)" v-for="(url, index) in waiguan" :key="index" class="img-item">
                        <van-image
                            width="100%"
                            height="100%"
                            fit="cover"
                            :src="url.localIds"
                        />
                        <div @click.stop="deleteImgW(url)" class="delete"><img src="../../assets/images/my/delete.png" alt=""></div>
                    </div>
                    <div class="img-item">
                        <div @click="addImg('waiguan')" class="add-img"><img src="../../assets/images/my/add-img.png" alt="添加图片"></div>
                    </div>
                </div>
                <div v-show="!showWaiguan" class="neishi img-list">
                    <div @click="imgPreview(url.localIds)" v-for="(url, index) in neishi" :key="index" class="img-item">
                        <van-image
                            width="100%"
                            height="100%"
                            fit="cover"
                            :src="url.localIds"
                        />
                        <div @click.stop="deleteImgN(url)" class="delete"><img src="../../assets/images/my/delete.png" alt=""></div>
                    </div>
                    <div class="img-item">
                        <div @click="addImg('neishi')" class="add-img"><img src="../../assets/images/my/add-img.png" alt="添加图片"></div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="list">
            <div class="title bold">价格说明</div>
            <div class="item flex">
                <label>个人零售价</label>
                <div class="flex input">
                   <input v-model.trim="gerenjia" type="text" placeholder="请输入（仅个人买家可见）">
                   <p>万元</p>
                </div>
            </div>
            <div class="item flex">
                <label>车商批发价</label>
                <div class="flex input">
                   <input v-model.trim="cheshangjia" type="text" placeholder="请输入（仅车商可见）">
                   <p>万元</p>
                </div>
            </div>
            <div class="item flex">
                <label>含过户费</label>
                <div  @click="openPop('transfer')" class="flex">
                    <p v-if="transfer == ''" class="color-999">请选择</p>
                    <p v-if="transfer != ''">{{transfer}}</p>
                    <img src="../../assets/images/my/right.png" alt="">
                </div>
            </div>
        </div>
        <div class="list">
            <div class="title bold">车辆标签<p>（最多可选2项）</p></div>
            <div class="car-label clearfix">
                <div @click="labelClick(label)" :class="carLabelArr.includes(label) ? 'active' : ''" v-for="(label, index) in carLabel" :key="index" class="label-item">{{label}}</div>
            </div>
        </div> 
        <div class="list">
            <div class="title bold">车辆描述</div>
            <div class="car-desc clearfix">
                <div class="quick">快速标签：</div>
                <div @click="descClick(desc)" :class="descArr.includes(desc) ? 'active' : ''" v-for="(desc, index) in carDesc" :key="index" class="desc-item">{{desc}}</div>
            </div>
            <div class="desc-cont clearfix">
                <!-- <p v-if="descArr.length==0">请输入车辆描述</p> -->
                <p class="p" v-for="(desc, index) in descArr" :key="index">#{{desc}}#，</p>
                <textarea v-model.trim="descCont" cols="30" rows="10" placeholder="请输入车辆描述"></textarea>
            </div>
        </div>
        <div class="list">
            <div class="title bold">联系方式</div>
            <div class="item flex">
                <label>联系电话</label>
                <div class="flex input">
                   <input v-model.trim="phone" type="text" placeholder="请输入">
                </div>
            </div>

        </div>
        <div class="border"></div>

        <div @click="submit" class="submit">
            <p>立即提交</p>
        </div>

        <!-- picker选择器 -->
        <van-popup v-model="showPop" position="bottom">
            <van-picker
                :title="popTitle"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </van-popup>
        <!-- 日期选择器 -->
        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="日期选择"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="dateConfirm"
                @cancel="dateCancel"
            />
        </van-popup>
        <!-- 地址选择器 -->
        <van-popup v-model="showAddr" position="bottom">
            <van-area 
                :title="areaTitle" 
                :area-list="areaList" 
                :columns-num="2" 
                 @confirm="areaConfirm"
                @cancel="areaCancel"
            />
        </van-popup>
        <!-- 选择扫描类型 -->
        <van-popup v-model="showType" position="bottom">
            <div class="img-picker">
                <div @click="jiashizheng">行驶证</div>
                <div @click="vinma">VIN码</div>
                <div @click="typeCancel">取消</div>
            </div>
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
import { Picker, Popup, DatetimePicker, Area, ImagePreview  } from 'vant';
import areaList from '../../assets/js/area'
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Area);
Vue.use(Popup);
Vue.use(ImagePreview);
export default {
    data(){
        return {
            popTitle: '',
            showPop: false,
            // 基本类型
            carType: '',//车辆类型
            vinCode: '',//VIN码
            chexi: '',//品牌车系
            chexing: '',//具体车型
            licheng: '',//表显里程
            firstCard: '',//初次上牌时间
            carColor: '',//车身颜色
            gearbox: '',//变速箱
            pailiang: '',//排量
            emission: '',//排放标准
            hezhun: '',//核准人数
            use: '',//使用性质
            leaveFactory: '',//出厂日期
            nianjian: '',//年检到期日
            location: '',//车辆所在地
            attribution: '',//车辆归属地
            // 价格说明
            gerenjia: '',//个人零售价（万元）
            cheshangjia: '',//车商批发价（万元）
            transfer: '',//是否含过户费
            // 车辆标签
            carLabelArr: [],
            // 车辆描述
            descArr: [],
            descCont: '',
            // 联系方式
            phone: '',//联系电话

            columns: [],
            
            tabIndex: 0,
            imgTab: ['外观照片', '内饰照片'],
            carLabel: ['准新车', '高保值', '一手家用', '单位用车', '全程4S店保养'],
            
            carDesc: ['无重大事故', '无泡水火烧', '无改装', '车驾件完好', '外观损伤较少', '内饰整洁无磨损'],
            
            pickType: '',
            // 日期选择器
            showDatePicker: false,
            minDate: new Date(2000, 0, 1),
            maxDate: new Date(2030, 11, 31),
            currentDate: new Date(),
            
            dateType:'',//具体选择的那个日期选择器
            // 地址选择器
            areaList: areaList,
            areaTitle: '',
            showAddr: false,
            areaType: '',
            showImg: false,

            // 相关图片
            showWaiguan: true,
            waiguan: [],//外观照片
            neishi: [],//内饰照片
            imgType: 'waigaun',

            // 选择扫描类型
            showType: false,
            saomiaoType: 'jsz',//jsz-扫描驾驶证，vin扫描车架号识别VIN码；

        }
    },
    mounted(){
        getOpenId(this);
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        });
        this.initJSSDK();
        this.init();
    },
    methods: {
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Sale/SearchById',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    vehicle_id: this.$route.query.id
                })
            })
            .then( res => {
                if(res.data.code == 0){
                    this.params = res.data.data.params;
                    // 基本信息
                    this.carType = res.data.data.params['基本信息']['车辆类型'];
                    this.vinCode = res.data.data.params['基本信息']['VIN码'];
                    this.chexi = res.data.data.params['基本信息']['品牌车系'];
                    this.chexing = res.data.data.params['基本信息']['具体车型'];
                    this.licheng = res.data.data.params['基本信息']['表显里程'];
                    this.firstCard = res.data.data.params['基本信息']['初次上牌'];
                    this.carColor = res.data.data.params['基本信息']['车身颜色'];
                    this.gearbox = res.data.data.params['基本信息']['变速箱'];
                    this.pailiang = res.data.data.params['基本信息']['排量'];
                    this.emission = res.data.data.params['基本信息']['排放标准'];
                    this.hezhun = res.data.data.params['基本信息']['核准人数'];
                    this.use = res.data.data.params['基本信息']['使用性质'];
                    this.leaveFactory = res.data.data.params['基本信息']['出厂日期'];
                    this.nianjian = res.data.data.params['基本信息']['年检到期日'];
                    this.location = res.data.data.params['基本信息']['车辆所在地'];
                    this.attribution = res.data.data.params['基本信息']['车辆归属地'];

                    // 相关图片
                    if(res.data.data.images['外观照片']){
                        for(let i=0;i<res.data.data.images['外观照片'].length;i++){
                            this.waiguan.push({
                                localIds: res.data.data.images['外观照片'][i].file_url,
                                fid: res.data.data.images['外观照片'][i].fid
                            })
                        };
                    }
                    if(res.data.data.images['内饰照片']){
                        for(let i=0;i<res.data.data.images['内饰照片'].length;i++){
                            this.neishi.push({
                                localIds: res.data.data.images['内饰照片'][i].file_url,
                                fid: res.data.data.images['内饰照片'][i].fid
                            })
                        };
                    }
                    // 价格说明
                    this.gerenjia = res.data.data.params['价格说明']['个人零售价'];
                    this.cheshangjia = res.data.data.params['价格说明']['车商批发价'];
                    this.transfer = res.data.data.params['价格说明']['含过户费'];

                    // 车辆标签
                    this.carLabelArr = res.data.data.params['车辆标签']['车辆标签'].split(',');
                    
                    // 车辆描述
                    let mDesc = res.data.data.params['车辆描述']['车辆描述'].split(',');
                    this.descCont = mDesc.pop().substring(0);
                    this.descArr = mDesc;
                    
                    
                    
                    // 联系方式
                    this.phone = res.data.data.params['联系方式']['联系电话'];
                }else{
                    this.$toast(res.data.msg);
                };
                this.$toast.clear();
            })
            .catch( err => {
                console.log(err);
                this.$toast.clear();
            })
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
                        'getLocalImgData',
                        'uploadImage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
            })
        },
        tabClick(i){
            i == 0 ? this.showWaiguan = true : this.showWaiguan = false
            this.tabIndex = i ;
        },
        labelClick(i){
            if(this.carLabelArr.includes(i)){
                this.carLabelArr.splice(this.carLabelArr.indexOf(i), 1);
            }else{
                if(this.carLabelArr.length>=2){
                    this.$toast('最多可选两项');
                }else{
                    this.carLabelArr.push(i);
                }
            }
        },
        descClick(i){
            if(this.descArr.includes(i)){
                this.descArr.splice(this.descArr.indexOf(i), 1);
            }else{
                this.descArr.push(i);
            }
        },

        openPop(param){
            this.showPop = true;
            this.pickType = param;
            switch (param) {
                case 'carType':
                    this.popTitle = '车辆信息';
                    // this.columns = ['新车', '二手车'];
                    this.columns = ['轿车', '皮卡', '跑车', 'SUV', 'MPV','其它'];
                    break;
                case 'carColor':
                    this.popTitle = '车身颜色';
                    this.columns = ['黑色', '白色' ,'灰色', '银灰色' ,'香槟色', '黄色' ,'橙色', '红色' ,'紫色', '蓝色' ,'绿色', '咖啡色' ,'多彩色', '其它'];
                    break;  
                case 'gearbox': 
                    this.popTitle = '变速箱';
                    this.columns = ['手动', '自动'];
                    break;  
                case 'emission': 
                    this.popTitle = '排放标准';
                    this.columns = ['国Ⅳ', '国Ⅴ', '国Ⅵ'];
                    break;  
                case 'use': 
                    this.popTitle = '使用性质';
                    this.columns = ['营运', '非营运', '营转非', '租赁营运', '租赁非营运'];
                    break; 
                case 'transfer': 
                    this.popTitle = '含过户费';
                    this.columns = ['是', '否'];
                    break; 
                default:
                    break;
            }
            
            
        },
        onConfirm(value, index) {
            const that = this;
            const confirm = new Map([
                ['carType', () => that.carType = value],
                ['carColor', () => that.carColor = value],
                ['gearbox', () => that.gearbox = value],
                ['emission', () => that.emission = value],
                ['use', () => that.use = value],
                ['transfer', () => that.transfer = value]
            ])
            confirm.get(this.pickType)&&confirm.get(this.pickType)();
            this.showPop = false;
        },

        onCancel() {
            this.showPop = false;
        },

        // 日期选择器
        openDatePicker(param){
            this.showDatePicker = true;
            this.dateType = param;

        },
        dateConfirm(value){
            this.showDatePicker = false;
            switch (this.dateType) {
                case 'firstCard':
                    this.firstCard = `${new Date(value).getFullYear()}年${new Date(value).getMonth()+1}月`;
                    break;
                case 'leaveFactory':
                    this.leaveFactory = `${new Date(value).getFullYear()}年${new Date(value).getMonth()+1}月`;
                    break;
                case 'nianjian':
                    this.nianjian = `${new Date(value).getFullYear()}年${new Date(value).getMonth()+1}月`;
                    break;
                default:
                    break;
            }
        },
        dateCancel(){
            this.showDatePicker = false;
        },
        formatter(type, val) {
        if (type === 'year') {
            return `${val}年`;
        } else if (type === 'month') {
            return `${val}月`;
        }
            return val;
        },

        // 地址选择器
        openArea(param){
            this.showAddr = true;
            this.areaType = param;
            switch (this.areaType) {
                case 'location':
                    this.areaTitle = '车辆所在地';
                    break;
                case 'attribution':
                    this.areaTitle = '车辆归属地';
                    break;
                default:
                    break;
            }
        },
        areaConfirm(value){
            this.showAddr = false;
            switch (this.areaType) {
                case 'location':
                    this.location = `${value[1].name}`;
                    break;
                case 'attribution':
                    this.attribution = `${value[1].name}`;
                    break;
                default:
                    break;
            }
        },
        areaCancel(){
            this.showAddr = false;
        },

        // 选择拍照类型
        openType(){
            this.imgType = 'vin';
            this.showType = true;
        },
        jiashizheng(){
            this.saomiaoType = 'jsz';
            this.showType = false;
            this.showImg = true;
        },
        vinma(){
            this.saomiaoType = 'vin';
            this.showType = false;
            this.showImg = true;
        },
        typeCancel(){
            this.showType = false;
        },

        // 上传图片
        addImg(type){
            this.imgType = type;
            this.showImg = true;
        },
        // 拍照
        camera(){
            const that = this;
            that.showImg = false;
            wx.getLocalImgData({
                count: that.imgType == 'vin' ? 1 : 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    if(that.imgType == 'vin'){
                        wx.uploadImage({
                            localId: res.localIds.toString(),
                            isShowProgressTips: 1,
                            success: function (uploadRes) {
                                that.$toast.loading({
                                    message: '识别中...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                    duration: 0
                                });
                                that.$http({
                                    method: 'post',
                                    url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                    data: that.qs.stringify({
                                        openid: localStorage.openid,
                                        file_desc: '识别vin码',
                                        server_id: uploadRes.serverId
                                    })
                                })
                                .then( saveRes => {
                                    if(saveRes.data.code == 0){
                                        if(that.saomiaoType == 'jsz'){
                                            that.$http({
                                                method: 'post',
                                                url: '/api/car_dealer_index.php?s=/Home/TcOcr/VehicleLicenseOcr',
                                                data: that.qs.stringify({
                                                    openid: localStorage.openid,
                                                    fid: saveRes.data.data.fid
                                                })
                                            })
                                            .then( vinRes => {
                                                if(vinRes.data.code==0){
                                                    that.vinCode = vinRes.data.data.Vin;
                                                    that.chexi = vinRes.data.data.Model;
                                                    that.firstCard = new Date(vinRes.data.data.RegisterDate).getFullYear()+'年'+(new Date(vinRes.data.data.RegisterDate).getMonth()+1)+'月';
                                                    that.use = vinRes.data.data.UseCharacter;
                                                    that.$toast(vinRes.data.msg);
                                                }else{
                                                    that.$toast(vinRes.data.msg);
                                                };
                                                setTimeout(() => {
                                                    that.$toast.clear();
                                                }, 2000);
                                            })
                                            .catch( err => {
                                                that.$toast.clear();
                                            })
                                        }else if(that.saomiaoType == 'vin'){
                                            that.$http({
                                                method: 'post',
                                                url: '/api/car_dealer_index.php?s=/Home/TcOcr/VinOcr',
                                                data: that.qs.stringify({
                                                    openid: localStorage.openid,
                                                    fid: saveRes.data.data.fid
                                                })
                                            })
                                            .then( vinRes => {
                                                if(vinRes.data.code==0){
                                                    that.vinCode = vinRes.data.data;
                                                    that.$toast(vinRes.data.msg);
                                                }else{
                                                    that.$toast(vinRes.data.msg);
                                                };
                                                setTimeout(() => {
                                                    that.$toast.clear();
                                                }, 2000);
                                            })
                                            .catch( err => {
                                                that.$toast.clear();
                                            })
                                        }
                                    }else{
                                        that.$toast(saveRes.data.msg);
                                        that.$toast.clear();
                                    }
                                })
                                .catch( err => {
                                    that.$toast.clear();
                                })
                            }
                        })
                    }else{
                        for(let i = 0;i<res.localIds.length;i++){
                            wx.uploadImage({
                                localId: res.localIds[i].toString(),
                                isShowProgressTips: 1,
                                success: function (uploadRes) {
                                    if(that.imgType == 'waiguan'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                file_desc: '外观照片',
                                                server_id: uploadRes.serverId
                                            })
                                        })
                                        .then( saveRes => {
                                            if(saveRes.data.code == 0){
                                                that.waiguan.push({
                                                    localIds: res.localIds[i],
                                                    fid: saveRes.data.data.fid
                                                });
                                            }else{
                                                that.$toast(saveRes.data.msg);
                                            }
                                        })
                                    }else if(that.imgType == 'neishi'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                file_desc: '内饰照片',
                                                server_id: uploadRes.serverId
                                            })
                                        })
                                        .then( saveRes => {
                                            if(saveRes.data.code == 0){
                                                that.neishi.push({
                                                    localIds: res.localIds[i],
                                                    fid: saveRes.data.data.fid
                                                });
                                            }else{
                                                that.$toast(saveRes.data.msg);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            });
        },
        // 相册选择
        imgCancel(){
            this.showImg = false;
        },
        album(){
            const that = this;
            that.showImg = false;
            wx.getLocalImgData({
                count: that.imgType == 'vin' ? 1 : 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    if(that.imgType == 'vin'){
                        wx.uploadImage({
                            localId: res.localIds.toString(),
                            isShowProgressTips: 1,
                            success: function (uploadRes) {
                                    that.$toast.loading({
                                        message: '识别中...',
                                        forbidClick: true,
                                        loadingType: 'spinner',
                                        duration: 0
                                    });
                                    that.$http({
                                        method: 'post',
                                        url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                        data: that.qs.stringify({
                                            openid: localStorage.openid,
                                            file_desc: '识别vin码',
                                            server_id: uploadRes.serverId
                                        })
                                    })
                                    .then( saveRes => {
                                        if(saveRes.data.code == 0){
                                            if(that.saomiaoType == 'jsz'){
                                                that.$http({
                                                    method: 'post',
                                                    url: '/api/car_dealer_index.php?s=/Home/TcOcr/VehicleLicenseOcr',
                                                    data: that.qs.stringify({
                                                        openid: localStorage.openid,
                                                        fid: saveRes.data.data.fid
                                                    })
                                                })
                                                .then( vinRes => {
                                                    if(vinRes.data.code==0){
                                                        that.vinCode = vinRes.data.data.Vin;
                                                        that.chexi = vinRes.data.data.Model;
                                                        that.firstCard = new Date(vinRes.data.data.RegisterDate).getFullYear()+'年'+(new Date(vinRes.data.data.RegisterDate).getMonth()+1)+'月';
                                                        that.use = vinRes.data.data.UseCharacter;
                                                        that.$toast(vinRes.data.msg);
                                                    }else{
                                                        that.$toast(vinRes.data.msg);
                                                    };
                                                    setTimeout(() => {
                                                        that.$toast.clear();
                                                    }, 2000);
                                                })
                                                .catch( err => {
                                                    that.$toast.clear();
                                                })
                                            }else if(that.saomiaoType == 'vin'){
                                                that.$http({
                                                    method: 'post',
                                                    url: '/api/car_dealer_index.php?s=/Home/TcOcr/VinOcr',
                                                    data: that.qs.stringify({
                                                        openid: localStorage.openid,
                                                        fid: saveRes.data.data.fid
                                                    })
                                                })
                                                .then( vinRes => {
                                                    if(vinRes.data.code==0){
                                                        that.vinCode = vinRes.data.data;
                                                        that.$toast(vinRes.data.msg);
                                                    }else{
                                                        that.$toast(vinRes.data.msg);
                                                    };
                                                    setTimeout(() => {
                                                        that.$toast.clear();
                                                    }, 2000);
                                                })
                                                .catch( err => {
                                                    that.$toast.clear();
                                                })
                                            }
                                            
                                        }else{
                                            that.$toast(saveRes.data.msg);
                                            that.$toast.clear();
                                        }
                                    })
                                    .catch( err => {
                                        that.$toast.clear();
                                    })
                                }
                            })
                    }else{
                        for(let i = 0;i<res.localIds.length;i++){
                            wx.uploadImage({
                                localId: res.localIds[i].toString(),
                                isShowProgressTips: 1,
                                success: function (uploadRes) {
                                    if(that.imgType == 'waiguan'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                file_desc: '外观照片',
                                                server_id: uploadRes.serverId
                                            })
                                        })
                                        .then( saveRes => {
                                            if(saveRes.data.code == 0){
                                                that.waiguan.push({
                                                    localIds: res.localIds[i],
                                                    fid: saveRes.data.data.fid
                                                });
                                            }else{
                                                that.$toast(saveRes.data.msg);
                                            }
                                        })
                                    }else if(that.imgType == 'neishi'){
                                        that.$http({
                                            method: 'post',
                                            url: '/api/car_dealer_index.php?s=/Home/File/saveWxImage',
                                            data: that.qs.stringify({
                                                openid: localStorage.openid,
                                                file_desc: '内饰照片',
                                                server_id: uploadRes.serverId
                                            })
                                        })
                                        .then( saveRes => {
                                            if(saveRes.data.code == 0){
                                                that.neishi.push({
                                                    localIds: res.localIds[i],
                                                    fid: saveRes.data.data.fid
                                                });
                                            }else{
                                                that.$toast(saveRes.data.msg);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            });
        },
        // 图片预览
        imgPreview(url){
            ImagePreview([url]);
        },
        // 删除外观图片
        deleteImgW(url){
            this.$dialog.confirm({
                title: '删除确认',
                message: '确定删除这张照片吗？'
            })
            .then( () => {
                this.waiguan.splice(this.waiguan.indexOf(url),1);
            })
            .catch( () => {
                // 
            })
        },
        // 删除内饰图片
        deleteImgN(url){
            this.$dialog.confirm({
                title: '删除确认',
                message: '确定删除这张照片吗？'
            })
            .then( () => {
                this.neishi.splice(this.neishi.indexOf(url),1);
            })
            .catch( () => {
                // 
            })
        },

        // 立即提交
        submit(){
            // 上传的图片
            let fids = [];
            for(let i=0;i<this.waiguan.length;i++){
                fids.push(this.waiguan[i].fid)
            }
            for(let i=0;i<this.neishi.length;i++){
                fids.push(this.neishi[i].fid)
            }
            if(this.carType.length==0){
                this.$toast('请选择车辆类型');
            }else if(this.vinCode.length==0){
                this.$toast('请填写VIN码');
            }else if(this.chexi.length==0){
                this.$toast('请填写品牌车系');
            }else if(this.chexing.length==0){
                this.$toast('请填写具体车型');
            }else if(this.licheng.length==0){
                this.$toast('请填写表显里程');
            }else if(this.firstCard.length==0){
                this.$toast('请选择初次上牌时间');
            }else if(this.carColor.length==0){
                this.$toast('请选择车身颜色');
            }else if(this.gearbox.length==0){
                this.$toast('请选择变速箱类型');
            }else if(this.pailiang.length==0){
                this.$toast('请填写排量');
            }else if(this.emission.length==0){
                this.$toast('请选择排放标准');
            }else if(this.hezhun.length==0){
                this.$toast('请填写核准人数');
            }else if(this.use.length==0){
                this.$toast('请选择使用性质');
            }else if(this.leaveFactory.length==0){
                this.$toast('请选择出厂日期');
            }else if(this.nianjian.length==0){
                this.$toast('请选择年检到期日');
            }else if(this.location.length==0){
                this.$toast('请选择车辆所在地');
            }else if(this.attribution.length==0){
                this.$toast('请选择车辆归属地');
            }else if(this.waiguan.length==0){
                this.$toast('请上传外观照片');
            }else if(this.neishi.length == 0){
                this.$toast('请上传内饰照片');
            }else if(this.gerenjia.length==0){
                this.$toast('请填写个人零售价');
            }else if(this.cheshangjia.length==0){
                this.$toast('请填写车上批发价');
            }else if(this.transfer.length==0){
                this.$toast('请选择是否含过户费');
            }else if(this.carLabelArr.length==0){
                this.$toast('请选择车辆标签');
            }else if(this.descArr.length == 0 && this.descCont.length == 0){
                this.$toast('请选择车辆描述');
            }else if(this.phone.length==0){
                this.$toast('请填写联系电话');
            }else{
                
                this.$toast.loading({
                    message: '发布中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration: 0,
                });
                let params = {
                            "基本信息": {
                                "车辆类型": this.carType,
                                "VIN码": this.vinCode,
                                "品牌车系": this.chexi,
                                "具体车型": this.chexing,
                                "表显里程": this.licheng,
                                "初次上牌": this.firstCard.substr(0,5),
                                "车身颜色": this.carColor,
                                "变速箱": this.gearbox,
                                "排量": this.pailiang,
                                "排放标准": this.emission,
                                "核准人数": this.hezhun,
                                "使用性质": this.use,
                                "出厂日期": this.leaveFactory,
                                "年检到期日": this.nianjian,
                                "车辆所在地": this.location,
                                "车辆归属地": this.attribution
                            },
                            "价格说明":{
                                "个人零售价": this.gerenjia,
                                "车商批发价": this.cheshangjia,
                                "含过户费": this.transfer
                            },
                            "车辆标签":{
                                "车辆标签": this.carLabelArr.toString()
                            },
                            "车辆描述": {
                                "车辆描述": this.descArr.toString() == '' ? (this.descCont) : (this.descArr.toString() + ',' + this.descCont)
                            },
                            "联系方式": {
                                "联系电话": this.phone
                            }
                        }
                params = encodeURI(JSON.stringify(params));
                this.$http({
                    method: 'post',
                    url: '/api/car_dealer_index.php?s=/Home/Sale/edit',
                    data: this.qs.stringify({
                        openid: localStorage.openid,
                        vehicle_id: this.$route.query.id,
                        fids: fids.toString(),
                        params: params
                    })
                })
                .then( res => {
                    if(res.data.code == 0){
                        this.$toast.clear();
                        this.$router.push('/editsuccess');
                    }else{
                        
                        this.$toast(res.data.msg);
                        this.$toast.clear();
                    }
                })
                .catch( err => {
                    this.$toast.clear();
                })
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .release{
        margin: 0 !important;
        background-color: #f8f8f8 !important;
        .head{
            padding: 40px;
            align-items: center;
            justify-content: space-between;
            p{
                font-size: 32px;
            }
            div{
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    font-size: 28px;
                    margin-left: 24px;
                }
            }
        }
        .border{
            height: 16px;
            background-color: #f8f8f8;
        }
        .list{
            div.title{
                font-size: 32px;
                padding: 40px;
                display: flex;
                background-color: #f8f8f8;
                p{
                    font-weight: 400;
                }
            }
            .tab-bar{
                padding: 40px 40px 16px;
                background-color: #fff;
                .tab-item{
                    float: left;
                    font-size: 28px;
                    margin-right: 60px;
                    position: relative;
                }
                .tab-active{
                    font-weight: 999;
                    color: #716dff;
                }
                .tab-active::after{
                    position: absolute;
                    content: '';
                    width: 48px;
                    height: 2PX;
                    background-color: #716dff;
                    left: 50%;
                    margin-left: -24px;
                    bottom: -16px;
                }

            }
            .img-cont{
                padding: 0 40px 40px;
                background-color: #fff;
                .img-list{
                    width: calc(100% + 24px);
                    display: flex;
                    flex-wrap: wrap;
                    .img-item{
                        margin-top: 40px;
                        flex: 0 0 calc(33.33% - 24px);
                        height: 208px;
                        margin-right: 24px;
                        position: relative;
                        .delete{
                            position: absolute;
                            top: 0;
                            right: 0;
                            img{
                                width: 56px;
                                height: 56px;
                            }
                        }
                        .add-img{
                            border-radius: 8px;
                            background-color: #f8f8f8;
                            text-align: center;
                            height: 100%;
                            line-height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img{
                                width: 40px !important;
                                height: 40px !important;
                            }
                        }
                    }
                    
                }
                
            }
            .item{
                height: 108px;
                align-items: center;
                justify-content: space-between;
                background-color: #fff;
                border-bottom: 1PX solid #ddd;
                padding: 0 40px;
                font-size: 28px;
                div{
                    align-items: center;
                    justify-content: space-between;
                    img{
                        width: 14px;
                        height: 24px;
                        margin-left: 24px;
                    }
                }
                div.input{
                    flex: 1;
                    margin-left: 50px;
                    line-height: 80px;
                    input{
                        text-align: right;
                        border: none;
                        width: 100%;
                        flex: 1;
                    }
                    input::-webkit-input-placeholder {  	/* WebKit browsers */
                        color: #999;
                    }
                    p{
                        margin-left: 10px;
                    }
                }
            }
            .item:last-child{
                border: none;
            }
            .car-label{
                padding: 0 40px 40px;
                background-color: #fff;
                .label-item{
                    float: left;
                    margin-top: 40px;
                    margin-right: 30px;
                    line-height: 72px;
                    padding: 0 20px;
                    border: 1PX solid #ddd;
                    border-radius: 8px;
                    color: #666;
                    font-size: 28px;
                }
                .active{
                    color: #716dff;
                    border-color: #716dff;
                    font-weight: 999;
                }
            }
            .car-desc{
                padding: 0 40px;
                background-color: #fff;
                .quick{
                    float: left;
                    margin-top: 40px;
                    margin-right: 20px;
                    line-height: 72px;
                    color: #666;
                    font-size: 28px;
                }
                .desc-item{
                    float: left;
                    margin-top: 40px;
                    margin-right: 20px;
                    line-height: 72px;
                    padding: 0 20px;
                    border: 1PX solid #ddd;
                    border-radius: 8px;
                    color: #999;
                    font-size: 28px;
                }
                .active{
                    color: #716dff;
                    border-color: #716dff;
                }
            }
            .desc-cont{
                padding: 60px 40px;
                background-color: #fff;
                font-size: 28px;

                p{
                    color: #999;
                }
                p.p{
                    color: #333;
                    float: left;
                    margin-bottom: 30px;
                }
                textarea{
                    width: calc(100% - 40px);
                    margin-top: 20px;
                    padding: 20px;
                    resize: none;
                    border-color: #ccc;
                }
            }
        }
        .submit{
            background-color: #fff;
            padding: 80px 40px;
            p{
                line-height: 98px;
                text-align: center;
                color: #fff;
                font-size: 28px;
                background-color: #716dff;
                border-radius: 8px;
            }
        }
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
</style>
