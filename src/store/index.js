import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant';
Vue.use(Toast)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noData: false,
    showFooter: true,//是否显示底部栏
    footerIndex: 0,//底部切换tab的index
    showFilter: false,//是否显示筛选条件
    rank: '',//排序规则
    priceRank: '',
    ageRank: '',
    mileageRank: '',
    rankType: '',//排序类型
    filterTypeList: [
        {
            name: '价格',
            type: 'price',
            open: false
        },{
            name: '车型',
            type: 'model',
            open: false
        },{
            name: '排序',
            type: 'sort',
            open: false
        },{
            name: '更多',
            type: 'more',
            open: false
        }
    ],

    /**
     * 筛选条件
     * @parms price 价格排序
     * @parms model 车型排序
     * @parms sort 升序降序
     * @parms more 更多排序
     * @parms chexi 品牌车系
     */
    filterList: {
      price: '',
      model: '',
      sort: '',
      more: {
        'moreList': [{
          mIndex: 0,
          name: '里程',
          list: ['不限', '1万公里内', '1-3万公里', '3-6万公里', '6-10万公里'],
          value: '不限'
      },
      {
          mIndex: 0,
          name: '车龄',
          list: ['不限', '1年内', '1-3年', '3-6年', '6-10年'],
          value: '不限'
      },
      {
          mIndex: 0,
          name: '排放标准',
          list: ['不限', '国Ⅳ', '国Ⅴ', '国Ⅵ'],
          value: '不限'
      },
      {
          mIndex: 0,
          name: '变速箱',
          list: ['不限', '自动', '手动'],
          value: '不限'
      },
      {
          mIndex: 0,
          name: '品牌类别',
          list: ['不限', '国产', '合资', '进口'],
          value: '不限'
      },],
        'fujiaList': [],
      },
      chexi: ''
    },

    carList: []
  },
  getters: {
    filterList(state){
      return state.filterList;
    }
  },
  mutations: {
    // 打开筛选
    openFilter(state, i){
      document.querySelector('body').style.overflow = 'hidden';
      state.showFilter = true;
      for (let index = 0; index < state.filterTypeList.length; index++) {
        state.filterTypeList[index].open=false;
      }
      state.filterTypeList[i].open = true;
    },
    // 关闭筛选
    closeFilter(state){
      document.querySelector('body').style.overflow = 'auto';
      state.showFilter = false;
      for (let index = 0; index < state.filterTypeList.length; index++) {
        state.filterTypeList[index].open=false;
      }
    },
    // 添加搜索条件
    addFilter(state, condition){
      switch (condition.type) {
        case 'price':
          state.filterList.price = condition.value;
          break;
        case 'model' :
          state.filterList.model = condition.value;
          break;
        case 'chexi' :
          state.filterList.chexi = condition.value;
          break;
        default:
          break;
      };
      this.commit('filter');
    },
    // 删除搜索条件
    deleteFilter(state, condition){
      switch (condition.type) {
        case 'price':
          state.filterList.price = '';
          break;
        case 'model' :
          state.filterList.model = '';
          break
        case 'chexi' :
          state.filterList.chexi = '';
          break
        case 'moreRoutine' :
          for (let i = 0; i < state.filterList.more.moreList.length; i++) {
            if(state.filterList.more.moreList[i].name == condition.value.name){
              state.filterList.more.moreList[i].mIndex = 0;
              state.filterList.more.moreList[i].value = '不限';
            }
          }
          break;
        case 'moreFujia' :
            state.filterList.more.fujiaList.splice(state.filterList.more.fujiaList.indexOf(condition.value), 1);
          break;
        default:
          break;
      };
      this.commit('filter');
    },


    // 更多筛选常规
    moreClick(state, condition){
      state.moreList[condition.moreIndex].mIndex = condition.index; 
      state.moreList[condition.moreIndex].value = condition.moreItem.list[condition.index];
    },
    // 更多筛选中的附加
    fujiaClick(state, i){
      if(state.fujiaArr.includes(i)){
        state.fujiaArr.splice(state.fujiaArr.indexOf(i), 1)
      }else{
        state.fujiaArr.push(i)
      }
    },
    // 更多筛选 确定
    confirmMore(state,condition){
      state.filterList.more.moreList = condition.moreList;
      state.filterList.more.fujiaList = condition.fujiaArr;
      this.commit('closeFilter');
      this.commit('filter');
    }, 

    // 条件搜索
    filter(state){
      Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
      });
      let list = state.filterList;
      let moreList = state.filterList.more.moreList;
      let fujiaList = state.filterList.more.fujiaList;
      
      let params = {};
      list.price && (params['价格'] = list.price.key);//价格
      list.model && (params['车型'] = list.model);//车型
      list.chexi && (params['品牌车系'] = list.chexi);//车型

      for (let i = 0; i < moreList.length; i++) {
        moreList[i].mIndex && (params[ moreList[i].name] = moreList[i].value);
      };//更多常规
      fujiaList.length && (params['附加'] = fujiaList.toString());//更多附加
      params = encodeURI(JSON.stringify(params));
      axios({
          method: 'post',
          url: '/api/car_dealer_index.php?s=/Home/Sale/searchByParams',
          data: qs.stringify({
              openid: localStorage.openid,
              params: params,
              keyword: sessionStorage.carName,
              orderby: state.rankType,
              asc: state.rank,
              page_num: 1,
              page_cnt: 99
          })
      })
      .then( res => {
        if(res.data.code == 0){
          state.carList = res.data.data.list;
          state.carList.length == 0 ? (state.noData = true) : (state.noData = false);
          Toast.clear();
        }else{
          state.carList = [];
          state.carList.length == 0 ? (state.noData = true) : (state.noData = false);
          Toast.clear();
          // Toast(res.data.msg);
        }
      })
      .catch( err => {
        Toast.clear();
      })
    },
    // 全部车辆
    allCars(state){
      Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
      });
      axios({
          method: 'post',
          url: '/api/car_dealer_index.php?s=/Home/Sale/RecommendList',
          data: qs.stringify({
              page_num: '1',
              page_cnt: '999'
          })
      })
      .then( res => {
        if(res.data.code == 0){
          state.carList = res.data.data.list;
          state.carList.length == 0 ? (state.noData = true) : (state.noData = false);
          Toast.clear();
        }else{
          Toast(res.data.msg);
          state.noData = true;
          Toast.clear();
        }
      })
      .catch( err => {
        Toast.clear();
      })
    },
    // 常规搜索
    search(state){
      Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
      });
      axios({
          method: 'post',
          url: '/api/car_dealer_index.php?s=/Home/Sale/SearchAll',
          data: qs.stringify({
              openid: localStorage.openid,
              keyword: sessionStorage.carName,
              orderby: '',
              asc: '',
              page_num: 1,
              page_cnt: 99
          })
      })
      .then( res => {
        if(res.data.code == 0){
          state.carList = res.data.data.list;
          state.carList.length == 0 ? (state.noData = true) : (state.noData = false);
          Toast.clear();
        }else{
          Toast(res.data.msg);
          state.noData = true;
          Toast.clear();
        }
      })
      .catch( err => {
        Toast.clear();
      })
    },


    destroy(state){
      state.filterList = {
        price: '',
        model: '',
        sort: '',
        more: {
          'moreList': [{
            mIndex: 0,
            name: '里程',
            list: ['不限', '1万公里内', '1-3万公里', '3-6万公里', '6-10万公里'],
            value: '不限'
        },
        {
            mIndex: 0,
            name: '车龄',
            list: ['不限', '1年内', '1-3年', '3-6年', '6-10年'],
            value: '不限'
        },
        {
            mIndex: 0,
            name: '排放标准',
            list: ['不限', '国Ⅳ', '国Ⅴ', '国Ⅵ'],
            value: '不限'
        },
        {
            mIndex: 0,
            name: '变速箱',
            list: ['不限', '自动', '手动'],
            value: '不限'
        },
        {
            mIndex: 0,
            name: '品牌类别',
            list: ['不限', '国产', '合资', '进口'],
            value: '不限'
        },],
          'fujiaList': [],
        },
        chexi: ''
      }
    }

  },
  actions: {

  },
  modules: {

  }
})
