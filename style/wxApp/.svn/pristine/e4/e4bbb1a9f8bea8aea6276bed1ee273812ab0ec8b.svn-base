//index.js
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var sta = require("../../../utils/statistics.js");
//获取应用实例
var app = getApp();

Page({

  data: {
    url: config.HTTP_BASE_URL +'/?__ajax=json',
  },

  onLoad: function (options) {
    var that=this;
    var wxFans = wx.getStorageSync('user') || {};
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data,
          url: config.HTTP_BASE_URL +'/?__ajax=json&unionid='+res.data.unionid
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
        url: config.HTTP_BASE_URL +'/?__ajax=json&unionid=' + wxFans.unionid
      });
    } 
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