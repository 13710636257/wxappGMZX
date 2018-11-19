
var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({

  onLoad: function (options) {
    console.log(options);
    var that = this;
    http.httpGet(config.HTTP_wxfans_baobeiList_URL, { page: 1, rows: 10 }, function (res) {
        console.info(res);
        var baobeiList = res.obj;
        console.info(res.obj);
        that.setData({ "baobeiList": baobeiList });
      }
    )

    var wxFans = wx.getStorageSync('user') || {};
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data,
          url: config.HTTP_BASE_URL + '/beauty_baoBeiList?__ajax=json&beautyId=' + res.data.beautyId
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
        url: config.HTTP_BASE_URL + '/beauty_baoBeiList?__ajax=json&beautyId=' + wxFans.beautyId
      });
    }
  },

  data: {
    baobeiList: {}
  }


})