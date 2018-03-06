//index.js
//获取应用实例
var app = getApp();
//获取请求实例
var request = require('../../utils/https.js');
var uri_home = 'recommend/api/indexGoodList';
Page({
  //主页数据	
  data: {
    navbar: ['首页', '鞋包', '服饰','百货','食品'],
    currentTab: 0,
    slider: [{ "picUrl": "../../images/banner1.jpg" }, { "picUrl":       "../../images/banner2.jpg" }, { "picUrl": "../../images/banner3.jpg" }],
    swiperCurrent: 0,
    list: [{ "imgUrl": "../../images/item1.jpg", "description": "宝财羊 中老年男装夹克男", "price": 128 }, { "imgUrl": "../../images/item2.jpg", "description": "宝财羊 爸爸裤子男秋冬季", "price": 168 }, { "imgUrl": "../../images/item3.jpg", "description": "美味香蕉", "price": 20 }, { "imgUrl": "../../images/item4.jpg", "description": "用Python写网络爬虫","price": 35.5 }]
  },
  //首页导航栏
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },  
  //搜索按钮点击
  searchClick: function () {
    wx.navigateTo({
      url: '../goodsearch/goodsearch'
    })
  },
  //查询商品详情
  itemClick: function (e) {
    var specId = e.currentTarget.dataset.specid;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?specId=' + specId,
    })
  },
  onLoad: function () {
    //调登陆接口
    wx.login({
      success: function (res) {
        if (res.code) {
          //存储 code
          var codeinfo = {
            code: res.code,
          };
          wx.setStorageSync('codeinfo', codeinfo);
        }
      },
      fail: function () {
        console.log("授权失败");
      },
      complete: function () {

      }
    })
	//调用API获取后台数据
    var that = this;
    request.tokenReq(uri_home, { apKey: 'advh5' },
      (err, res) => {
        console.log(res.data)
        if (res.data.result == 1) {
          that.setData({
            list: res.data.data[0].relGoodsRecommedlist
          })
        }
      })
  },
})
