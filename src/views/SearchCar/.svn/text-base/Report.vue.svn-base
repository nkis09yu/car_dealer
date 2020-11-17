<template>
    <div>
        <!-- 基本信息 -->
        <div class="cont basic-info">
            <div class="flex b-top">
                <img src="../../assets/images/searchcar/logo.png" alt="">
                <div class="b1">
                    <div class="bold">
                        <p>{{detectData.brandName}}</p>
                        <!-- <p class="dengji">等级：{{carLevel(detectData.carLevel)}}</p> -->
                    </div>
                    <p>{{detectData.vin}}</p>
                    <P>{{formatDate(detectData.makeReportDate)}}</P>
                </div>
            </div>
            <div class="flex b-bot">
                <div>
                    <p class="bold fontSize-32">{{detectData.mileageEstimate}}km</p>
                    <p class="color-999 fontSize-28">最大行驶里程</p>
                </div>
                <div>
                    <p class="bold fontSize-32">{{detectData.carAge}}年</p>
                    <p class="color-999 fontSize-28">车龄</p>
                </div>
                <div>
                    <p class="bold fontSize-32">{{detectData.lastMainTime}}</p>
                    <p class="color-999 fontSize-28">最后入店时间</p>
                </div>
            </div>
        </div>
        <div class="border16"></div>
        <!-- 评估等级 -->
        <div class="cont pinggu">
            <div class="bold fontSize-32">评估等级</div>
            <div class="pg">
                <div class="bold zm">{{carZimu(detectData.carLevel)}}</div>
                <img v-if="detectData.carLevel == 1" src="../../assets/images/searchcar/a.png" alt="">
                <img v-if="detectData.carLevel == 2" src="../../assets/images/searchcar/b.png" alt="">
                <img v-if="detectData.carLevel == 3" src="../../assets/images/searchcar/c.png" alt="">
                <img v-if="detectData.carLevel == 4" src="../../assets/images/searchcar/d.png" alt="">
                <img v-if="detectData.carLevel == 5" src="../../assets/images/searchcar/e.png" alt="">
                <div class="bold wz">- {{carLevel(detectData.carLevel)}} -</div>
            </div>
            <div class="huafen">
                <div class="flex hf">
                    <p class="p1">等级划分：A、B、C、D、E</p>
                    <div @click="xxsm">
                        <p>详细说明</p>
                        <img v-if="!showShuoming" src="../../assets/images/searchcar/xia.png" alt="">
                        <img v-if="showShuoming" src="../../assets/images/searchcar/shang.png" alt="">
                    </div>
                </div>
                <div v-if="showShuoming" class="pgsm">
                    <p>A：准新车，全车无修复痕迹，车龄≤1年，最大里程≤1万公里</p>
                    <p>B：精品车，重要部件无记录，结构部件无记录，外观覆盖件未进行过钣金、拆装类维修，车龄≤5年，最大里程≤6万公里</p>
                    <p>C：中等车，允许结构部件/重要部件(发动机、底盘、安全气囊、变速箱)喷漆、轻微剐蹭，允许最大里程＞6万公里，车龄＞5年</p>
                    <p>D：事故车，允许结构部件更换、钣金、切割、修复，最大里程＞6万公里，车龄＞5年</p>
                    <p>E：报废车，允许火烧、泡水，最大里程≥60万公里，车龄≥15年</p>
                </div>
            </div>
        </div>
        <div class="border16"></div>
        <!-- 维保概况 -->
        <div class="cont survey">
            <div class="bold fontSize-32">维保概况</div>
            <div class="flex f1">
                <div @click="openPop(4,1)" class="fd">
                    <div v-if="detectData.state.waterState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/paoshui.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.waterState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/paoshui-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>泡水排查</p>
                </div>
                <div @click="openPop(4,2)" class="fd">
                    <div v-if="detectData.state.fireState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/huoshao.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.fireState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/huoshao-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>火烧排查</p>
                </div>
                <div @click="openPop(4,3)" class="fd">
                    <div v-if="detectData.state.recallState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/zhaohui.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.recallState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/zhaohui-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>召回排查</p>
                </div>
                <div @click="openPop(4,4)" class="fd">
                    <div v-if="detectData.state.scrappedState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/baofei.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.scrappedState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/baofei-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>报废排查</p>
                </div>
            </div>
            <div v-show="showPop4" class="pop">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in weibao" :key="index">
                        <div class="flex item-f">
                            <p class="ddat">日期</p>
                            <div>{{item.date}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">异常</p>
                            <div>{{item.abnormalWord}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">位置</p>
                            <div class="red">{{item.positionName}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!weibao.length">通过排查，未查到异常记录</div>
            </div>
            <div class="flex f2">
                <div @click="openPop(5,1)" class="fd">
                    <div v-if="detectData.state.importantState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/zhongyao.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.importantState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/zhongyao-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>重要部件</p>
                </div>
                <div @click="openPop(5,2)" class="fd">
                    <div v-if="detectData.state.exteriorState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/waiguan.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.exteriorState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/waiguan-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>外观覆盖件</p>
                </div>
                <div @click="openPop(5,3)" class="fd">
                    <div v-if="detectData.state.bodyPartState" class="wu">
                        <img class="img1" src="../../assets/images/searchcar/cheshen.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <div v-if="!detectData.state.bodyPartState" class="you">
                        <img class="img1" src="../../assets/images/searchcar/cheshen-h.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/youwenti.png" alt="">
                    </div>
                    <p>车身部件</p>
                </div>
                <div @click="openPop(6,4)" class="fd">
                    <div class="wu">
                        <img class="img1" src="../../assets/images/searchcar/licheng.png" alt="">
                        <img class="img2" src="../../assets/images/searchcar/wuwenti.png" alt="">
                    </div>
                    <p>里程记录</p>
                </div>
            </div>
            <div v-show="showPop5" class="pop">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in weibao" :key="index">
                        <div class="flex item-f">
                            <p class="ddat">日期</p>
                            <div>{{item.date}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">异常</p>
                            <div>{{item.abnormalWord}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">位置</p>
                            <div class="red">{{item.positionName}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!weibao.length">通过排查，未查到异常记录</div>
            </div>
            <div v-show="showPop6" class="mile-record">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <div class="top">
                    <div>
                        <p class="p1">{{detectData.mileageEveryYear}}km</p>
                        <p class="p2">年均行驶里程</p>
                    </div>
                    <div>
                        <p class="p1">{{mileageErr}}</p>
                        <p class="p2">异常历程记录</p>
                    </div>
                </div>
                <div class="mile-list">
                    <div class="mile-item" v-for="(item, index) in mileageData" :key="index">
                        <p :class="item.status == 0 ? 'red' : ''">{{item.date}}</p>
                        <p :class="item.status == 0 ? 'red' : ''">{{item.mileage}}km</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 关键部件 -->
        <div class="cont survey">
            <div class="bold fontSize-32">关键部件</div>
            <div class="flex f1">
                <div @click="openPop(1,1)" class="fd">
                    <div v-if="!this.fadongji.length" class="wu">
                        <img src="../../assets/images/searchcar/fadongji.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.fadongji.length" class="you">
                        <img src="../../assets/images/searchcar/fadongji-h.png" alt="">
                        <p>{{this.fadongji.length}}</p>
                    </div>
                    <p>发动机</p>
                </div>
                <div @click="openPop(1,2)" class="fd">
                    <div v-if="!this.qinang.length" class="wu">
                        <img src="../../assets/images/searchcar/qinang.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.qinang.length" class="you">
                        <img src="../../assets/images/searchcar/qinang-h.png" alt="">
                        <p>{{this.qinang.length}}</p>
                    </div>
                    <p>安全气囊</p>
                </div>
                <div @click="openPop(1,3)" class="fd">
                    <div v-if="!this.biansuxiang.length" class="wu">
                        <img src="../../assets/images/searchcar/biansuxiang.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.biansuxiang.length" class="you">
                        <img src="../../assets/images/searchcar/biansuxiang-h.png" alt="">
                        <p>{{this.biansuxiang.length}}</p>
                    </div>
                    <p>变速箱</p>
                </div>
                <div @click="openPop(1,4)" class="fd">
                    <div v-if="!this.dipan.length" class="wu">
                        <img src="../../assets/images/searchcar/dipan.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.dipan.length" class="you">
                        <img src="../../assets/images/searchcar/dipan-h.png" alt="">
                        <p>{{this.dipan.length}}</p>
                    </div>
                    <p>底盘</p>
                </div>
            </div>
            <div v-show="showPop1" class="pop">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <div class="guanjianzi-list">
                    <div class="guanjianzi-item" v-for="(item, index) in guanjianzi" :key="index">{{item.positionName}}</div>
                </div>
                <div class="list guanjian">
                    <div class="item" v-for="item in guanjian" :key="item.id">
                        <div class="top">
                            <p class="ddat">4S店</p>
                            <p class="date">{{item.date}}</p>
                            <p class="licheng">{{item.mileage}}km</p>
                            <p class="type">{{item.type}}</p>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">项目</p>
                            <div v-html="keywordscolorful(item.content,item.keyName)"></div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">材料</p>
                            <div v-html="keywordscolorful(item.material,item.keyName)"></div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">其他</p>
                            <div>{{item.other}}</div>
                        </div>
                    </div>
                </div>


                <div v-show="!guanjian.length">
                    通过排查，未查到相关记录
                </div>
            </div>
            <div class="flex f2">
                <div @click="openPop(2,1)" class="fd">
                    <div v-if="!this.baoxiangang.length" class="wu">
                        <img src="../../assets/images/searchcar/baoxiangang.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.baoxiangang.length" class="you">
                        <img src="../../assets/images/searchcar/baoxiangang-h.png" alt="">
                        <p>{{this.baoxiangang.length}}</p>
                    </div>
                    <p>保险杠</p>
                </div>
                <div @click="openPop(2,2)" class="fd">
                    <div v-if="!this.yiziban.length" class="wu">
                        <img src="../../assets/images/searchcar/yiziban.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.yiziban.length" class="you">
                        <img src="../../assets/images/searchcar/yiziban-h.png" alt="">
                        <p>{{this.yiziban.length}}</p>
                    </div>
                    <p>翼子板</p>
                </div>
                <div @click="openPop(2,3)" class="fd">
                    <div v-if="!this.chemen.length" class="wu">
                        <img src="../../assets/images/searchcar/chemen.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.chemen.length" class="you">
                        <img src="../../assets/images/searchcar/chemen-h.png" alt="">
                        <p>{{this.chemen.length}}</p>
                    </div>
                    <p>车门</p>
                </div>
                <div @click="openPop(2,4)" class="fd">
                    <div v-if="!this.jigai.length" class="wu">
                        <img src="../../assets/images/searchcar/jigai.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.jigai.length" class="you">
                        <img src="../../assets/images/searchcar/jigai-h.png" alt="">
                        <p>{{this.jigai.length}}</p>
                    </div>
                    <p>机盖</p>
                </div>
            </div>
            <div v-show="showPop2" class="pop">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <div class="guanjianzi-list">
                    <div class="guanjianzi-item" v-for="(item, index) in guanjianzi" :key="index">{{item.positionName}}</div>
                </div>
                <div class="list guanjian">
                    <div class="item" v-for="item in guanjian" :key="item.id">
                        <div class="top">
                            <p class="ddat">4S店</p>
                            <p class="date">{{item.date}}</p>
                            <p class="licheng">{{item.mileage}}km</p>
                            <p class="type">{{item.type}}</p>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">项目</p>
                            <div v-html="keywordscolorful(item.content,item.keyName)"></div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">材料</p>
                            <div v-html="keywordscolorful(item.material,item.keyName)"></div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">其他</p>
                            <div>{{item.other}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!guanjian.length">
                    通过排查，未查到相关记录
                </div>
            </div>
            <div class="flex f2">
                <div @click="openPop(3,1)" class="fd">
                    <div v-if="!this.cheding.length" class="wu">
                        <img src="../../assets/images/searchcar/cheding.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.cheding.length" class="you">
                        <img src="../../assets/images/searchcar/cheding-h.png" alt="">
                        <p>{{this.cheding.length}}</p>
                    </div>
                    <p>车顶</p>
                </div>
                <div @click="openPop(3,2)" class="fd">
                    <div v-if="!this.kongtiao.length" class="wu">
                        <img src="../../assets/images/searchcar/kongtiao.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.kongtiao.length" class="you">
                        <img src="../../assets/images/searchcar/kongtiao-h.png" alt="">
                        <p>{{this.kongtiao.length}}</p>
                    </div>
                    <p>空调</p>
                </div>
                <div @click="openPop(3,3)" class="fd">  
                    <div v-if="!this.qita.length" class="wu">
                        <img src="../../assets/images/searchcar/qita.png" alt="">
                        <p>0</p>
                    </div>
                    <div v-if="this.qita.length" class="you">
                        <img src="../../assets/images/searchcar/qita-h.png" alt="">
                        <p>{{this.qita.length}}</p>
                    </div>
                    <p>其他</p>
                </div>
            </div>
            <div v-show="showPop3" class="pop">
                <div :class="pleft" class="jiantou">
                    <img src="../../assets/images/searchcar/jiantou.png" alt="">
                </div>
                <!-- <div class="guanjianzi-list">
                    <div class="guanjianzi-item" v-for="(item, index) in guanjianzi" :key="index">{{item.positionName}}</div>
                </div> -->
                <div class="list guanjian">
                    <div class="item" v-for="item in guanjian" :key="item.id">
                        <div class="top">
                            <p class="ddat">4S店</p>
                            <p class="date">{{item.date}}</p>
                            <p class="licheng">{{item.mileage}}km</p>
                            <p class="type">{{item.type}}</p>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">项目</p>
                            <div>{{item.content}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">材料</p>
                            <div>{{item.material}}</div>
                        </div>
                        <div class="flex item-f">
                            <p class="ddat">其他</p>
                            <div>{{item.other}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!guanjian.length">
                    通过排查，未查到相关记录
                </div>
            </div>
        </div>
        <div class="border16"></div>
        <!-- 维保详情 -->
        <div class="cont detail">
            <div class="title bold fontSize-32">维保详情</div>
            <div class="list">
                <div class="item" v-for="item in normalRepairRecords" :key="item.id">
                    <div class="top">
                        <p class="ddat">4S店</p>
                        <p class="date">{{item.date}}</p>
                        <p class="licheng">{{item.mileage}}km</p>
                        <p class="type">{{item.type}}</p>
                    </div>
                    <div class="flex item-f">
                        <p class="ddat">项目</p>
                        <div>{{item.content}}</div>
                    </div>
                    <div class="flex item-f">
                        <p class="ddat">材料</p>
                        <div>{{item.material}}</div>
                    </div>
                    <div class="flex item-f">
                        <p class="ddat">其他</p>
                        <div>{{item.other}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border16"></div>
        <!-- 数据说明 -->
        <div class="cont shuoming">
            <p class="bold fontSize-32">数据说明</p>
            <div>
                本报告所包含数据仅基于查询日之前的相关信息，其他信息（包括但不限于在非4S店或制造商授权店的微信保养信息）可能存在未录入情况。本报告仅供参考，实际车况请结合是车勘验结果。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showShuoming: false,//苹果详细说明
            detectData: {
                state: {
                    waterState: 1,
                    fireState: 1,
                    recallState: 1,
                    scrappedState: 1,
                    importantState: 1,
                    exteriorState: 1,
                    bodyPartState: 1
                }
            },
            weibao: [],
            guanjian: [],//关键部件
            guanjianzi: [],//关键部件的关键字
            normalRepairRecords: {},//维保详情
            mileageData: {},//里程记录
            mileageErr: 0,
            pleft: '',
            pIndex: 1,
            showPop1: false,
            showPop2: false,
            showPop3: false,
            showPop4: false,
            showPop5: false,
            showPop6: false,
            // 关键部件
            fadongji: [],//发动机
            qinang: [],//安全气囊
            biansuxiang: [],//变速箱
            dipan: [],//底盘
            baoxiangang: [],//保险杠
            yiziban: [],//翼子板
            chemen: [],//车门
            jigai: [],//机盖
            cheding: [],//车顶
            kongtiao: [],//空调
            qita: [],//其他
            // 关键部件的关键字
            fadongjiKey: [],//发动机
            qinangKey: [],//安全气囊
            biansuxiangKey: [],//变速箱
            dipanKey: [],//底盘
            baoxiangangKey: [],//保险杠
            yizibanKey: [],//翼子板
            chemenKey: [],//车门
            jigaiKey: [],//机盖
            chedingKey: [],//车顶
            kongtiaKey: [],//空调
            qitaKey: [],//其他
        }
    },
    computed: {
        carLevel(){
            return function(level){
                switch (level) {
                    case 1:
                        return '准新车'
                        break;
                    case 2:
                        return '精品车'
                        break;
                    case 3:
                        return '中等车'
                        break;
                    case 4:
                        return '事故车'
                        break;
                    case 5:
                        return '报废车'
                        break;
                    default:
                        break;
                } 
            }
        },
        carZimu(){
            return function(level){
                switch (level) {
                    case 1:
                        return 'A'
                        break;
                    case 2:
                        return 'B'
                        break;
                    case 3:
                        return 'C'
                        break;
                    case 4:
                        return 'D'
                        break;
                    case 5:
                        return 'E'
                        break;
                    default:
                        break;
                } 
            }
        }
    },
    mounted(){
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        });
        this.init();
        
    },
    methods: {
        init(){
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/Search',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    report_id: this.$route.query.report_id
                })
            })
            .then( res => {
                this.detectData = res.data.data.detect_data;
                this.normalRepairRecords = res.data.data.detect_data.normalRepairRecords;// 维保详情
                this.mileageData = res.data.data.detect_data.mileage_data;//里程记录
                for(let i = 0; i< this.mileageData.length; i++){
                    if(this.mileageData[i].status == 0){
                        this.mileageErr ++;
                    }
                };

                // 发动机：重要部件1（发动机）

                // 安全气囊：重要部件7（气囊安全带）

                // 变速箱：重要部件4（变速箱）

                // 底盘：车身部件16（车身底板）、重要部件2（悬挂系统）、重要部件5（前/后桥）

                // 保险杠：外观覆盖13（后保险杠）、外观覆盖16（前保险杠）、外观覆盖22（保险杠）

                // 翼子板：外观覆盖2（右后翼子板）、外观覆盖5（右前翼子板）、外观覆盖7（左后翼子板）、外观覆盖10（左前翼子板）、外观覆盖20（翼子板）

                // 车门：外观覆盖3（右后门）、外观覆盖4（右前门）、外观覆盖8（左后门）、外观覆盖9（左前门）、外观覆盖12（后尾门）、外观覆盖21（车门）

                // 机盖：外观覆盖15（前机盖）

                // 车顶：外观覆盖11（车顶）

                // 空调：重要部件9（空调系统）

                // 其它：剩余

                // 重要部件
                let important = this.detectData.part_detail.important;
                // // 外观覆盖件
                let exterior = this.detectData.part_detail.exterior;
                // // 车身部件
                let bodyPart = this.detectData.part_detail.body_part;
                let normalRepairRecords = this.normalRepairRecords;

                this.fadongjiKey = this.guanjianFunc([1],important);//发动机id[1]属于重要部件important
                this.qinangKey = this.guanjianFunc([7],important);//安全气囊id[7]属于重要部件important
                this.biansuxiangKey = this.guanjianFunc([4],important);//变速箱id[4]属于重要部件important
                this.dipanKey = this.guanjianFunc([2,5],important);//底盘id[2,5]属于重要部件important
                this.baoxiangangKey = this.guanjianFunc([13,16,22],exterior);//保险杠id[13,16,22]属于外观覆盖件exterior
                this.yizibanKey = this.guanjianFunc([2,5,7,10,20],exterior);//翼子板id[2,5,7,10,20]属于外观覆盖件exterior
                this.chemenKey = this.guanjianFunc([3,4,8,9,12,21],exterior);//车门id[3,4,8,9,12,21]属于外观覆盖件exterior
                this.jigaiKey = this.guanjianFunc([15],exterior);//机盖id[15]属于外观覆盖件exterior
                this.chedingKey = this.guanjianFunc([11],exterior);//车顶id[11]属于外观覆盖件exterior
                this.kongtiaoKey = this.guanjianFunc([9],important);//空调id[9]属于重要部件important
                this.qitaKey = [...this.guanjianFunc([8],important),...this.guanjianFunc([0],exterior),...this.guanjianFunc([0],bodyPart)];//其他
                
                
                this.fadongji = this.weibaoFunc(this.guanjianFunc([1],important),normalRepairRecords);//发动机id[1]属于重要部件important
                this.qinang = this.weibaoFunc(this.guanjianFunc([7],important),normalRepairRecords);//安全气囊id[7]属于重要部件important
                this.biansuxiang = this.weibaoFunc(this.guanjianFunc([4],important),normalRepairRecords);//变速箱id[4]属于重要部件important
                this.dipan = this.weibaoFunc(this.guanjianFunc([2,5],important),normalRepairRecords);//底盘id[2,5]属于重要部件important
                this.baoxiangang = this.weibaoFunc(this.guanjianFunc([13,16,22],exterior),normalRepairRecords);//保险杠id[13,16,22]属于外观覆盖件exterior
                this.yiziban = this.weibaoFunc(this.guanjianFunc([2,5,7,10,20],exterior),normalRepairRecords);//翼子板id[2,5,7,10,20]属于外观覆盖件exterior
                this.chemen = this.weibaoFunc(this.guanjianFunc([3,4,8,9,12,21],exterior),normalRepairRecords);//车门id[3,4,8,9,12,21]属于外观覆盖件exterior
                this.jigai = this.weibaoFunc(this.guanjianFunc([15],exterior),normalRepairRecords);//机盖id[15]属于外观覆盖件exterior
                this.cheding = this.weibaoFunc(this.guanjianFunc([11],exterior),normalRepairRecords);//车顶id[11]属于外观覆盖件exterior
                this.kongtiao = this.weibaoFunc(this.guanjianFunc([9],important),normalRepairRecords);//空调id[9]属于重要部件important
                this.qita = this.weibaoFunc(this.qitaKey,normalRepairRecords);//其他
                this.$toast.clear();
            })
        },

        // 找出关键部件的集合
        guanjianFunc(idArr=[], partArr=[]){
            let newArr = [];
            for(let i=0;i<idArr.length;i++){
                for(let j=0;j<partArr.length;j++){
                    if(idArr[i] == partArr[j].positionId){
                        newArr.push(partArr[j])
                    }
                }
            };
            return newArr;
        },
        // 根据关键部件找出维保记录集合
        weibaoFunc(partArr=[],normalArr=[]){
            let newArr = [];
            let temp = {}; //存放id
            let result = []; //新数组
            for(let i=0;i<partArr.length;i++){
                for(let j=0;j<normalArr.length;j++){
                    if(partArr[i].id == normalArr[j].id){
                        newArr.push(normalArr[j])
                    }
                }
            };
            newArr.map((item, index) => {
                 if(!temp[item.id]){
                    result.push(item);
                    temp[item.id] = true;
                }
            });
            return result;
        },
        
        // 等级详细说明
        xxsm(){
            this.showShuoming = !this.showShuoming;
        },

        openPop(a,b){
            if(a == 1){
                [this.showPop2, this.showPop3, this.showPop4, this.showPop5, this.showPop6] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop1 = !this.showPop1 : this.showPop1 = true;
                if(b == 1){
                    this.guanjian =  this.fadongji;
                    this.guanjianzi =  this.fadongjiKey;
                }else if(b == 2){
                    this.guanjian =  this.qinang;
                    this.guanjianzi =  this.qinangKey;
                }else if(b == 3){
                    this.guanjian =  this.biansuxiang;
                    this.guanjianzi =  this.biansuxiangKey;
                }else if(b == 4){
                    this.guanjian =  this.dipan;
                    this.guanjianzi =  this.dipanKey;
                }
            }else if(a == 2){
                [this.showPop1, this.showPop3, this.showPop4, this.showPop5, this.showPop6] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop2 = !this.showPop2 : this.showPop2 = true;
                if(b == 1){
                    this.guanjian =  this.baoxiangang;
                    this.guanjianzi =  this.baoxiangangKey;
                }else if(b == 2){
                    this.guanjian =  this.yiziban;
                    this.guanjianzi =  this.yizibanKey;
                }else if(b == 3){
                    this.guanjian =  this.chemen;
                    this.guanjianzi =  this.chemenKey;
                }else if(b == 4){
                    this.guanjian =  this.jigai;
                    this.guanjianzi =  this.jigaiKey;
                }
            }else if(a == 3){
                [this.showPop1, this.showPop2, this.showPop4, this.showPop5, this.showPop6] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop3 = !this.showPop3 : this.showPop3 = true;
                if(b == 1){
                    this.guanjian =  this.cheding;
                    this.guanjianzi =  this.chedingKey;
                }else if(b == 2){
                    this.guanjian =  this.kongtiao;
                    this.guanjianzi =  this.kongtiaoKey;
                }else if(b == 3){
                    this.guanjian =  this.qita;
                    this.guanjianzi =  this.qitaKey;
                }
            }else if(a == 4){
                [this.showPop1, this.showPop2, this.showPop5, this.showPop5, this.showPop6] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop4 = !this.showPop4 : this.showPop4 = true;
                if(b == 1){
                    this.weibao =  this.detectData.part_detail.water;
                }else if(b == 2){
                    this.weibao =  this.detectData.part_detail.fire;
                }else if(b == 3){
                    this.weibao =  this.detectData.part_detail.recall;
                }else if(b == 4){
                    this.weibao =  this.detectData.part_detail.scrapped;
                }
            }else if(a == 5){
                [this.showPop1, this.showPop2, this.showPop3, this.showPop4, this.showPop6] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop5 = !this.showPop5 : this.showPop5 = true;
                if(b == 1){
                    this.weibao =  this.detectData.part_detail.important;
                }else if(b == 2){
                    this.weibao =  this.detectData.part_detail.exterior;
                }else if(b == 3){
                    this.weibao =  this.detectData.part_detail.body_part;
                }
            }else if(a == 6){
                [this.showPop1, this.showPop2, this.showPop3, this.showPop4, this.showPop5] = [false, false, false, false, false];
                b == this.pIndex ? this.showPop6 = !this.showPop6 : this.showPop6 = true;
            }
            
            
            for(let i = 0;i<this.guanjian.length; i++){
                this.guanjian[i].keyName = [];
                for(let j = 0;j<this.guanjianzi.length; j++){
                    this.guanjian[i].keyName.push(this.guanjianzi[j].positionName)
                }
            }


            if(b == 1){
                this.pleft = 'pleft-0';
                this.pIndex = 1;
            }else if(b == 2){
                this.pleft = 'pleft-25';
                this.pIndex = 2;
            }else if(b == 3){
                this.pleft = 'pleft-50';
                this.pIndex = 3;
            }else if(b == 4){
                this.pleft = 'pleft-75';
                this.pIndex = 4;
            }
        },


        // 文字高亮显示
        keywordscolorful(str, key){
            // var reg = new RegExp("(" + key + ")", "g");
            // var newstr = str.replace(reg, "<p style='color: #ff0000;display:inline-block;'>$1</p>");
            // return newstr;
            for(let i = 0; i < key.length; i++){
                let reg = new RegExp("(" + key[i] + ")", "g");
                str = str.replace(reg, "<p style='color: #ff0000;display:inline-block;'>$1</p>");
            }
            
            return str;
        },


        formatDate(d){
            d = Number(d)*1000;
            let year = new Date(d).getFullYear();
            let month = new Date(d).getMonth() + 1;
            let day = new Date(d).getDate();
            let hours = new Date(d).getHours();
            let minutes = new Date(d).getMinutes();
            let sec = new Date(d).getSeconds();
            return `${year}/${this.format(month)}/${this.format(day)} ${this.format(hours)}:${this.format(minutes)}:${this.format(sec)}`;
        },
        
        format(d){
            return (d > 9) ? d : ('0' + d);
        },
        // json数组去重
        unique(arr){
            var temp = {}; //存放id
            var result = []; //新数组
            arr.map((item, index) => {
                 if(!temp[item.id]){
                    result.push(item);
                    temp[item.id] = true;
                }
            })
            console.log(result);
        }

    },

    destroyed(){
        this.$toast.clear();
    }
}
</script>

<style lang="scss" scoped>
    .cont{
        padding: 40px;
        background-color: #fff;
    }
    .border16{
        background-color: #eee;
        height: 16px;
    }
    .red{
        color: #ff0000 !important;
    }
    // 基本信息
    .basic-info{
        .b-top{
            border-bottom: 1PX solid #ddd;
            padding-bottom: 40px;
            img{
                width: 98px;
                height: 98px;
                border-radius: 100%;
                border: 3px solid #eee;
            }
            div.b1{
                margin-left: 24px;
                div{
                    p{
                        color: #333;
                        display: inline-block;
                        margin-top: 0;
                        font-size: 34px;
                    }
                    p.dengji{
                        margin-left: 40px;
                    }
                }
                p{
                    margin-top: 24px;
                    font-size: 28px;
                    color: #999;
                }
            }
        }
        .b-bot{
            padding-top: 40px;
            justify-content: space-between;
            div{
                text-align: center;
                p:last-child{
                    margin-top: 24px;
                }
            }
        }
    }
    // 评估等级
    .pinggu{
        .pg{
            text-align: center;
            padding: 24px 0 60px 0;
            border-bottom: 1PX solid #ddd;
            .zm{
                font-size: 120px;
                color: #716dff;
            }
            img{
                width: 360px;
                height: 52px;
                margin-top: 24px;
            }
            .wz{
                font-size: 32px;
                color: #716dff;
                margin-top: 24px;
            }
        }
        .huafen{
            padding: 40px 0 0 0;
            .hf{
                justify-content: space-between;
                align-items: center;
                font-size: 28px;
                .p1{
                    color: #666;
                }
                div{
                    display: flex;
                    align-items: center;
                    img{
                        width: 24px;
                        height: 14px;
                        margin-left: 16px;
                    }
                }
            }
            .pgsm{
                p{
                    font-size: 28px;
                    color: #666;
                    line-height: 1.5;
                    margin-top: 40px;
                }
            }
        }
    }
    // 维保概况
    .survey{
        .flex{
            div.fd{
                flex: 0 0 25%;
                text-align: center;
                img{
                    width: 56px;
                    height: 56px;
                }
                p{
                    margin-top: 40px;
                    color: #999;
                    font-size: 28px;
                }
                div{
                    position: relative;
                    width: 56px;
                    height: 56px;
                    margin: 0 auto;
                    .img1{
                        width: 56px;
                        height: 56px;
                    }
                    .img2{
                        position: absolute;
                        top: -24px;
                        right: -24px;
                        width: 24px;
                        height: 24px;
                    }
                    p{
                        margin-top: 0;
                        position: absolute;
                        top: -32px;
                        right: -32px;
                        font-size: 22px;
                        
                    }
                }
                .wu{
                    p{
                        color: #716dff;
                    }
                }
                .you{
                    p{
                        color: #ff0000;
                    }
                }
            }
        }
        .f1{
            margin-top: 64px;
        }
        .f2{
            margin-top: 84px;
        }
    }
    .mile-record{
        position: relative;
        margin-top: 48px;
        .jiantou{
            width: 25%;
            position: absolute;
            top: -24px;
            img{
                position: absolute;
                left: 50%;
                margin-left: -16px;
                width: 32px;
                height: 24px;
            }
        }
        background-color: #f8f8f8;
        .top{
            padding: 40px 0;
            display: flex;
            justify-content: space-around;
            border-bottom: 1PX solid #ddd;
            div{
                text-align: center;
            }
            .p1{
                font-weight: 900;
                font-size: 32px;
            }
            .p2{
                color: #999;
                font-size: 28px;
                margin-top: 24px;
            }
        }
        .mile-list{
            padding: 10px 30px 40px;
            .mile-item{
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    color: #666;
                    font-size: 28px;
                }
                .red{
                    color: #ff0000;
                }
            }
        }

        
    }
    .pop{
        position: relative;
        margin-top: 48px;
        padding: 40px 30px;
        font-size: 28px;
        .jiantou{
            width: 25%;
            position: absolute;
            top: -24px;
            img{
                position: absolute;
                left: 50%;
                margin-left: -16px;
                width: 32px;
                height: 24px;
            }
        }
        background-color: #f8f8f8;
        
        .list{
            .item{
                padding: 0 0 30px;
                border-bottom: 1PX solid #ddd;
                .ddat{
                    line-height: 40px;
                    width: 72px;
                    text-align: center;
                    border-radius: 4px;
                    font-size: 24px;
                }
                .top{
                    .ddat{
                        color: #fff;
                        background: #716dff;
                    }
                    display: flex;
                    align-items: center;
                    font-size: 30px;
                    .date{
                        margin-left: 24px;
                    }
                    .licheng,.type{
                        margin-left: 40px;
                    }
                }
                .item-f{
                    margin-top: 40px;
                    align-items: flex-start;
                    .ddat{
                        color: #333;
                        background: #eee;
                        
                    }
                    div{
                        flex: 1;
                        margin-left: 24px;
                        font-size: 28px;
                        color: #666;
                        line-height: 1.5;
                    }
                }
            }
            .item:first-child{
                .item-f:first-child{
                    margin-top: 0;
                }
            }
        }
        .guanjianzi-list{
            overflow: hidden;
            .guanjianzi-item{
                float: left;
                font-size: 28px;
                color: #ff0000;
                margin-right: 30px;
            }
        }
        .guanjian .item{
            border: none;
            border-top: 1PX solid #ddd;
            padding-top: 30px;
            margin-top: 30px;
            padding-bottom: 0;
        }
    }
    .pleft-0{
        left: 0;
    }
    .pleft-25{
        left: 25%;
    }
    .pleft-50{
        left: 50%;
    }
    .pleft-75{
        left: 75%;
    }
    // 维保详情
    .detail{
        .title{
            margin-bottom: 30px;
        }
        .list{
            .item{
                padding: 30px 0;
                border-top: 1PX solid #ddd;
                .ddat{
                    line-height: 40px;
                    width: 72px;
                    text-align: center;
                    
                    border-radius: 4px;
                    font-size: 24px;
                }
                .top{
                    .ddat{
                        color: #fff;
                        background: #716dff;
                    }
                    display: flex;
                    align-items: center;
                    font-size: 30px;
                    .date{
                        margin-left: 24px;
                    }
                    .licheng,.type{
                        margin-left: 40px;
                    }
                }
                .item-f{
                    margin-top: 40px;
                    align-items: flex-start;
                    .ddat{
                        color: #333;
                        background: #eee;
                        
                    }
                    div{
                        flex: 1;
                        margin-left: 24px;
                        font-size: 28px;
                        color: #666;
                        line-height: 1.5;
                    }
                }
            }
        }
    }
    // 数据说明
    .shuoming{
        div{
            font-size: 28px;
            color: #999;
            margin-top: 25px; 
            line-height: 2;
        }
    }
</style>
