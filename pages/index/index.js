//index.js
//获取应用实例
var app = getApp();
//获取请求实例
var request = require('../../utils/https.js');
var uri_home = 'recommend/api/indexGoodList';
Page({
  //主页数据	
  data: {
    motto: '请输入您要搜索的商品',
    list: []
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
    })；
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
