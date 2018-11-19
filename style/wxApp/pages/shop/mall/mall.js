//index.js
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var sta = require("../../../utils/statistics.js");
//获取应用实例
var app = getApp();

Page({


  data: {
    productList1: {},
    productList2: {},
    productList3: {},
    navTop: {},
    url: config.HTTP_BASE_URL + '/?__ajax=json',
    circular: true,
    autoplay: false

  },

  onLoad: function (options) {
    var that = this;
    var wxFans = wx.getStorageSync('user') || {};
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data,
          url: config.HTTP_BASE_URL + '/?__ajax=json&unionid=' + res.data.unionid
        });
      })
      app.getUserInfo().then(function (res) {
        that.setData({
          userInfo: res.data
        });
      });
    } else {
      that.setData({
        wxFans: wx.getStorageSync('user') || {},
        userInfo: wx.getStorageSync('userInfo') || {},
        url: config.HTTP_BASE_URL + '/?__ajax=json&unionid=' + wxFans.unionid
      });
    }

    http.httpGet(config.HTTP_SHOP_INDEX_NAV_URL, {}, function (res) {
      console.info(res);
      var navTop = res.obj;
      that.setData({ "navTop": navTop });
    })
    http.httpGet(config.HTTP_SHOP_INDEX_LIST1_URL, {}, function (res) {
      var productList1 = res.obj;
      console.info(productList1);
      that.setData({ "productList1": productList1 });
    })
    http.httpGet(config.HTTP_SHOP_INDEX_LIST2_URL, {}, function (res) {
      var productList2 = res.obj;
      console.info(productList2);
      that.setData({ "productList2": productList2 });
    })
    http.httpGet(config.HTTP_SHOP_INDEX_LIST3_URL, {}, function (res) {
      var productList3 = res.obj;
      console.info(productList3);
      that.setData({ "productList3": productList3 });
    })

    http.httpGet(config.HTTP_SHOP_INDEX_PROJECT1_URL, {}, function (res) {
      var mallProjects = res.obj;
      console.info(mallProjects);
      that.setData({ "mallProjects": mallProjects });
    })


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
       */
  onPullDownRefresh: function () {
    let that = this;
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.onLoad();
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 400)
  },

  //页面转发
  onShareAppMessage: function () {
    return {
      title: '广美整形商城',
      path: '/pages/shop/index',
      success: function (res) {
        console.log("转发成功");
      },
      fail: function (res) {
        console.log("转发失败");
      }
    }
  },
})