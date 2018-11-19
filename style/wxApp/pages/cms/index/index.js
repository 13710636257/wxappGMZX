var WxAutoImage = require('../../../utils/wxAutoImageCal.js');
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var imageUtil = require('../../../utils/util.js');

var app = getApp();

Page({
  onLoad: function () {
    var that = this;
    
    http.httpGet(config.HTTP_INDEX_NAV_URL, {}, function (res) {
      console.info(res);
      var navTop = res.obj;
      that.setData({ "navTop": navTop });
    });

    http.httpGet(config.HTTP_INDEX_ICON_ITEMS_URL, {}, function (res) {
      var iconArray = res.obj;
      console.info(iconArray);
      that.setData({ "iconItems": iconArray });
    });

    http.httpGet(config.HTTP_INDEX_PROBANNER_ITEMS_URL, {}, function (res) {
      var BannerArray = res.obj;
      console.info(BannerArray);
      that.setData({ "proBanner": BannerArray });
    });

    http.httpGet(config.HTTP_INDEX_MINGYUAN_URL, {}, function (res) {
      console.info(res.obj.mingyuanArray);
      that.setData({ "mingyuanItems": res.obj });
    });

  },
  data: {
    kfIcon: "../../../images/home/kf.png",
    navTop: {},
    iconItems: {},
    proBanner: {},
    mingyuanItems: {}
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  // 商务通跳转
  swtOpen: function () {
    wx.navigateTo({
      url: '../../webview/webview?url=' + encodeURIComponent(config.swtUrl)
    })
  },

  // 拨号
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '4000206666',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  //项目点击
  itemTap:function(event){
    // let itemId = event.currentTarget.dataset.itemid;
    // wx.navigateTo({
    //   url: '../zhuanti/index?id='+itemId,
    // })

    let itemUrl = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../webview/webview?url=' + itemUrl,
    })
  },
  // 下拉刷新 
  onPullDownRefresh: function () {
    //显示顶部刷新图标
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1500)
  },
 // 监听用户上拉触底事件。
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    }),
    setTimeout(function () {
      wx.hideLoading();
    }, 1500)
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    util.commonShare
  }


})