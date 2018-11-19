// pages/user/order/index.js
var app = getApp();
var config = require('../../../config.js');
var http = require('../../../utils/httpHelper.js');

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "已支付", "未支付"],
    order: [
      { "id": 1, "url": "", "imgurl": "http://static.gmzx.com/images/public/phoneBanner/wanRenTuoMao.jpg", "title": "万人脱毛寄", "price": "6800", "static": "2" },
      { "id": 2, "url": "", "imgurl": "http://static.gmzx.com/images/gmzx/index/0101.jpg", "title": "万人脱毛寄", "price": "16100", "static": "0" },
      { "id": 2, "url": "", "imgurl": "http://static.gmzx.com/images/gmzx/index/0101.jpg", "title": "万人脱毛寄", "price": "16200", "static": "2" },
      { "id": 2, "url": "", "imgurl": "http://static.gmzx.com/images/gmzx/index/0101.jpg", "title": "万人脱毛寄", "price": "16500", "static": "1" },
      { "id": 3, "url": "", "imgurl": "http://static.gmzx.com/images/public/phoneBanner/wanRenTuoMao.jpg", "title": "万人脱毛寄", "price": "1800", "static": "1" }
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    page:1, //当前页
    rows:10,  //一页十条记录
    count:0,  //总记录数
    dataList:[], //显示的记录
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 400)
  },
  onReachBottom: function () {
    util.showToast("加载中"),
      setTimeout(function () {
        wx.hideLoading();
      }, 1500)
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  findSaleList:function(){

  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../orderDetails/index'
    })
  },
  openConfirm: function () {
    wx.showModal({
      title: '确定删除该订单吗？',
      content: '',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('确认')
        } else {
          console.log('取消')
        }
      }
    });
  }
});