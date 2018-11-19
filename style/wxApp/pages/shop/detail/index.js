var WxAutoImage = require('../../../utils/wxAutoImageCal.js');
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var imageUtil = require('../../../utils/util.js');
var util = require('../../../utils/util.js');
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');

//获取应用实例
var app = getApp();
Page({
  data: {
    backTopValue: false,
    hideShopPopup: true,
    buytype: 'addcar',
    swtUrl:'',
    wxFans: {},
    productSku: {},
    productSkus: {},
    sale: {},
    address: {},
    wxPayResult: {},
    addressInfo: {},
    sku: [
      {
        "id": 0,
        "productImg":"https://static.gmzx.com/images/gmzx/index/0101.jpg",
        "productName": "双眼皮",
        "price":"8888",
        "productUrl": "https://wx.gmzx.com:80/weixin/productSku_buyUI?alias=quanqieshuangyanpi"
      },
      {
        "id": 2,
        "productImg": "https://static.gmzx.com/images/gmzx/index/0101.jpg",
        "productName": "双眼皮",
        "price": "8888",
        "productUrl": "https://wx.gmzx.com:80/weixin/productSku_buyUI?alias=quanqieshuangyanpi"
      }
    ]
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
  
  },

  onPullDownRefresh: function () {
    //显示顶部刷新图标
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1500)
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    }),
      setTimeout(function () {
        wx.hideLoading();
      }, 1500)
  },
  // 商务通跳转
  swtOpen:function (){
    wx.navigateTo({
      url: '../../webview/webview?url=' + encodeURIComponent(config.swtUrl)
    })
  },
  
  addshopcar: function () {
    this.setData({
      buytype: "addcar"
    })
    this.bindSkuTap();
  },
 
  //sku弹出层
  bindSkuTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  //sku弹出层隐藏
  closeSkuTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  // 监听滚动条坐标
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 150 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },
  // 滚动到顶部
  backTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    util.commonShare
  }
 

})